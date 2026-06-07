from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tv_shows_app.urls')),
    # Redirect root to /shows/
    path('', RedirectView.as_view(url='/shows/', permanent=False)),
]
