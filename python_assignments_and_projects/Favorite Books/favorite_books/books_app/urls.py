from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='books_index'),
    path('<int:book_id>/', views.book_detail, name='book_detail'),
    path('<int:book_id>/favorite/', views.favorite_book, name='favorite_book'),
    path('<int:book_id>/unfavorite/', views.unfavorite_book, name='unfavorite_book'),
    path('<int:book_id>/edit/', views.edit_book, name='edit_book'),
    path('<int:book_id>/delete/', views.delete_book, name='delete_book'),
    path('my-favorites/', views.my_favorites, name='my_favorites'),
]
