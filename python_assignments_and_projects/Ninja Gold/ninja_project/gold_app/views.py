from django.shortcuts import render, redirect
from random import randint
# Create your views here.
def index(request):

    return render ('index.html')

def calculateGold(request):
    if  request.POST.get('action')=='house':
        request.session[]