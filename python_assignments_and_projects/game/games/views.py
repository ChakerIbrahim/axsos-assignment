from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect, get_object_or_404

from .forms import GameForm
from .models import Game, Rating

# Maps the ?sort= value in the URL to the actual model field to order by.
# Whitelisting like this (instead of trusting the query param directly)
# stops someone passing '?sort=password' and sorting on a field you didn't intend to expose.
DASHBOARD_SORT_FIELDS = {
    'name': 'name',
    'genre': 'genre',
    'release_date': 'release_date',
}
RATINGS_SORT_FIELDS = {
    'id': 'id',
    'player': 'player__first_name',
    'rate': 'rate',
}


@login_required
def dashboard(request):
    """/dashboard - GET: list all games (sortable). POST: create a new game."""
    form = GameForm()

    if request.method == 'POST':
        form = GameForm(request.POST)
        if form.is_valid():
            game = form.save(commit=False)
            game.created_by = request.user
            game.save()
            return redirect('game_detail', id=game.id)

    sort = request.GET.get('sort', 'name')
    order_field = DASHBOARD_SORT_FIELDS.get(sort, 'name')
    games = Game.objects.all().order_by(order_field)

    return render(request, 'games/dashboard.html', {
        'form': form,
        'games': games,
        'current_sort': sort,
    })


@login_required
def game_detail(request, id):
    """/game/<id> - show one game, its ratings table, and let the viewer rate/favorite it."""
    game = get_object_or_404(Game, id=id)

    if request.method == 'POST':
        if 'add_fav' in request.POST:
            Rating.objects.get_or_create(player=request.user, game=game, defaults={'rate': 1})
        elif 'set_rate' in request.POST:
            rate_value = int(request.POST.get('rate', 1))
            Rating.objects.update_or_create(player=request.user, game=game, defaults={'rate': rate_value})
        return redirect('game_detail', id=game.id)

    sort = request.GET.get('sort', 'id')
    order_field = RATINGS_SORT_FIELDS.get(sort, 'id')
    ratings = game.ratings.select_related('player').order_by(order_field)

    my_rating = game.ratings.filter(player=request.user).first()

    return render(request, 'games/game_detail.html', {
        'game': game,
        'ratings': ratings,
        'current_sort': sort,
        'my_rating': my_rating,
        'is_creator': game.created_by_id == request.user.id,
    })


@login_required
def game_edit(request, id):
    """/edit/game/<id> - creator-only. GET shows the pre-filled form, POST applies changes."""
    game = get_object_or_404(Game, id=id)
    if game.created_by_id != request.user.id:
        raise PermissionDenied("Only the creator of this game can edit it.")

    if request.method == 'POST':
        form = GameForm(request.POST, instance=game)
        if form.is_valid():
            form.save()
            return redirect('game_detail', id=game.id)
    else:
        form = GameForm(instance=game)

    return render(request, 'games/game_edit.html', {'form': form, 'game': game})


@login_required
def game_delete(request, id):
    """Creator-only. POST deletes the game and redirects to the dashboard."""
    game = get_object_or_404(Game, id=id)
    if game.created_by_id != request.user.id:
        raise PermissionDenied("Only the creator of this game can delete it.")
    if request.method == 'POST':
        game.delete()
    return redirect('dashboard')
