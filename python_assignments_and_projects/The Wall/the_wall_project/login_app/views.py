from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib import messages


def index(request):
    """Home page — redirect to wall if logged in, otherwise to login."""
    if request.user.is_authenticated:
        return redirect('/wall/')
    return redirect('/login/')


def login_page(request):
    """Show login form or handle login POST."""
    if request.user.is_authenticated:
        return redirect('/wall/')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome back, {user.username}!')
            return redirect('/wall/')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'login_app/login.html')


def register_page(request):
    """Show registration form or handle registration POST."""
    if request.user.is_authenticated:
        return redirect('/wall/')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm_password', '')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
        elif User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
        elif len(password) < 6:
            messages.error(request, 'Password must be at least 6 characters.')
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            login(request, user)
            messages.success(request, f'Account created! Welcome, {user.username}!')
            return redirect('/wall/')

    return render(request, 'login_app/register.html')


def logout_view(request):
    """Log the user out and redirect to login."""
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('/login/')
