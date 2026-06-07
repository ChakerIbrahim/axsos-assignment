from django.shortcuts import render, redirect, get_object_or_404
from .models import Show
from .forms import ShowForm


# READ (All Shows)
def index(request):
    shows = Show.objects.all()
    return render(request, 'tv_shows_app/index.html', {'shows': shows})


# READ (Single Show)
def show(request, show_id):
    show = get_object_or_404(Show, pk=show_id)
    return render(request, 'tv_shows_app/show.html', {'show': show})


# CREATE
def new(request):
    form = ShowForm()
    return render(request, 'tv_shows_app/new.html', {'form': form})


def create(request):
    if request.method == 'POST':
        form = ShowForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('tv_shows_index')
        # If invalid, re-render with errors
        return render(request, 'tv_shows_app/new.html', {'form': form})
    return redirect('tv_shows_new')


# UPDATE
def edit(request, show_id):
    show = get_object_or_404(Show, pk=show_id)
    form = ShowForm(instance=show)
    return render(request, 'tv_shows_app/edit.html', {'form': form, 'show': show})


def update(request, show_id):
    show = get_object_or_404(Show, pk=show_id)
    if request.method == 'POST':
        form = ShowForm(request.POST, instance=show)
        if form.is_valid():
            form.save()
            return redirect('tv_shows_show', show_id=show.pk)
        # If invalid, re-render with errors
        return render(request, 'tv_shows_app/edit.html', {'form': form, 'show': show})
    return redirect('tv_shows_edit', show_id=show_id)


# DELETE
def destroy(request, show_id):
    show = get_object_or_404(Show, pk=show_id)
    if request.method == 'POST':
        show.delete()
        return redirect('tv_shows_index')
    return redirect('tv_shows_show', show_id=show_id)
