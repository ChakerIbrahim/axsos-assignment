from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html')
def guess_number(request):
    number_guessed_form = request.POST['number']