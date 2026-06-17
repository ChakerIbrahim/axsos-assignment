from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages

from .models import User


# ─── Auth helpers ───────────────────────────────────────────────────────────

def get_session_user(request):
    """Return the logged-in User object or None."""
    uid = request.session.get('user_id')
    if not uid:
        return None
    try:
        return User.objects.get(id=uid)
    except User.DoesNotExist:
        return None


def login_required_custom(request):
    """Redirect to login if not logged in. Return None if OK."""
    if not request.session.get('user_id'):
        messages.error(request, 'Please log in first.')
        return redirect('/login/')
    return None


# ─── Root ───────────────────────────────────────────────────────────────────

def index_root(request):
    if request.session.get('user_id'):
        return redirect('/users/')
    return redirect('/login/')


# ─── Register ───────────────────────────────────────────────────────────────

def register_page(request):
    if request.session.get('user_id'):
        return redirect('/users/')

    if request.method == 'POST':
        errors, cleaned = User.objects.validate_register(request.POST)
        if errors:
            for e in errors:
                messages.error(request, e)
            return render(request, 'users_app/register.html', {'data': request.POST})

        user = User.objects.register(**cleaned)
        request.session['user_id'] = user.id
        messages.success(request, f'Welcome, {user.first_name}! Account created.')
        return redirect('/users/')

    return render(request, 'users_app/register.html')


# ─── Login ───────────────────────────────────────────────────────────────────

def login_page(request):
    if request.session.get('user_id'):
        return redirect('/users/')

    if request.method == 'POST':
        email = request.POST.get('email', '')
        password = request.POST.get('password', '')
        user = User.objects.authenticate(email, password)
        if user:
            request.session['user_id'] = user.id
            messages.success(request, f'Welcome back, {user.first_name}!')
            return redirect('/users/')
        messages.error(request, 'Invalid email or password.')

    return render(request, 'users_app/login.html')


# ─── Logout ──────────────────────────────────────────────────────────────────

def logout_view(request):
    request.session.flush()
    messages.success(request, 'You have been logged out.')
    return redirect('/login/')


# ─── Users Index (dashboard) ─────────────────────────────────────────────────

def users_index(request):
    guard = login_required_custom(request)
    if guard:
        return guard

    current_user = get_session_user(request)
    all_users = User.objects.all()
    return render(request, 'users_app/index.html', {
        'all_users': all_users,
        'current_user': current_user,
    })


# ─── User Detail (show) ──────────────────────────────────────────────────────

def user_detail(request, user_id):
    guard = login_required_custom(request)
    if guard:
        return guard

    profile = get_object_or_404(User, id=user_id)
    current_user = get_session_user(request)
    return render(request, 'users_app/detail.html', {
        'profile': profile,
        'current_user': current_user,
    })


# ─── New User (admin creates) ─────────────────────────────────────────────────

def new_user(request):
    guard = login_required_custom(request)
    if guard:
        return guard

    current_user = get_session_user(request)

    if request.method == 'POST':
        errors, cleaned = User.objects.validate_register(request.POST)
        if errors:
            for e in errors:
                messages.error(request, e)
            return render(request, 'users_app/new.html', {
                'data': request.POST,
                'current_user': current_user,
            })
        User.objects.register(**cleaned)
        messages.success(request, 'New user created successfully!')
        return redirect('/users/')

    return render(request, 'users_app/new.html', {'current_user': current_user})


# ─── Edit User ────────────────────────────────────────────────────────────────

def edit_user(request, user_id):
    guard = login_required_custom(request)
    if guard:
        return guard

    user_to_edit = get_object_or_404(User, id=user_id)
    current_user = get_session_user(request)

    if request.method == 'POST':
        errors, cleaned = User.objects.validate_edit(request.POST, user_id)
        if errors:
            for e in errors:
                messages.error(request, e)
            return render(request, 'users_app/edit.html', {
                'user_to_edit': user_to_edit,
                'data': request.POST,
                'current_user': current_user,
            })

        user_to_edit.first_name = cleaned['first_name']
        user_to_edit.last_name = cleaned['last_name']
        user_to_edit.email = cleaned['email']
        user_to_edit.save()
        messages.success(request, 'User updated successfully!')

        # If user edited their own profile, update session remains valid
        return redirect(f'/users/{user_id}/')

    return render(request, 'users_app/edit.html', {
        'user_to_edit': user_to_edit,
        'current_user': current_user,
    })


# ─── Delete User ─────────────────────────────────────────────────────────────

def delete_user(request, user_id):
    guard = login_required_custom(request)
    if guard:
        return guard

    user_to_delete = get_object_or_404(User, id=user_id)
    current_uid = request.session.get('user_id')

    user_to_delete.delete()

    # If the user deleted their own account, log them out
    if current_uid == user_id:
        request.session.flush()
        messages.success(request, 'Your account has been deleted.')
        return redirect('/login/')

    messages.success(request, f'User "{user_to_delete.full_name}" deleted.')
    return redirect('/users/')
