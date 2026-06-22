from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, redirect, render

from .forms import ProjectForm
from .models import Project

User = get_user_model()


@login_required
def dashboard(request):
    projects = Project.objects.select_related('owner').prefetch_related('members')
    rows = []
    for project in projects:
        rows.append({
            'project': project,
            'is_owner': project.is_owner(request.user),
            'is_member': project.is_member(request.user),
        })
    return render(request, 'projects/dashboard.html', {'rows': rows})


@login_required
def create_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, require_future_start=True)
        if form.is_valid():
            project = form.save(commit=False)
            project.owner = request.user
            project.save()
            messages.success(request, f'"{project.name}" was created.')
            return redirect('project_details', pk=project.pk)
    else:
        form = ProjectForm(require_future_start=True)
    return render(request, 'projects/create_project.html', {'form': form})


@login_required
def project_details(request, pk):
    project = get_object_or_404(Project.objects.select_related('owner').prefetch_related('members'), pk=pk)
    is_owner = project.is_owner(request.user)
    is_member = project.is_member(request.user)
    return render(request, 'projects/project_details.html', {
        'project': project,
        'is_owner': is_owner,
        'is_member': is_member,
        'team': project.members.all(),
    })


@login_required
def edit_project(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if not project.is_owner(request.user):
        messages.error(request, 'Only the project owner can edit this project.')
        return redirect('project_details', pk=pk)

    if request.method == 'POST':
        form = ProjectForm(request.POST, instance=project, require_future_start=False)
        if form.is_valid():
            form.save()
            messages.success(request, 'Project updated.')
            return redirect('project_details', pk=pk)
    else:
        form = ProjectForm(instance=project, require_future_start=False)
    return render(request, 'projects/edit_project.html', {'form': form, 'project': project})


@login_required
def delete_project(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if not project.is_owner(request.user):
        messages.error(request, 'Only the project owner can delete this project.')
        return redirect('project_details', pk=pk)
    if request.method == 'POST':
        name = project.name
        project.delete()
        messages.success(request, f'"{name}" was deleted.')
        return redirect('dashboard')
    return redirect('project_details', pk=pk)


@login_required
def join_project(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        if project.is_owner(request.user):
            messages.error(request, "You already own this project.")
        else:
            project.members.add(request.user)
            messages.success(request, f'You joined "{project.name}".')
    return redirect(request.POST.get('next') or 'dashboard')


@login_required
def leave_project(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        project.members.remove(request.user)
        messages.success(request, f'You left "{project.name}".')
    return redirect(request.POST.get('next') or 'dashboard')


@login_required
def remove_member(request, pk, user_id):
    project = get_object_or_404(Project, pk=pk)
    if not project.is_owner(request.user):
        messages.error(request, 'Only the project owner can remove team members.')
        return redirect('project_details', pk=pk)
    if request.method == 'POST':
        member = get_object_or_404(User, pk=user_id)
        project.members.remove(member)
        messages.success(request, f'{member.full_name} was removed from the team.')
    return redirect('project_details', pk=pk)
