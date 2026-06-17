from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('smart_app.urls')),   # ← fixed: was 'smart_app,urls' (comma bug)
]
