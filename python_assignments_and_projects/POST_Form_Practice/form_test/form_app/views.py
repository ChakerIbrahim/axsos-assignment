from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, "index.html")
# def create_user(request):
#     print("Got POST info.....................")
#     name_from_form = request.POST['name']
#     email_from_form = request.POST['email']
#     context = {
#         "name_on_template": name_from_form,
#         "email_on_template": email_from_form
#     }
#     return render(request, "show.html", context)
def create_user(request):
    name_from_form = request.POST['name']
    email_from_form = request.POST['email']
    return redirect("/success")

def success(request):
    return render(request, "sucess.html")