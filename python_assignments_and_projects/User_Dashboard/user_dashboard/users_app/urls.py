from django.urls import path
from . import views

urlpatterns = [
    # Root
    path('', views.index_root),

    # Auth
    path('register/', views.register_page, name='register'),
    path('login/', views.login_page, name='login'),
    path('logout/', views.logout_view, name='logout'),

    # User CRUD
    path('users/', views.users_index, name='users_index'),
    path('users/new/', views.new_user, name='new_user'),
    path('users/<int:user_id>/', views.user_detail, name='user_detail'),
    path('users/<int:user_id>/edit/', views.edit_user, name='edit_user'),
    path('users/<int:user_id>/delete/', views.delete_user, name='delete_user'),
]
