from datetime import date

from django import forms
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from .models import CustomUser


class RegisterForm(forms.Form):
    first_name = forms.CharField(min_length=4)
    last_name = forms.CharField(min_length=4)
    email = forms.EmailField()
    date_of_birth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)
    avatar = forms.URLField(required=False)

    # --- single-field validation: clean_<field> runs automatically ---

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
        # Runs Django's built-in AUTH_PASSWORD_VALIDATORS (min length 8, not all-numeric, etc.)
        validate_password(password)
        return password

    # --- cross-field validation: plain clean() runs after every field is individually clean ---

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
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
