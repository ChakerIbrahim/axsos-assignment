from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('delete/<int:pk>/', views.delete_course, name='delete_course'),
    path('confirm_delete/<int:pk>/', views.confirm_delete, name='confirm_delete'),
]