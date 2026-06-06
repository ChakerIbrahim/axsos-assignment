from django.shortcuts import render , redirect
from .models import Book,Author

# Create your views here.
def addbook(request):
    if request.method=='POST':
        title = request.POST.get('title')
        description=request.POST.get('description')
        Book.objects.create(title=title, description=description)
        return redirect('/allbooks/')
    else:
        context = {'books': Book.objects.all()}
        return render(request,'addbook.html',context)


def allbooks(request):
    context={
        "books": Book.objects.all(),
    }
    return render(request,'allbooks.html', context)

def showbook(request,id):
    book=Book.objects.get(id=id)
    context={
        'book':book,
        'authors':book.authors.all(),
        'all_authors': Author.objects.exclude(id__in=book.authors.all()),
    }

    return render(request,'viewbooks.html', context)

def addauthor(request, id):
    if request.method == 'POST':
        author_id = request.POST.get('author_id')
        book = Book.objects.get(id=id)
        author = Author.objects.get(id=author_id)
        book.authors.add(author)
        return redirect(f'/viewbook/{id}/')
    else:                                   
        return redirect(f'/viewbook/{id}/')

def addauthor_form(request):
    if request.method == 'POST':
        firstname = request.POST.get('firstname')
        lastname = request.POST.get('lastname')
        notes = request.POST.get('notes')
        Author.objects.create(firstname=firstname, lastname=lastname, notes=notes)
        return redirect('/allauthors/')
    
    else:
        context = {'authors': Author.objects.all()}
        return render(request, 'addauthor.html', context)
    
def allauthors(request):
    context={
        "authors": Author.objects.all(),
    }
    return render(request,'allauthors.html', context)
def showauthor(request,id):
    author=Author.objects.get(id=id)
    context={
        'author':author,
        'books':author.books.all(),
        'all_books': Book.objects.exclude(id__in=author.books.all()),
    }
    return render(request,'viewauthors.html', context)

def addbooktoauthor(request, id):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        author = Author.objects.get(id=id)
        book = Book.objects.get(id=book_id)
        author.books.add(book)
        return redirect(f'/viewauthor/{id}/')
    else:
        return redirect(f'/viewauthor/{id}/')
