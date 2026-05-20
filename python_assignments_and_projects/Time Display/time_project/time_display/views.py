# views.py
# This file contains the view functions for the time_display app.
# Views handle incoming HTTP requests and return HTTP responses.

from django.shortcuts import render  # render() combines a template with a context and returns an HttpResponse
from time import gmtime, strftime    # gmtime() gets current UTC time; strftime() formats it as a string

# Create your views here.

def time(request):
    """
    View function for the root URL.
    Retrieves the current UTC time, formats it, and passes it to the template.
    """

    # Build the context dictionary — this data will be available inside the template
    context = {
        # strftime formats the time according to the format string:
        # %Y = 4-digit year (e.g. 2026)
        # %m = 2-digit month (e.g. 05)
        # %d = 2-digit day (e.g. 20)
        # %H = Hour in 24-hour format
        # %M = Minutes
        # %p = AM/PM
        "time": strftime("%Y-%m-%d %H:%M %p", gmtime())
    }

    # Render the index.html template with the context and return it as an HTTP response
    return render(request, 'index.html', context)