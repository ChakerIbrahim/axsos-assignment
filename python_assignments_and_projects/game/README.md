# Game Tracker — practice build for the FSD exam retake

A working Django app built off your exam wireframe, organized to highlight the
concepts most likely to show up again: custom user model, form validation,
creator-only permissions, query-param sorting, and a many-to-many relationship
that carries extra data (the rating).

## Run it

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install django
python manage.py migrate
python manage.py runserver
```

Visit **http://127.0.0.1:8000/**.

## The 5 concepts worth re-studying tonight

### 1. Custom user model (`accounts/models.py`)
Default Django logs in with `username`. Yours logs in with `email`. To do that:
- Set `username = None` and add `email = EmailField(unique=True)`
- Set `USERNAME_FIELD = 'email'` and `REQUIRED_FIELDS = [...]`
- Write a `CustomUserManager` (the default manager assumes `username` exists)
- In `settings.py`: `AUTH_USER_MODEL = 'accounts.CustomUser'` — **must be set before your first migration**, or you have to blow away the DB and start over. If the exam gives you a model with custom auth fields, do this step first, before writing any other model.

### 2. Form validation patterns (`accounts/forms.py`, `games/forms.py`)
- `clean_<fieldname>()` → validates one field, runs automatically for that field
- `clean()` (no name) → runs last, used to compare fields against each other (password match)
- `forms.ValidationError` is how you fail validation with a message
- Built-in `validate_password()` already enforces minimum length etc. — don't hand-roll what Django gives you for free

### 3. Creator-only permissions (`games/views.py`)
Two separate checks, both necessary:
- **Template-level**: hide the Edit/Delete buttons (`{% if is_creator %}`) — this is just UX
- **View-level**: re-check `game.created_by_id != request.user.id` inside the view and raise `PermissionDenied`. Hiding a button doesn't stop someone hitting the URL directly — this is the check that actually matters

### 4. Sorting via query params
`?sort=name` on the URL → view reads `request.GET.get('sort')` → looks it up in a whitelist dict → `.order_by(field)`. The whitelist matters: never pass the raw query param straight into `.order_by()`, since that lets someone sort (or probe) on a field you didn't intend to expose.

### 5. M2M with extra data (`games/models.py` — the `Rating` model)
A plain `ManyToManyField` can only say "these are related" — it can't store *how* they're related (the rating value). So instead of:
```python
players = models.ManyToManyField(CustomUser)   # can't hold a rating
```
you write the join table yourself as a real model, with both foreign keys plus
the extra field, and `unique_together` to stop duplicate ratings from the same
player.

## Project layout
```
game_tracker_project/   settings, root urls.py
accounts/                CustomUser, register/login/logout, profile
games/                   Game, Rating, dashboard, game detail/edit/delete
```

## Tested end-to-end before handing this to you
- Registration rejects: short names, under-18 DOB, mismatched passwords, duplicate email
- Game creation rejects: name < 2 chars, future release date, blank description
- Login/logout, `@login_required` redirect for anonymous users
- Edit/Delete return 403 for non-creators, even via direct URL
- Add to Favorites + Rate (1–5) work and show up on both the game page and the player's profile
- Sorting works on both the dashboard and the ratings table
