from django.urls import path
from . import views

urlpatterns = [
    path('',views.index , name="main"),
    path('reg/',views.reg_form ,name="reg"),
    path('login/',views.login_form, name="login"),
    path('done/',views.success,name="done"),
    path('logout/',views.logout, name="logout"),
    path('addgame/',views.game_form,name="addgame"),
    path('gotogame/<int:id>',views.reveal_game , name="reveal"),
    path('deletegame/<int:id>', views.delete_game),
    path('gotoupdate/<int:id>',views.update_menu),
    path('editgame/<int:id>',views.edit_game,name="editgame"),
]