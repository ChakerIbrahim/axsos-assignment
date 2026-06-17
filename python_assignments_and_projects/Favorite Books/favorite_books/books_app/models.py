from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    title = models.CharField(max_length=255)
    # One-to-many: one user uploads many books
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='books_uploaded'   # user.books_uploaded.all()
    )
    # Many-to-many: many users can like many books (stored in a separate "likes" table)
    users_who_like = models.ManyToManyField(
        User,
        related_name='liked_books',     # user.liked_books.all()
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
