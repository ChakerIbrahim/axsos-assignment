from django.urls import path
from . import views

urlpatterns = [
path('', views.index, name='index'),
path('dojos/create', views.create_dojo, name='create_dojo'),
path('ninjas/create', views.create_ninja, name='create_ninja'),
path('dojos/<int:dojo_id>/delete', views.delete_dojo, name='delete_dojo'),

]