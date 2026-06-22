from django.urls import path

from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('game/<int:id>/', views.game_detail, name='game_detail'),
    path('edit/game/<int:id>/', views.game_edit, name='game_edit'),
    path('game/<int:id>/delete/', views.game_delete, name='game_delete'),
]
