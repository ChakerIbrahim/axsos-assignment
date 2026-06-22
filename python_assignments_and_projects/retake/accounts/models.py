from datetime import date

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """Default UserManager assumes a 'username' field - we log in with email, so we write our own."""

    def create_user(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(
            email=email, first_name=first_name, last_name=last_name,
            date_of_birth=date_of_birth, **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, first_name, last_name, date_of_birth, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    avatar = models.URLField(
        blank=True,
        default='https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-user-icon-png-image_2030224.jpg',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'date_of_birth']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
