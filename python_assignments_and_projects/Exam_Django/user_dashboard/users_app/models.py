import bcrypt
from django.db import models


class UserManager(models.Manager):
    def register(self, first_name, last_name, email, password):
        """Hash the password with bcrypt and create the user."""
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        return self.create(
            first_name=first_name,
            last_name=last_name,
            email=email.lower(),
            password=hashed,
        )

    def authenticate(self, email, password):
        """Return user if credentials are valid, else None."""
        try:
            user = self.get(email=email.lower())
        except self.model.DoesNotExist:
            return None
        if bcrypt.checkpw(password.encode(), user.password.encode()):
            return user
        return None

    def validate_register(self, data):
        """Return (errors list, cleaned data dict)."""
        errors = []
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        confirm = data.get('confirm_password', '')

        if len(first_name) < 4:
            errors.append('First name must be at least 4 characters.')
        if len(last_name) < 4:
            errors.append('Last name must be at least 4 characters.')
        if '@' not in email or '.' not in email:
            errors.append('Enter a valid email address.')
        elif self.filter(email=email).exists():
            errors.append('Email is already registered.')
        if len(password) < 8:
            errors.append('Password must be at least 8 characters.')
        if password != confirm:
            errors.append('Passwords do not match.')

        cleaned = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password,
        }
        return errors, cleaned

    def validate_edit(self, data, user_id):
        """Validate edit form. Returns (errors, cleaned)."""
        errors = []
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        email = data.get('email', '').strip().lower()

        if len(first_name) < 2:
            errors.append('First name must be at least 2 characters.')
        if len(last_name) < 2:
            errors.append('Last name must be at least 2 characters.')
        if '@' not in email or '.' not in email:
            errors.append('Enter a valid email address.')
        elif self.filter(email=email).exclude(id=user_id).exists():
            errors.append('That email is already in use by another account.')

        return errors, {'first_name': first_name, 'last_name': last_name, 'email': email}


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    dateofbirth = models.DateField()
    password = models.CharField(max_length=255)  # bcrypt hash
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'


class Games(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    release_date = models.DateTimeField(unique=True)
    description = models.TextField(max_length=255)  # bcrypt hash
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
