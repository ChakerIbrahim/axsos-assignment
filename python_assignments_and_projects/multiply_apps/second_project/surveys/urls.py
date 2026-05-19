# surveys/urls.py
# URL configuration for the surveys app.
# The root urls.py includes this file with path('survey/', include('surveys.urls'))
# so the full URLs become /survey/landing and /survey/landing/new

from django.urls import path
from . import views  # Import view functions from this app's views.py

urlpatterns = [
    # /surveys (via /survey/landing) - displays all surveys that have been created
    path('landing', views.survey),

    # /surveys/new (via /survey/landing/new) - form for users to add a new survey
    path('landing/new', views.survey_new)
]