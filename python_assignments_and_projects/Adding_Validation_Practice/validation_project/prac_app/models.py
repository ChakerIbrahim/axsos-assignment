from django.db import models
import re

# Create your models here.


class BlogManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}

        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

        if not EMAIL_REGEX.match(postDATA['email']):
            errors['email'] = "Invalid email address!"

        return errors

# class BlogManager(models.Manager):
#     def basic_validator(self, postData):
#         errors = {}

#         if len(postData['name'])<5:
#             errors["name"] = "Blog name should be at least 5 characters."
#         if len(postData['desc'])<10:
#             errors["desc"] = "Blog description should be at least 10 characters."
            
#         return errors

# class Blog(models.Model):
#     name = models.CharField(max_length=255)
#     desc = models.TextField()
#     created_at=models.DateTimeField(auto_now_add=True)
#     updated_at=models.DateTimeField(auto_now=True)
#     objects = BlogManager()