from django.urls import path
from . import views  # the dot means the views file is in the same directory as this file

urlpatterns = [
    path('', views.some_function),
    # path('bears', views.index),
    # path('bears/<int:my_val>', views.method),
    # path('bears/str:name>/poke',views.another),
    # path('<int:id>/<str:color>',views.more),
]