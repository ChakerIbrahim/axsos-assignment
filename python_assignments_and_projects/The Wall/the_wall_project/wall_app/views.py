from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from datetime import timedelta

from .models import Message, Comment


@login_required
def wall(request):
    """
    Main wall page.
    - GET: display all messages with their comments
    - POST: create a new message
    """
    if request.method == 'POST':
        content = request.POST.get('content', '').strip()
        if content:
            Message.objects.create(user=request.user, content=content)
            messages.success(request, 'Message posted!')
        else:
            messages.error(request, 'Message cannot be empty.')
        return redirect('/wall/')

    all_messages = Message.objects.select_related('user').prefetch_related('comments__user').all()
    return render(request, 'wall_app/wall.html', {'all_messages': all_messages})


@login_required
def add_comment(request, message_id):
    """Add a comment to a specific message."""
    if request.method == 'POST':
        parent_message = get_object_or_404(Message, id=message_id)
        content = request.POST.get('content', '').strip()
        if content:
            Comment.objects.create(
                message=parent_message,
                user=request.user,
                content=content
            )
            messages.success(request, 'Comment added!')
        else:
            messages.error(request, 'Comment cannot be empty.')
    return redirect('/wall/')


@login_required
def delete_message(request, message_id):
    """
    Delete a message — only the owner can delete it,
    and only if it was posted within the last 30 minutes (Extra Credit II).
    """
    msg = get_object_or_404(Message, id=message_id)

    if msg.user != request.user:
        messages.error(request, 'You can only delete your own messages.')
        return redirect('/wall/')

    cutoff = timezone.now() - timedelta(minutes=30)
    if msg.created_at < cutoff:
        messages.error(request, 'You can only delete messages posted within the last 30 minutes.')
        return redirect('/wall/')

    msg.delete()
    messages.success(request, 'Message deleted.')
    return redirect('/wall/')


@login_required
def delete_comment(request, comment_id):
    """Delete a comment — only the owner can delete their own comment."""
    comment = get_object_or_404(Comment, id=comment_id)

    if comment.user != request.user:
        messages.error(request, 'You can only delete your own comments.')
        return redirect('/wall/')

    comment.delete()
    messages.success(request, 'Comment deleted.')
    return redirect('/wall/')
