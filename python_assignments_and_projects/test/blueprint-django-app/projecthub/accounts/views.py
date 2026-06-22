from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import LoginForm, RegisterForm


def auth_view(request):
    """Combined login + registration page, matching the wireframe's single
    page with two forms side by side."""
    if request.user.is_authenticated:
        return redirect('dashboard')

    login_form = LoginForm(prefix='login')
    register_form = RegisterForm(prefix='register')

    if request.method == 'POST':
        if request.POST.get('form_name') == 'login':
            login_form = LoginForm(request.POST, prefix='login')
            if login_form.is_valid():
                login(request, login_form.cleaned_data['user'])
                return redirect('dashboard')
        elif request.POST.get('form_name') == 'register':
            register_form = RegisterForm(request.POST, prefix='register')
            if register_form.is_valid():
                user = register_form.save()
                login(request, user)
                messages.success(request, 'Welcome! Your account has been created.')
                return redirect('dashboard')

    return render(request, 'accounts/auth.html', {
        'login_form': login_form,
        'register_form': register_form,
    })


@login_required
def logout_view(request):
    logout(request)
    return redirect('auth')
