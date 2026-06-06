from django.urls import path
from . import views

urlpatterns = [
    path('',views.addbook,),
    path('addbook/', views.addbook, name='addbook'),
    path('allbooks/', views.allbooks, name='allbooks'),
    path('viewbook/<int:id>/', views.showbook, name='viewbook'),
    path('addauthortobook/<int:id>/', views.addauthor, name='addauthor'),
    path('allauthors/', views.allauthors, name='allauthors'),
    path('viewauthor/<int:id>/', views.showauthor, name='viewauthor'),
    path('addbooktoauthor/<int:id>/', views.addbooktoauthor, name='addbooktoauthor'),
    path('addauthor/', views.addauthor_form, name='addauthor_form'),
]