from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']  # Newest messages first

    def __str__(self):
        return f'{self.user.username}: {self.content[:50]}'


class Comment(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']  # Oldest comments first (chronological)

    def __str__(self):
        return f'{self.user.username} on msg {self.message.id}: {self.content[:30]}'
