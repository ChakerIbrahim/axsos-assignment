from django.urls import path
from . import views

urlpatterns = [
    # READ all
    path('shows/', views.index, name='tv_shows_index'),
    # READ one
    path('shows/<int:show_id>/', views.show, name='tv_shows_show'),
    # CREATE (form)
    path('shows/new/', views.new, name='tv_shows_new'),
    # CREATE (submit)
    path('shows/create/', views.create, name='tv_shows_create'),
    # UPDATE (form)
    path('shows/<int:show_id>/edit/', views.edit, name='tv_shows_edit'),
    # UPDATE (submit)
    path('shows/<int:show_id>/update/', views.update, name='tv_shows_update'),
    # DELETE
    path('shows/<int:show_id>/destroy/', views.destroy, name='tv_shows_destroy'),
]
