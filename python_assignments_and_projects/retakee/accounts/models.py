from django.contrib.auth.models import User
from django.db import models



class User(models.Model):
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    email=models.EmailField()
    password=models.CharField(max_length=255)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


class Project(models.Model):
    name=models.CharField(max_length=255)
    description=models.TextField()
    start_date=models.DateField()
    end_date=models.DateField()

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owned_projects'
    )
    members = models.ManyToManyField(
        User,
        related_name='owned_projects',
        blank=True
    )
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)




    def __str__(self):
        return self.name


