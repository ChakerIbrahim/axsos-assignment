from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),

    # Core route: location passed via hidden form field (POST)
    path('process_money', views.process_money, name='process_money'),

    # NINJA BONUS: location passed in the URL (GET)
    path('process_money/<str:location>', views.process_money_url, name='process_money_url'),

    # SENSEI BONUS: set win conditions
    path('set_win_conditions', views.set_win_conditions, name='set_win_conditions'),

    # Reset
    path('reset', views.reset, name='reset'),
]
