# exam01

A Django web app for user registration/login and CRUD management of a "Game" list. Built with class-based validation in the model layer, session-based auth, and bcrypt password hashing.

## What's inside

```
exam01/
├── manage.py                  # Django's command-line utility
├── db.sqlite3                 # SQLite database (sample/dev data)
├── exam01/                    # Project config package
│   ├── settings.py            # Installed apps, database, templates, static config
│   ├── urls.py                # Root URL routing (includes exam_app.urls)
│   ├── wsgi.py / asgi.py      # Deployment entry points
│   └── __init__.py
└── exam_app/                  # The single Django app powering the site
    ├── models.py               # User & Game models + validation logic
    ├── views.py                 # Request handling (register, login, CRUD for games)
    ├── urls.py                  # App-level routes
    ├── admin.py
    ├── apps.py
    ├── tests.py
    ├── migrations/               # Schema history (0001_initial, 0002_game_created_by)
    ├── static/                    # CSS files (style01.css, style02.css, styleexam01.css, book_style01.css)
    └── templates/                  # HTML templates (index, player_game, reveal, update)
```

## What the app does

**Authentication**
- `/` — landing page with registration and login forms (`index.html`)
- `/reg/` — handles registration POST; validates name, email, password match, and requires the user be 18+
- `/login/` — handles login POST; checks email/password against bcrypt hash, stores `user_id` in the session
- `/logout/` — clears the session

**Game management** (requires being logged in)
- `/done/` — dashboard listing all games (`player_game.html`)
- `/addgame/` — create a new game (name, genre, release date, description)
- `/gotogame/<id>` — view a single game's details (`reveal.html`)
- `/gotoupdate/<id>` — show the edit form for a game (`update.html`)
- `/editgame/<id>` — handles the update POST
- `/deletegame/<id>` — deletes a game

## Data model

- **User**: first name, last name, email, hashed password, date of birth, timestamps
- **Game**: name, genre, release date, description, `created_by` (FK to User), `users` (M2M to User), timestamps
- Validation (min length, blank checks, date-in-the-past checks, duplicate email checks) lives in a custom `ManagerLogin` manager class shared by both models

## Requirements

- Python 3.10+
- Django (project was generated against the 4.2 docs reference)
- `bcrypt` (used for password hashing — **must be installed separately**, it's not a Django dependency)

There's no `requirements.txt` in the zip, so install manually:

```bash
pip install django bcrypt
```

## Running it

```bash
# from inside the exam01/ folder (where manage.py lives), with your venv activated
python manage.py migrate
python manage.py runserver
```

Then visit `http://127.0.0.1:8000/`.

## Notes / things to be aware of

- `DEBUG = True` and the `SECRET_KEY` is the default insecure auto-generated one — fine for local use, **not safe to deploy as-is**.
- Passwords are hashed with bcrypt before saving (see `create_account` / `enter_account` in `models.py`), but the rest of the validation is hand-rolled rather than using Django's built-in `User`/auth system or `ModelForm`s.
- `db.sqlite3` is included, so the app may already have sample users/games in it — delete it and re-run `migrate` for a clean slate.
- `__pycache__` folders are included in the zip; they're not needed and can be deleted safely.