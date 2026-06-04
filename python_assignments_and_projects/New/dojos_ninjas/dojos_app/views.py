from django.shortcuts import render, redirect, get_object_or_404
from .models import Dojo, Ninja


def index(request):
    """
    Main page - displays:
    - Form to add a new Dojo
    - Form to add a new Ninja (with dropdown of all Dojos)
    - List of all Dojos with their associated Ninjas and ninja count
    """
    context = {
        'all_dojos': Dojo.objects.all(),   # used in the Ninja form dropdown AND the dojos list
    }
    return render(request, 'index.html', context)


def create_dojo(request):
    """
    Processes the POST form submission for creating a new Dojo.
    Reads name, city, state from the form and saves to the database.
    Redirects back to index after saving.
    """
    if request.method == 'POST':
        Dojo.objects.create(
            name=request.POST['name'],
            city=request.POST['city'],
            state=request.POST['state'],
        )
    return redirect('/')


def create_ninja(request):
    """
    Processes the POST form submission for creating a new Ninja.
    Reads first_name, last_name, and dojo_id from the form.
    Associates the Ninja with the selected Dojo via ForeignKey.
    Redirects back to index after saving.
    """
    if request.method == 'POST':
        dojo = get_object_or_404(Dojo, id=request.POST['dojo_id'])
        Ninja.objects.create(
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            dojo=dojo,
        )
    return redirect('/')


def delete_dojo(request, dojo_id):
    """
    NINJA BONUS: Deletes a Dojo and all its associated Ninjas.
    The CASCADE setting in the model handles deleting related Ninjas automatically.
    """
    dojo = get_object_or_404(Dojo, id=dojo_id)
    dojo.delete()
    return redirect('/')
