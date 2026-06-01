# newapp/urls.py
# URL configuration for the "newapp" (blogs) app.
# These patterns handle all routes that start with /blogs/...
# The root urls.py includes this file with path('', include('newapp.urls'))

from django.urls import path
from . import views  # Import view functions from this app's views.py
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='/blogs')),  # Add this
    # /blogs - displays a list of all blogs (index view)
    path('blogs', views.index),

    # /blogs/new - displays a form to create a new blog post
    path('blogs/new', views.new),

    # /blogs/create - handles form submission; creates blog and redirects to /blogs
    path('blogs/create', views.create),

    # /blogs/<number> - displays a single blog post by its ID/number
    path('blogs/<number>', views.show),

    # /blogs/<number>/edit - displays an edit form for a specific blog post
    path('blogs/<number>/edit', views.edit),

    # /blogs/<number>/delete - deletes a blog post and redirects to /blogs
    path('blogs/<number>/delete', views.destroy),
]