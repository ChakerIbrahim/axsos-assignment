from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('login_app.urls')),
    path('books/', include('books_app.urls')),
]
