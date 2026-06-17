from django.shortcuts import render, redirect
from . import models
from django.contrib import messages


def login_register(request):
    return render(request, "login_register.html")


def register(request):
    if request.method == "POST":
        errors = models.User.objects.basic_validator(request.POST)
        if errors:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect("/")
        user = models.register(request.POST)
        request.session['user_id'] = user.id
        return redirect("/dashboard/")


def login(request):
    if request.method == "POST":
        user = models.login(request.POST)
        if user:
            request.session['user_id'] = user.id
            return redirect("/dashboard/")
        messages.error(request, "Invalid email or password.")
        return redirect("/")


def dashboard(request):
    if 'user_id' not in request.session:
        return redirect("/")
    context = {
        'user': models.get_specific_user(request),
        'all_games': models.get_all_game()
    }
    return render(request, "dashboard.html", context)


def logout(request):
    if request.method == "POST":
        request.session.flush()
        return redirect("/")


def create_game(request):
    if 'user_id' not in request.session:
        return redirect("/")
    if request.method == "POST":
        errors = models.Game.objects.basic_validator(request.POST)
        if errors:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect("/dashboard/")
        models.create_game(request.POST, request)
        return redirect("/dashboard/")


def details_page(request, id):
    if 'user_id' not in request.session:
        return redirect("/")
    game = models.get_specific_game(id)
    context = {
        'games_get': game,
        'user': models.get_specific_user(request),
    }
    return render(request, "details.html", context)


def delete_game(request, id):
    if 'user_id' not in request.session:
        return redirect("/")
    game = models.get_specific_game(id)
    if game.user.id == request.session['user_id']:
        models.delete_game(id)
    return redirect("/dashboard/")


def edit(request, id):
    if 'user_id' not in request.session:
        return redirect("/")
    game = models.show_game_edit(id)
    if game.user.id != request.session['user_id']:
        return redirect("/dashboard/")
    context = {'show_game': game}
    return render(request, "edit.html", context)


def edit_page(request, id):
    if 'user_id' not in request.session:
        return redirect("/")
    game = models.get_specific_game(id)
    if game.user.id != request.session['user_id']:
        return redirect("/dashboard/")
    if request.method == "POST":
        errors = models.Game.objects.basic_validator(request.POST)
        if errors:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect(f"/edit/{id}/")
        models.edit_page(request.POST, id)
        return redirect(f"/game/{id}/")
    return redirect(f"/edit/{id}/")


def add_favorite(request, id):
    if 'user_id' not in request.session:
        return redirect("/")
    user = models.User.objects.get(id=request.session['user_id'])
    game = models.get_game_by_id(id)
    game.favorites.add(user)
    return redirect(f"/game/{id}/")
