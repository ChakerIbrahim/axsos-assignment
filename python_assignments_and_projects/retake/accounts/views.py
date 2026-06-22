from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from .forms import RegisterForm, LoginForm


def home(request):
    """One page, two forms. The hidden 'register_submit' / 'login_submit'
    button names tell the view which form was actually submitted."""
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
                user = authenticate(
                    request,
                    username=login_form.cleaned_data['email'],  # kwarg is always 'username' even when USERNAME_FIELD = 'email'
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


@login_required
def dashboard(request):
    return render(request, 'accounts/dashboard.html')


def logout_view(request):
    logout(request)
    return redirect('home')
