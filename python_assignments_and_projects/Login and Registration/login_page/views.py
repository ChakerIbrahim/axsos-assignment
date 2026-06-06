from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.urls import reverse
from .models import *
import bcrypt
# Create your views here.
def signup(request):
    return render(request, 'htmls/sighnup.html')

def create_user(request):
    if request.method =='POST':
        
        errors=User.objects.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('login_page:signup')
        else:
            if not create_account(request.POST) :
                messages.error(request, 'Email already exists')
                return redirect('login_page:signup')
            else:
                messages.success(request, 'Account created successfully')
                return redirect('login_page:login')
    else:
        return redirect('login_page:signup')

def login(request):
    return render(request, 'htmls/index.html')

def check_user(request):
    if request.method == 'POST':

        email = request.POST.get('email')
        password = request.POST.get('password')

        print(f"welcome to home page {email}")
        if find_user(email) :

            user = find_user(email)

            if bcrypt.checkpw(password.encode(), user.password.encode()):

                messages.success(request, 'Login successful')
                
                
                user_id = user.id
                request.session['user_id'] = user_id
                return redirect('login_page:homepage')
            else:
                messages.error(request, 'Invalid email or password')
                return redirect('login_page:login')
        else:
            messages.error(request, 'Invalid email ')
            return redirect('login_page:login')
    else:
        return redirect('login_page:login')

def homepage(request):
        print(f"welcome to home page")
        return render(request, 'htmls/homepage.html')


def logout(request):
    request.session.flush()
    messages.success(request, 'You have been logged out')
    return redirect('login_page:login')