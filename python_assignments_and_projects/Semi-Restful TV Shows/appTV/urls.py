from django.urls import path
from . import views
urlpatterns = [
    path('',views.all_show , name='home'),
    path('addshow/' , views.add_show , name='addshow'),
    path('editshow/<int:id>',views.edit_show,name='editshow'),
    path('gotoaddshow/' , views.index , name='gotoaddshow'),
    path('tvshow/<int:id>',views.tv_show,name = "tvshow"),
    path('delete/<int:id>',views.delete_show,name="delete"),
]
