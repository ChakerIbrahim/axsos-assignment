from django.db import models

# Create your models here.
class Movie(models.model):
    tittle = models.CharField(max_length=45)
    description = models.TextFiels()
    release_date = models.DateTimeField()
    duration = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)