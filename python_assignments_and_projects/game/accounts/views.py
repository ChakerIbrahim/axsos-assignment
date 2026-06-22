from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from .forms import RegisterForm, LoginForm
from .models import CustomUser


def home(request):
    """
    '/' - shows the registration form AND the sign-in form on one page,
    matching the wireframe. If already logged in, skip straight to the dashboard.
    """
    if request.user.is_authenticated:
        return redirect('dashboard')

    register_form = RegisterForm()
    login_form = LoginForm()

    if request.method == 'POST':
        if 'register_submit' in request.POST:
            register_form = RegisterForm(request.POST)
            if register_form.is_valid():
                user = register_form.save()
                login(request, user)
                return redirect('dashboard')

        elif 'login_submit' in request.POST:
            login_form = LoginForm(request.POST)
            if login_form.is_valid():
                # authenticate() checks the password hash for us - never compare passwords manually
                user = authenticate(
                    request,
                    username=login_form.cleaned_data['email'],  # USERNAME_FIELD is email, but kwarg is always 'username'
                    password=login_form.cleaned_data['password'],
                )
                if user is not None:
                    login(request, user)
                    return redirect('dashboard')
                login_form.add_error(None, 'Invalid email or password.')

    return render(request, 'accounts/home.html', {
        'register_form': register_form,
        'login_form': login_form,
    })


def logout_view(request):
    logout(request)
    return redirect('home')


@login_required
def profile(request, id):
    """/profile/<id> - a player's info + the games they've favorited/rated"""
    player = CustomUser.objects.get(id=id)
    ratings = player.ratings.select_related('game').order_by('game__name')
    return render(request, 'accounts/profile.html', {
        'player': player,
        'ratings': ratings,
    })
