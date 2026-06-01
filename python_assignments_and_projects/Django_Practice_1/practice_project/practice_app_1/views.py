from django.shortcuts import render, redirect

# Create your views here.
# def index(request):
#     pass
# def method(request, my_val):
#     pass
# def another(request, name):
#     pass
# def more(request, id , color):
#     pass

# def data(request):
#     context={
#         "name": "Noelle",
#         "favorite_color": "turquoise",
#         "pets": ["Bruce", "Fitz", "Geogie"]
#     }
#     return render(request,"index.html", context)

# def some_function(request):
#     if request.method == "GET":
#         print("A GET request is being made to this route")
#         return render(request, "some_template.html")
    
#     if request.method == "POST":
#         print("A POST request is being made to this route")
#         return redirect("/")
    

# def someone_function(request):
#     if request.method == "GET":
#         print(request.GET)

#     if request.method == "POST":
#         print(request.POST)


def some_function(request):
    if request.method == "POST":
        val_from_field_one = request.POST["one"]
        val_from_field_two = request.POST["two"]
    return render(request, "some_template.html")