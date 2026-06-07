from django.db import models
from django.core.validators import MinLengthValidator

class Description(models.Model):
    text = models.TextField(validators=[MinLengthValidator(15)])

    def __str__(self):
        return self.text[:50]

class Course(models.Model):
    name = models.CharField(max_length=100, validators=[MinLengthValidator(6)])
    description = models.OneToOneField(Description, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
