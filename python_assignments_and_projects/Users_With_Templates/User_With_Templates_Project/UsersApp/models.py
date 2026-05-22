from django.db import models

# Create your models here.

# This model represents a user in the database
class User(models.Model):
    first_name = models.CharField(max_length=250)   # User's first name
    last_name = models.CharField(max_length=250)    # User's last name
    email = models.EmailField(max_length=250)       # User's email address
    age = models.IntegerField()                     # User's age
    created_at = models.DateTimeField(auto_now_add=True)  # Set once when created
    updated_at = models.DateTimeField(auto_now=True)      # Updates every time saved