from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib import messages


def index(request):
    if request.user.is_authenticated:
        return redirect('/books/')
    return redirect('/login/')


def login_page(request):
    if request.user.is_authenticated:
        return redirect('/books/')
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('/books/')
        messages.error(request, 'Invalid username or password.')
    return render(request, 'login_app/login.html')


def register_page(request):
    if request.user.is_authenticated:
        return redirect('/books/')
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm = request.POST.get('confirm_password', '')

        if password != confirm:
            messages.error(request, 'Passwords do not match.')
        elif len(password) < 6:
            messages.error(request, 'Password must be at least 6 characters.')
        elif User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
        else:
            user = User.objects.create_user(
                username=username, email=email, password=password,
                first_name=first_name, last_name=last_name
            )
            login(request, user)
            return redirect('/books/')
    return render(request, 'login_app/register.html')


def logout_view(request):
    logout(request)
    return redirect('/login/')
