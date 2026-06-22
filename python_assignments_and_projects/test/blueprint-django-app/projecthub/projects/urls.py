from django.urls import path

from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('projects/create/', views.create_project, name='create_project'),
    path('projects/<int:pk>/', views.project_details, name='project_details'),
    path('projects/<int:pk>/edit/', views.edit_project, name='edit_project'),
    path('projects/<int:pk>/delete/', views.delete_project, name='delete_project'),
    path('projects/<int:pk>/join/', views.join_project, name='join_project'),
    path('projects/<int:pk>/leave/', views.leave_project, name='leave_project'),
    path('projects/<int:pk>/remove-member/<int:user_id>/', views.remove_member, name='remove_member'),
]
