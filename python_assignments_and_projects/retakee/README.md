# Login + Registration — fat models, skinny views

No Form classes, no custom user model - the built-in `User`, a small
`Profile` model, and all the business logic moved onto the model. Views just
handle the HTTP back-and-forth.

## Run it

```bash
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install django
python manage.py migrate
python manage.py runserver
```

Visit **http://127.0.0.1:8000/**.

## Fat models, skinny views

The rule of thumb: **a view should only know about HTTP** - read the
request, decide what response to send back. It shouldn't know *what counts
as a valid password* or *how an account gets created*. Those are facts
about your data, so they belong on the model.

Compare `handle_register` before and after:

**Before (logic in the view):**
```python
def handle_register(request):
    first_name = request.POST.get('first_name', '').strip()
    ...
    errors = {}
    if len(first_name) < 4:
        errors['first_name'] = '...'
    ...
    if not errors:
        user = User.objects.create_user(...)
        Profile.objects.create(...)
    ...
```

**After (logic on the model, view just calls it):**
```python
def handle_register(request):
    errors = Profile.validate_registration(request.POST)
    if errors:
        return render(request, 'accounts/home.html', {'errors': errors, 'old': request.POST})
    user = Profile.create_account(request.POST)
    login(request, user)
    return redirect('dashboard')
```

The view is now 6 lines and reads like a summary: *validate, if bad show
errors, if good create the account and log them in.* All the actual rules
live in `accounts/models.py`:

- `Profile.is_old_enough(birth_date)` - one focused helper
- `Profile.validate_registration(data)` - runs all the field checks, returns an errors dict
- `Profile.create_account(data)` - creates the `User` and the `Profile`
- `Profile.authenticate_login(request, data)` - wraps `authenticate()`

### Why this is worth doing
Because the logic now lives on the model instead of inside one specific
view function, you could reuse `Profile.validate_registration(...)` from
the Django admin, a test, an API endpoint, or a management command -
without copying the validation code again. A view is just one *caller* of
that logic, not the only place it can live.

## Validations included
- First/last name: at least 4 characters
- Email: required, must be unique
- Date of birth: must make the user 18+
- Password: at least 8 characters, must match confirm_password
- Wrong login: generic "Invalid email or password" message
