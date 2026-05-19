# surveys/views.py
# View functions for the surveys app.
# Each function corresponds to a URL route defined in surveys/urls.py.
# Currently returns placeholder HttpResponse strings.

from django.shortcuts import render        # For rendering templates (to be used later)
from django.http import HttpResponse       # Used to return plain text placeholder responses

# Create your views here.

def survey(request):
    # Handles GET /surveys
    # Will eventually query the database and display all surveys
    return HttpResponse('placeholder to display all the serveys created ')

def survey_new(request):
    # Handles GET /surveys/new
    # Will eventually render a form allowing users to create a new survey
    return HttpResponse('placeholder for users to add a new survey')