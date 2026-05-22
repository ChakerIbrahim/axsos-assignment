from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),                          # Home page - shows all users
    path('created_user', views.created_user),       # Endpoint that handles form submission
]