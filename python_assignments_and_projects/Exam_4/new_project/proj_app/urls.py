from django.urls import path
from . import views   

urlpatterns = [
    path('', views.login_register),
    path('register/',views.register),
    path('login/',views.login),
    path('dashboard/',views.dashboard),
    path('logout/',views.logout),
    path('create_game/',views.create_game),
    path('game/<int:id>/',views.details_page),
    path('delete/<int:id>/',views.delete_game),
    path('edit/<int:id>/', views.edit),         
    path('edit/game/<int:id>/', views.edit_page),
    path('game/<int:id>/favorite/',views.add_favorite),
]
