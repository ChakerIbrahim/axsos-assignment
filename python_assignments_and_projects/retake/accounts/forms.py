from datetime import date

from django import forms
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from .models import CustomUser


class RegisterForm(forms.Form):
    first_name = forms.CharField(min_length=4, error_messages={
        'min_length': 'First name must be at least 4 characters.',
        'required': 'First name is required.',
    })
    last_name = forms.CharField(min_length=4, error_messages={
        'min_length': 'Last name must be at least 4 characters.',
        'required': 'Last name is required.',
    })
    email = forms.EmailField(error_messages={'required': 'Email is required.'})
    date_of_birth = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        error_messages={'required': 'Date of birth is required.'},
    )
    password = forms.CharField(widget=forms.PasswordInput, error_messages={'required': 'Password is required.'})
    confirm_password = forms.CharField(widget=forms.PasswordInput, error_messages={'required': 'Please confirm your password.'})
    avatar = forms.URLField(required=False)

    # --- one field at a time ---

    def clean_email(self):
        email = self.cleaned_data['email']
        if CustomUser.objects.filter(email__iexact=email).exists():
            raise ValidationError('An account with this email already exists.')
        return email

    def clean_date_of_birth(self):
        dob = self.cleaned_data['date_of_birth']
        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        if age < 18:
            raise ValidationError('You must be 18 years or older to register.')
        return dob

    def clean_password(self):
        password = self.cleaned_data['password']
        validate_password(password)  # enforces min length 8 + Django's other built-in rules
        return password

    # --- fields compared against each other, runs last ---

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', 'Passwords do not match.')
        return cleaned_data

    def save(self):
        return CustomUser.objects.create_user(
            email=self.cleaned_data['email'],
            first_name=self.cleaned_data['first_name'],
            last_name=self.cleaned_data['last_name'],
            date_of_birth=self.cleaned_data['date_of_birth'],
            password=self.cleaned_data['password'],
            avatar=self.cleaned_data.get('avatar') or CustomUser._meta.get_field('avatar').default,
        )


class LoginForm(forms.Form):
    email = forms.EmailField(error_messages={'required': 'Email is required.'})
    password = forms.CharField(widget=forms.PasswordInput, error_messages={'required': 'Password is required.'})
