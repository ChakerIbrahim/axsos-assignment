from datetime import date

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """
    Django's default UserManager assumes a 'username' field exists.
    Since we're using email as the login field instead, we have to
    write our own create_user/create_superuser.
    """
    def create_user(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            **extra_fields,
        )
        user.set_password(password)  # hashes the password, never store it raw
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, date_of_birth, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, first_name, last_name, date_of_birth, password, **extra_fields)


class CustomUser(AbstractUser):
    # Kill the inherited 'username' field - we don't want it
    username = None

    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    avatar = models.URLField(
        blank=True,
        default='https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-user-icon-png-image_2030224.jpg',
    )

    USERNAME_FIELD = 'email'                       # what you log in with
    REQUIRED_FIELDS = ['first_name', 'last_name', 'date_of_birth']  # asked for via createsuperuser

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    @property
    def age(self):
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )
