from django.shortcuts import render
# from django.shortcuts import  HttpResponse

# Create your views here.
def index(request):
    return render(request, "index.html")
def chaker(request):
    return render(request, "chaker.html")
def ibrahim(request):
    return render(request, "ibrahim.html")
