from django.shortcuts import render , redirect
from .models import *
# Create your views here.
def index(request):

    return render(request,"addshow.html")

def edit_show(request,id):
    if request.method=="POST":
        update_show(request.POST,id)
        return redirect("/")
    else :
        show = get_show_id(id)
        return render(request, "editshow.html", {'show': show})

def add_show(request):
    if request.method == 'POST' :
        create_show(request.POST)
        return redirect ('/')
    else :
        return render(request, "addshow.html")

def all_show(request):
    shows =all_the_shows()
    return render(request, "allshow.html", {'shows':shows})

def tv_show(request,id):
    tv_id = get_show_id(id)
    theshows =all_the_shows()
    return render(request,"Tvshows.html",{'tv_id':tv_id,'theshows':theshows})

def delete_show(request,id):
    delete_procress(id)
    return redirect('/')

