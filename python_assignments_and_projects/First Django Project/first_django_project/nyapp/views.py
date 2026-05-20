from django.shortcuts import render, redirect, HttpResponse
# from django.http import  # (HttpResponse moved to shortcuts import above)
from django.http import JsonResponse

# Create your views here.

def root(request):
    # Redirects the root URL '/' to the '/blogs' route
    return redirect('/blogs')

def index(request):
    # Displays a placeholder message for the blogs list page
    # Will later render a template showing all blog posts
    return HttpResponse("placeholder to later display a list of all blogs")

def new(request):
    # Displays a placeholder for the new blog form page
    # Will later render a form to create a new blog post
    return HttpResponse("placeholder to display a new form to create a new blog")

def create(request):
    # Handles blog creation logic and redirects back to the root '/'
    # Will later save a new blog post to the database
    return redirect('/')

def show(request, number):
    # Displays a single blog post identified by its number (route parameter)
    # e.g. /blogs/15 → shows blog number 15
    return HttpResponse(f'placeholder to display blog number { number }')

def edit(request, number):
    # Displays an edit form for the blog post with the given number
    # e.g. /blogs/15/edit → edit form for blog 15
    return HttpResponse(f'placeholder to edit blog { number }')

def destroy(request, number):
    # Deletes the blog post with the given number and redirects to '/blogs'
    # e.g. /blogs/15/delete → deletes blog 15
    return redirect('/blogs')

def json(request):
    # (Bonus) Returns a sample JSON response using Django's JsonResponse
    # Demonstrates how to return structured data as JSON from a view
    box = {
        "name": 'chaker',
        "last_name": 'ibrahim',
    }
    return JsonResponse(box)