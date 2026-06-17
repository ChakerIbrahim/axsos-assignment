from django.urls import path
from . import views

urlpatterns = [
    path('', views.wall, name='wall'),
    path('comment/<int:message_id>/', views.add_comment, name='add_comment'),
    path('delete/message/<int:message_id>/', views.delete_message, name='delete_message'),
    path('delete/comment/<int:comment_id>/', views.delete_comment, name='delete_comment'),
]
