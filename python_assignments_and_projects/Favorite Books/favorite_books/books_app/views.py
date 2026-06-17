from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .models import Book


@login_required
def index(request):
    """Main page: list all books + form to add a new book."""
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        if not title:
            messages.error(request, 'Book title cannot be empty.')
        elif Book.objects.filter(title__iexact=title).exists():
            messages.error(request, 'A book with that title already exists.')
        else:
            book = Book.objects.create(title=title, uploaded_by=request.user)
            # Automatically favorited by the uploader
            book.users_who_like.add(request.user)
            messages.success(request, f'"{title}" added and favorited!')
        return redirect('/books/')

    all_books = Book.objects.select_related('uploaded_by').prefetch_related('users_who_like').all()
    return render(request, 'books_app/index.html', {'all_books': all_books})


@login_required
def book_detail(request, book_id):
    """Show a single book's info + list of users who favorited it."""
    book = get_object_or_404(Book, id=book_id)
    user_likes = request.user in book.users_who_like.all()
    favorited_by = book.users_who_like.all()
    return render(request, 'books_app/detail.html', {
        'book': book,
        'user_likes': user_likes,
        'favorited_by': favorited_by,
    })


@login_required
def favorite_book(request, book_id):
    """Add a book to the logged-in user's favorites."""
    book = get_object_or_404(Book, id=book_id)
    book.users_who_like.add(request.user)
    messages.success(request, f'"{book.title}" added to your favorites!')
    return redirect(f'/books/{book_id}/')


@login_required
def unfavorite_book(request, book_id):
    """Remove a book from the logged-in user's favorites."""
    book = get_object_or_404(Book, id=book_id)
    book.users_who_like.remove(request.user)
    messages.success(request, f'"{book.title}" removed from your favorites.')
    return redirect(f'/books/{book_id}/')


@login_required
def edit_book(request, book_id):
    """Edit a book's title — only the uploader can do this."""
    book = get_object_or_404(Book, id=book_id)
    if book.uploaded_by != request.user:
        messages.error(request, 'You can only edit books you uploaded.')
        return redirect(f'/books/{book_id}/')

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        if not title:
            messages.error(request, 'Title cannot be empty.')
        else:
            book.title = title
            book.save()
            messages.success(request, 'Book updated!')
            return redirect(f'/books/{book_id}/')

    return render(request, 'books_app/edit.html', {'book': book})


@login_required
def delete_book(request, book_id):
    """Delete a book — only the uploader can do this."""
    book = get_object_or_404(Book, id=book_id)
    if book.uploaded_by != request.user:
        messages.error(request, 'You can only delete books you uploaded.')
        return redirect(f'/books/{book_id}/')
    book.delete()
    messages.success(request, 'Book deleted.')
    return redirect('/books/')


@login_required
def my_favorites(request):
    """Sensei Bonus: page showing all of the user's favorited books."""
    fav_books = request.user.liked_books.all()
    return render(request, 'books_app/favorites.html', {'fav_books': fav_books})
