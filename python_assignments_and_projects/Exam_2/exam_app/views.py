from django.shortcuts import render,redirect
from . import models
from .models import User
from django.contrib import messages



def login_register(request):
    return render(request,"login_register.html")

def register(request):
    if request.method == "POST":
        errors = models.User.objects.basic_validator(request.POST)    
        if len(errors) > 0:
                for key, value in errors.items():
                    messages.error(request, value)
                return redirect("/")
        else :	
            user = models.register(request.POST)
            request.session['user_id'] = user.id
            return redirect("/dashboard/")
        

def login(request):
    if request.method == "POST":
        user = models.login(request.POST)
        if user:
            request.session['user_id'] = user.id
            return redirect("/dashboard/")
        else:
            return redirect("/")

def dashboard(request):
    if 'user_id' not in request.session :
        return redirect("/")
    else:
        context = {
            'user':models.get_specific_user(request),
            "all_games":models.get_all_game()
        }
        return render(request,"dashboard.html",context)
    
# def dashboard(request):
#     if 'user_id' not in request.session:
#         return redirect('/')

#     sort = request.GET.get('sort', 'name')

#     games = Game.objects.all().order_by(sort)

#     context = {
#         "user": User.objects.get(id=request.session['user_id']),
#         "games": games,
#     }
#     return render(request, "dashboard.html", context)

def logout(request):
    if request.method == "POST":
        request.session.flush()
        return redirect("/")


def create_game(request):
    if request.method == "POST":
        errors = models.Game.objects.basic_validator(request.POST)    
        if len(errors) > 0:
                for key, value in errors.items():
                    messages.error(request, value)
                return redirect("/")
        else :	
            new_game = models.create_game(request.POST,request)
            return redirect("/dashboard/")
        
# def create_game(request):
#     if request.method == "POST":
#         errors = Game.objects.game_validator(request.POST)
#         if errors:
#             for e in errors.values():
#                 messages.error(request, e)
#             return redirect('/dashboard')

#         Game.objects.create(
#             name=request.POST['name'],
#             genre=request.POST['genre'],
#             release_date=request.POST['release_date'],
#             description=request.POST['description'],
#             creator=User.objects.get(id=request.session['user_id'])
#         )

#         return redirect('/dashboard')

        

def details_page(request,id):
    context = {
        "games_get":models.get_specific_game(id),
        'user':models.get_specific_user(request),
    }
    return render(request,"details.html",context)

def delete_game(request,id):
    if request.method == "POST":
        models.delete_game(id)
    return redirect("/dashboard/")

# def game_info(request, game_id):
#     game = Game.objects.get(id=game_id)
#     players = game.liked_by.all().order_by('first_name')

#     context = {
#         "game": game,
#         "players": players,
#         "user": User.objects.get(id=request.session['user_id'])
#     }
#     return render(request, "game_info.html", context)



# def edit_game(request, game_id):
#     game = Game.objects.get(id=game_id)
#     if request.session['user_id'] != game.creator.id:
#         return redirect('/dashboard')

#     if request.method == "POST":
#         errors = Game.objects.game_validator(request.POST)
#         if errors:
#             for e in errors.values():
#                 messages.error(request, e)
#             return redirect(f'/edit/{game_id}')

#         game.name = request.POST['name']
#         game.genre = request.POST['genre']
#         game.release_date = request.POST['release_date']
#         game.description = request.POST['description']
#         game.save()

#         return redirect(f'/game/{game_id}')

#     return render(request, "edit.html", {"game": game})


def edit(request,id):
    context = {
        'show_game':models.show_game_edit(id)
    }
    return render(request,"edit.html",context)


def edit_page(request, id):
    if request.method == "POST":
        errors = models.Game.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect(f"/edit/{id}/")
        else:
            models.edit_page(request.POST, id)
            return redirect(f"/game/{id}/")
    else:
        return redirect(f"/edit/{id}/")



def add_favorite(request,id):
    user = models.User.objects.get(id = request.session['user_id'])
    game = models.get_game_by_id(id)
    game.favorites.add(user)
    return redirect(f"/game/{id}/")

