from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('register', views.register),
    path('login', views.login_view),
    path('logout/', views.logout_view),
    path('dashboard/', views.dashboard),
    path('createproject', views.create_project),
    path('project/<int:id>/details', views.project_details),
    path('project/<int:id>/join', views.join_project),
    path('project/<int:id>/leave', views.leave_project),
    path('project/<int:id>/edit', views.edit_project),
    path('project/<int:id>/delete', views.delete_project),
]
