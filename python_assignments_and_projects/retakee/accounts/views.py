from django.contrib.auth.models import User
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .models import Project

def register(request):
    if request.method == "POST":

        first_name= request.POST["first_name"]
        last_name=request.POST["last_name"]
        email=request.POST["email"]
        password=request.POST["password"]
        confirm=request.POST["confirm"]

        errors = []

        if len(first_name) < 2:
            errors.append = ("First name must be at least 2 characters")

        if len(last_name) < 2:
            errors.append = ("Last name must be at least 2 characters")

        if len(password) < 8:
            errors.append = ("Password must be at least 8 characters")

        if password != confirm:
            errors.append("Passwords do not match")

        if User.objects.filter(username=email).exists():
            errors.append= ("Email already exists")

        if errors:
            for error in errors:
                messages.error(request,error)

            return redirect("/")

        User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
    return redirect("/")


def login_view(request):

    email = request.POST["email"]
    password = request.POST["password"]

    user = authenticate(
        username=email,
        password=password
    )
    if user:
        login(request, user)
        return redirect("/dashboard")
    
    return redirect("/")

@login_required
def dashboard(request):

    context = {
        "projects": Project.objects.all()
    }

    return render(request,"dashboard.html", context)

@login_required
def create_project(request):
    if request.method == "POST":
        Project.objects.create(
            name=request.POST["name"],
            description=request.POST["description"],
            start_date=request.POST["start_date"],
            end_date=request.POST["end_date"],
            owner=request.user
        )

        return redirect("/dashboard")
    return render(request,"create.html")

@login_required
def join_project(request,id):

    project = Project.objects.get(id=id)

    project.members.add(request.user)

    return redirect("/dashboard")


@login_required
def leave_project(request,id):

    project = Project.objects.get(id=id)

    project.members.remove(request.user)

    return redirect("/dashboard")


@login_required
def delete_project(request,id):

    project = Project.objects.get(id=id)

    if project.owner == request.user:
        project.delete()

    return redirect("/dashboard")