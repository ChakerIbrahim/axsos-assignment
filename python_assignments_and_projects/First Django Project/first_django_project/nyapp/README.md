# First Django Project

A Django web application built as part of the Django Intro routing assignment.

## Objectives

- Practice setting up a new Django project
- Practice setting up a new Django app
- Practice routing in Django
- Familiarity with views and how to return a response

## Project Structure
first_django_project/
├── first_django_project/
│   ├── urls.py        # Main URL configuration
│   ├── settings.py
│   └── wsgi.py
├── myapp/
│   ├── views.py       # All view functions
│   ├── urls.py        # App-level routes
│   ├── models.py
│   └── admin.py
└── manage.py

## URL Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | `root` | Redirects to `/blogs` |
| `/blogs` | `index` | Displays placeholder for all blogs list |
| `/blogs/new` | `new` | Displays placeholder new blog form |
| `/blogs/create` | `create` | Handles creation, redirects to `/` |
| `/blogs/<number>` | `show` | Displays placeholder for a single blog |
| `/blogs/<number>/edit` | `edit` | Displays placeholder edit form |
| `/blogs/<number>/delete` | `destroy` | Deletes blog, redirects to `/blogs` |
| `/blogs/json` | `json` | *(Bonus)* Returns a JSON response |

## How to Run

**1. Install Django**
```bash
pip install django
```

**2. Run the development server**
```bash
python manage.py runserver
```

**3. Visit in browser**

> **Note:** Visit routes with a trailing slash e.g. `/blogs/` not `/blogs`, or ensure `APPEND_SLASH = True` in `settings.py`.

## Notes

- All view functions currently return placeholder `HttpResponse` strings — these will later be replaced with rendered templates.
- Route parameters (e.g. `<number>`) use `int:number` in `urls.py` for type safety.
- The `/blogs/json` endpoint is a bonus feature demonstrating Django's `JsonResponse`.
- `DEBUG = True` is enabled — switch to `False` in production.*-