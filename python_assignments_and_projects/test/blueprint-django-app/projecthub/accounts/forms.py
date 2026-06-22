from django import forms
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from .models import User


class RegisterForm(forms.Form):
    """Registration form. Validation rules mirror the wireframe's notes:
    names >= 2 chars, valid + unique email, password >= 8 chars, and the
    password/confirm pair must match.
    """

    first_name = forms.CharField(label='First name', max_length=150)
    last_name = forms.CharField(label='Last name', max_length=150)
    email = forms.CharField(label='Email', max_length=254)
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='Confirm password', widget=forms.PasswordInput)

    def clean_first_name(self):
        value = self.cleaned_data['first_name'].strip()
        if len(value) < 2:
            raise ValidationError('First name should be at least 2 characters.')
        return value

    def clean_last_name(self):
        value = self.cleaned_data['last_name'].strip()
        if len(value) < 2:
            raise ValidationError('Last name should be at least 2 characters.')
        return value

    def clean_email(self):
        value = self.cleaned_data['email'].strip().lower()
        try:
            validate_email(value)
        except ValidationError:
            raise ValidationError('Enter a valid email address.')
        if User.objects.filter(email__iexact=value).exists():
            raise ValidationError('This email address is already registered.')
        return value

    def clean_password(self):
        value = self.cleaned_data['password']
        if len(value) < 8:
            raise ValidationError('Password should be at least 8 characters.')
        return value

    def clean(self):
        cleaned = super().clean()
        password = cleaned.get('password')
        confirm = cleaned.get('confirm_password')
        if password and confirm and password != confirm:
            self.add_error('confirm_password', 'Password and confirm password should match.')
        return cleaned

    def save(self):
        data = self.cleaned_data
        return User.objects.create_user(
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
        )


class LoginForm(forms.Form):
    email = forms.CharField(label='Email', max_length=254)
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    def clean(self):
        cleaned = super().clean()
        email = cleaned.get('email', '').strip().lower()
        password = cleaned.get('password')
        if email and password:
            user = authenticate(email=email, password=password)
            if user is None:
                raise ValidationError('Email or password is incorrect.')
            cleaned['user'] = user
        return cleaned
