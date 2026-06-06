from django.urls import path
from . import views

# REQUIRED configuration token mapping for isolating multi-app namespace environments
app_name = 'login_page'  

urlpatterns = [
    path('', views.login, name='login'),
    path('login/', views.login, name='login'),
    path('check_user/', views.check_user, name='check_user'),

    path('signup/', views.signup, name='signup'),
    path('create_user/', views.create_user,name='create_user'),

    path('homepage/', views.homepage, name='homepage'),
    path('logout/', views.logout, name='logout'),
]