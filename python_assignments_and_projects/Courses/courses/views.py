from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Course, Description
from django.core.exceptions import ValidationError

def home(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        desc_text = request.POST.get('description')
        
        if name and desc_text:
            try:
                # Validate lengths
                if len(name) <= 5:
                    messages.error(request, "Course name must be more than 5 characters.")
                    return render(request, 'courses/home.html', {'courses': Course.objects.all()})
                if len(desc_text) <= 15:
                    messages.error(request, "Description must be more than 15 characters.")
                    return render(request, 'courses/home.html', {'courses': Course.objects.all()})
                
                description = Description.objects.create(text=desc_text)
                course = Course.objects.create(name=name, description=description)
                messages.success(request, "Course added successfully!")
                return redirect('home')
            except ValidationError as e:
                messages.error(request, str(e))
        else:
            messages.error(request, "Name and description are required.")
    
    courses = Course.objects.all()
    return render(request, 'courses/home.html', {'courses': courses})

def delete_course(request, pk):
    course = get_object_or_404(Course, pk=pk)
    return render(request, 'courses/confirm_delete.html', {'course': course})

def confirm_delete(request, pk):
    course = get_object_or_404(Course, pk=pk)
    if request.method == 'POST':
        if request.POST.get('confirm') == 'yes':
            course.delete()
            messages.success(request, "Course deleted successfully!")
        else:
            messages.info(request, "Deletion cancelled.")
        return redirect('home')
    # If someone GETs this directly, show confirmation again or redirect
    return render(request, 'courses/confirm_delete.html', {'course': course})
