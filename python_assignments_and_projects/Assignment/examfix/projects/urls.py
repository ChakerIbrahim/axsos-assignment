from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('createproject', views.create_project, name='create_project'),
    path('project/<int:id>/details', views.project_details, name='project_details'),
    path('project/<int:id>/join', views.join_project, name='join_project'),
    path('project/<int:id>/leave', views.leave_project, name='leave_project'),
    path('project/<int:id>/edit', views.edit_project, name='edit_project'),
    path('project/<int:id>/delete', views.delete_project, name='delete_project'),
]
