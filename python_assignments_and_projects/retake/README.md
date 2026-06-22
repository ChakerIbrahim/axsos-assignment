# Login + Registration — one page, full validation

## Run it

```bash
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install django
python manage.py migrate
python manage.py runserver
```

Visit **http://127.0.0.1:8000/**.

## How "two forms, one page" actually works

Both `<form>` tags POST to the same URL (`/`). The view tells them apart by
which submit button was clicked — each button has a different `name`:

```html
<button type="submit" name="register_submit">Create Account</button>
...
<button type="submit" name="login_submit">Sign In</button>
```

```python
if 'register_submit' in request.POST:
    ...
elif 'login_submit' in request.POST:
    ...
```

Only the clicked button's name shows up in `request.POST`, so this is a clean
way to route one view to two different forms without two URLs.

## Validations included
- First/last name: required, minimum 4 characters
- Email: valid format, must be unique
- Date of birth: must be 18+ years old
- Password: Django's built-in rules (min 8 chars, not all-numeric, not too common)
- Confirm password: must match password
- Wrong login credentials: generic "Invalid email or password" (never say *which* one was wrong — don't leak whether an email is registered)

## Files to focus on
- `accounts/models.py` — custom user, login by email instead of username
- `accounts/forms.py` — `clean_<field>` (single-field) vs `clean()` (cross-field)
- `accounts/views.py` — the single view handling both forms
- `accounts/templates/accounts/home.html` — the two-card layout
- `accounts/static/accounts/style.css` — styling
