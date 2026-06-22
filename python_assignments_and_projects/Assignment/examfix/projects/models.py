from datetime import date

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='owned_projects',
    )
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='joined_projects',
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


    def is_owner(self, user):
        return user.is_authenticated and self.owner_id == user.id

    def is_member(self, user):
        return user.is_authenticated and self.members.filter(id=user.id).exists()


    def join(self, user):
        if not self.is_owner(user):
            self.members.add(user)

    def leave(self, user):
        self.members.remove(user)

    def clean(self):
        errors = {}

        name = (self.name or '').strip()
        if len(name) < 3:
            errors['name'] = 'Project name must be at least 3 characters.'

        description = (self.description or '').strip()
        if len(description) < 10:
            errors['description'] = 'Description must be at least 10 characters.'

        if self.start_date and self.end_date and self.end_date < self.start_date:
            errors['end_date'] = 'End date must be on or after the start date.'

        if (
            getattr(self, 'enforce_future_start', False)
            and self.start_date
            and self.start_date < date.today()
        ):
            errors['start_date'] = 'Start date must be today or later.'

        if errors:
            raise ValidationError(errors)
