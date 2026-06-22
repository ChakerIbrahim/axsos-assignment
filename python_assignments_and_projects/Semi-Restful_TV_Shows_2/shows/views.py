from django.shortcuts import render, redirect, get_object_or_404

from .models import Show
from .forms import ShowForm


def index(request):
    """/shows - GET - displays all the shows in a table"""
    shows = Show.objects.all()
    return render(request, 'shows/index.html', {'shows': shows})


def new(request):
    """/shows/new - GET - returns a template containing the form for adding a show"""
    form = ShowForm()
    return render(request, 'shows/new.html', {'form': form})


def create(request):
    """/shows/create - POST - adds the show to the database, then redirects to /shows/<id>"""
    form = ShowForm(request.POST)
    if form.is_valid():
        show = form.save()
        return redirect('show', id=show.id)
    return render(request, 'shows/new.html', {'form': form})


def show(request, id):
    """/shows/<id> - GET - displays the specific show's information"""
    show = get_object_or_404(Show, id=id)
    return render(request, 'shows/show.html', {'show': show})


def edit(request, id):
    """/shows/<id>/edit - GET - displays a form for editing the TV show with the id specified"""
    show = get_object_or_404(Show, id=id)
    form = ShowForm(instance=show)
    return render(request, 'shows/edit.html', {'form': form, 'show': show})


def update(request, id):
    """/shows/<id>/update - POST - updates the specific show in the database, then redirects to /shows/<id>"""
    show = get_object_or_404(Show, id=id)
    form = ShowForm(request.POST, instance=show)
    if form.is_valid():
        form.save()
        return redirect('show', id=show.id)
    return render(request, 'shows/edit.html', {'form': form, 'show': show})


def destroy(request, id):
    """/shows/<id>/destroy - POST - deletes the show with the specified id, then redirects to /shows"""
    show = get_object_or_404(Show, id=id)
    show.delete()
    return redirect('index')
