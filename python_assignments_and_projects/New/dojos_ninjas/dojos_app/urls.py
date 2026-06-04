from django.urls import path
from . import views

urlpatterns = [
    # Main page - shows both forms and all dojos
    path('', views.index, name='index'),

    # Route to process new dojo form submission
    path('dojos/create/', views.create_dojo, name='create_dojo'),

    # Route to process new ninja form submission
    path('ninjas/create/', views.create_ninja, name='create_ninja'),

    # NINJA BONUS: Route to delete a dojo (and its ninjas via CASCADE)
    path('dojos/<int:dojo_id>/delete/', views.delete_dojo, name='delete_dojo'),
]
