# second_project/urls.py
# Root URL configuration for the second_project Django project.
# This file acts as the main router — it delegates URL handling
# to each app's own urls.py file using include().
#
# How it works:
#   - path('', include('newapp.urls'))      → matches /blogs/... routes (no prefix)
#   - path('survey/', include('surveys.urls')) → matches /survey/... routes
#   - path('users/', include('users.urls'))    → matches /register, /login, /users/...

"""
URL configuration for second_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  # include() lets us delegate to app-level url files

urlpatterns = [
    # Django's built-in admin panel — accessible at /admin/
    path('admin/', admin.site.urls),

    # Delegates all blog-related routes to newapp/urls.py
    # No prefix here so /blogs routes are matched directly
    path('', include('newapp.urls')),

    # Delegates all survey-related routes to surveys/urls.py
    # Routes will be accessible under /survey/...
    path('survey/', include('surveys.urls')),

    # Delegates all user-related routes to users/urls.py
    # Unlike blogs/surveys, user routes (/register, /login) don't share a single prefix
    path('users/', include('users.urls')),
]