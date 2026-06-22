from django.shortcuts import render , redirect
from .models import *
from django.contrib import messages

# first page 
def index(request):
    data = show_data()
    return render (request,"index.html",{'data':data})

def reg_form(request):
    if request.method == "POST":
        errors = User.objects.login_valid(request.POST)
        if len(errors) >0 :
            for key,value in errors.items():
                messages.error(request,value)
            return redirect('/')
        else:
            create_account(request.POST)
            messages.success(request,"DONE")
            return redirect('/')
    else:
        data = show_data()
        return render(request,"index.html",{'data': data})

def login_form(request):
    if request.method == "POST":
        result = enter_account(request.POST)
        if result:
            request.session['user_id'] = result.id
            return redirect('/done')
        else:
            messages.error(request,"invalid email or password")
            return redirect('/')

# the sec page
def success(request):
    if 'user_id' not in request.session:
        return redirect('/')
    user = User.objects.get(id=request.session['user_id'])
    game_data = show_game()
    return render(request,"player_game.html",{"user":user,"game_data":game_data})

def logout(request):
    request.session.flush()
    return redirect('/')    

def game_form(request):
    if request.method == "POST":
        errorss = Game.objects.game_check(request.POST)
        if len(errorss) > 0 :
            for key,value in errorss.items():
                messages.error(request,value)
            return redirect('/done')
        else:
            user = User.objects.get(id=request.session['user_id'])
            create_game(request.POST,user)
            messages.success(request,"DONE")
            return redirect('/done')
    else:
        user = User.objects.get(id=request.session['user_id'])
        game_data = show_game()
        return render(request,"player_game.html",{"user":user,"game_data":game_data})
    
def reveal_game(request,id):
    if 'user_id' not in request.session:
        return redirect('/done')
    user = User.objects.get(id = request.session['user_id'])
    game = Game.objects.get(id = id)
    
    return render(request, "reveal.html", {"user": user, "game": game})

def delete_game(request,id):
    if 'user_id' not in request.session:
        return redirect('/')
    if get_user_for_game(id) != request.session['user_id']:
        return redirect('/done')
    Game.objects.get(id=id).delete()
    return redirect('/done')

def update_menu(request,id):
    if 'user_id' not in request.session:
        return redirect('/')
    if get_user_for_game(id) != request.session['user_id']:
        return redirect('/done')
    user = User.objects.get(id = request.session['user_id'])
    game = Game.objects.get(id = id)
    return render(request, "update.html", {"user": user, "game": game})


def edit_game(request,id):
    if request.method=="POST":
        errorsss = Game.objects.update_check(request.POST)
        if len(errorsss) > 0 :
            for key,value in errorsss.items():
                messages.error(request,value)
            return redirect(f'/gotoupdate/{id}')
        else:
            update_game(request.POST,id)
            return redirect('/done')
        
