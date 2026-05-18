from django.urls import path
from . import views

urlpatterns=[
    path('', views.index),
    path('chaker', views.chaker ),
    path('ibrahim', views.ibrahim)
]
