from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.shortcuts import get_object_or_404, redirect, render

from .models import Project


def index(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'index.html')


def register(request):
    if request.method != 'POST':
        return redirect('index')

    first_name = request.POST.get('first_name', '').strip()
    last_name = request.POST.get('last_name', '').strip()
    email = request.POST.get('email', '').strip().lower()
    password = request.POST.get('password', '')
    confirm = request.POST.get('confirm', '')

    errors = []

    if len(first_name) < 2:
        errors.append('First name must be at least 2 characters')

    if len(last_name) < 2:
        errors.append('Last name must be at least 2 characters')

    try:
        validate_email(email)
    except ValidationError:
        errors.append('Enter a valid email address')

    if len(password) < 8:
        errors.append('Password must be at least 8 characters')

    if password != confirm:
        errors.append('Passwords do not match')

    if email and User.objects.filter(username=email).exists():
        errors.append('Email already exists')

    if errors:
        for error in errors:
            messages.error(request, error)
        return redirect('index')

    user = User.objects.create_user(
        username=email,
        email=email,
        first_name=first_name,
        last_name=last_name,
        password=password,
    )
    login(request, user)
    return redirect('dashboard')


def login_view(request):
    if request.method != 'POST':
        return redirect('index')

    email = request.POST.get('email', '').strip().lower()
    password = request.POST.get('password', '')

    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return redirect('dashboard')

    messages.error(request, 'Email or password is incorrect')
    return redirect('index')


@login_required
def logout_view(request):
    logout(request)
    return redirect('index')


@login_required
def dashboard(request):
    return render(request, 'dashboard.html', {'projects': Project.objects.all()})


@login_required
def create_project(request):
    if request.method == 'POST':
        project = Project(
            name=request.POST.get('name', '').strip(),
            description=request.POST.get('description', '').strip(),
            start_date=request.POST.get('start_date') or None,
            end_date=request.POST.get('end_date') or None,
            owner=request.user,
        )
        project.enforce_future_start = True  

        try:
            project.full_clean()
        except ValidationError as e:
            for msgs in e.message_dict.values():
                for msg in msgs:
                    messages.error(request, msg)
            return render(request, 'create.html', {'form_data': request.POST})

        project.save()
        return redirect('project_details', id=project.id)

    return render(request, 'create.html')


@login_required
def project_details(request, id):
    project = get_object_or_404(Project, id=id)
    return render(request, 'project_details.html', {'project': project})


@login_required
def edit_project(request, id):
    project = get_object_or_404(Project, id=id)

    if not project.is_owner(request.user):
        messages.error(request, 'Only the project owner can edit this project')
        return redirect('project_details', id=id)

    if request.method == 'POST':
        project.name = request.POST.get('name', '').strip()
        project.description = request.POST.get('description', '').strip()
        project.start_date = request.POST.get('start_date') or None
        project.end_date = request.POST.get('end_date') or None

        try:
            project.full_clean()
        except ValidationError as e:
            for msgs in e.message_dict.values():
                for msg in msgs:
                    messages.error(request, msg)
            return render(request, 'edit.html', {'project': project})

        project.save()
        return redirect('project_details', id=id)

    return render(request, 'edit.html', {'project': project})


@login_required
def delete_project(request, id):
    project = get_object_or_404(Project, id=id)
    if project.is_owner(request.user):
        project.delete()
    else:
        messages.error(request, 'Only the project owner can delete this project')
    return redirect('dashboard')


@login_required
def join_project(request, id):
    project = get_object_or_404(Project, id=id)
    project.join(request.user)
    return redirect('dashboard')


@login_required
def leave_project(request, id):
    project = get_object_or_404(Project, id=id)
    project.leave(request.user)
    return redirect('dashboard')









