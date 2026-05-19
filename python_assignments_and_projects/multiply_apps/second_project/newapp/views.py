# newapp/views.py
# View functions for the blogs app.
# Each function corresponds to a URL route defined in newapp/urls.py.
# For now, views return placeholder HttpResponse strings.
# In future assignments, these will render templates and interact with the database.

from django.shortcuts import render, redirect  # render for templates, redirect for URL redirection
from django.http import HttpResponse           # Used to return plain text responses (placeholder)

# Create your views here.

def index(request):
    # Handles GET /blogs
    # Will eventually fetch and display all blog posts from the database
    return HttpResponse('placeholder to display a list of all')

def new(request):
    # Handles GET /blogs/new
    # Will eventually render a form for creating a new blog post
    return HttpResponse('placeholder to display a new form to crate a new blog')

def create(request):
    # Handles POST /blogs/create
    # Will eventually save a new blog post to the database
    # After creating, redirects back to the full /blogs list
    return redirect('/blogs')

def show(request, number):
    # Handles GET /blogs/<number>
    # Receives the blog's ID/number as a URL parameter
    # Will eventually fetch and display a single blog post by its number
    return HttpResponse(f'placeholder to display blog number:{number}')

def edit(request, number):
    # Handles GET /blogs/<number>/edit
    # Receives the blog's ID/number as a URL parameter
    # Will eventually render a pre-filled edit form for the specified blog post
    return HttpResponse(f'placeholder to edit blog { number }.')

def destroy(request, number):
    # Handles DELETE /blogs/<number>/delete
    # Receives the blog's ID/number as a URL parameter
    # Will eventually delete the blog post from the database
    # After deleting, redirects back to the full /blogs list
    return redirect('/blogs')