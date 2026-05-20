# urls.py (time_display app)
# This file defines the URL patterns for the time_display app.
# Django uses these patterns to route incoming requests to the correct view function.

from django.urls import path  # path() is used to define URL routes
from . import views           # Import views from the current app (time_display)

# urlpatterns is the list Django looks for when resolving URLs
urlpatterns = [
    # Route the root URL ('') to the time() view function
    # e.g. visiting localhost:8000/ will call views.time
    path('', views.time),
]