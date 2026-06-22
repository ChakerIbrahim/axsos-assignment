from django.conf import settings
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=150, blank=True)
    description = models.TextField()
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
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name

    def is_member(self, user):
        return user.is_authenticated and self.members.filter(pk=user.pk).exists()

    def is_owner(self, user):
        return user.is_authenticated and self.owner_id == user.pk
