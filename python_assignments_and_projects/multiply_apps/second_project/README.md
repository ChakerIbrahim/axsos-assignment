# Multiple Apps - Django Assignment

A Django project demonstrating how to structure a web application with **multiple independent apps** that can be reused across projects. This project includes three apps: `newapp` (blogs), `surveys`, and `users`.

---

## Project Structure

```
multiply_apps/
├── second_project/          # Main Django project folder
│   ├── settings.py          # Project settings (INSTALLED_APPS, etc.)
│   ├── urls.py              # Root URL configuration
│   ├── asgi.py
│   └── wsgi.py
├── newapp/                  # Blogs app
│   ├── views.py             # View functions for blog routes
│   ├── urls.py              # URL patterns for /blogs/...
│   ├── models.py
│   └── apps.py
├── surveys/                 # Surveys app
│   ├── views.py             # View functions for survey routes
│   ├── urls.py              # URL patterns for /surveys/...
│   ├── models.py
│   └── apps.py
├── users/                   # Users app
│   ├── views.py             # View functions for user routes
│   ├── urls.py              # URL patterns for /register, /login, etc.
│   ├── models.py
│   └── apps.py
├── db.sqlite3
└── manage.py
```

---

## Apps & Routes

### Blogs (`newapp`)

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/blogs` | List all blogs (`index`) |
| GET | `/blogs/new` | Show form to create a new blog (`new`) |
| POST | `/blogs/create` | Create blog → redirect to `/blogs` (`create`) |
| GET | `/blogs/<number>` | Show a specific blog (`show`) |
| GET | `/blogs/<number>/edit` | Edit form for a blog (`edit`) |
| DELETE | `/blogs/<number>/delete` | Delete blog → redirect to `/blogs` (`destroy`) |

### Surveys

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/surveys` | List all surveys (`survey`) |
| GET | `/surveys/new` | Form to add a new survey (`survey_new`) |

### Users

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/register` | Register a new user |
| GET | `/login` | User login page |
| GET | `/users/new` | Same handler as `/register` |
| GET | `/users` | List all users |

---

## Setup & Installation

### Prerequisites
- Python 3.x
- Django (`pip install django`)

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd multiply_apps
   ```

2. **Install dependencies**
   ```bash
   pip install django
   ```

3. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

4. **Run the development server**
   ```bash
   python manage.py runserver
   ```

5. **Visit the app**
   Open your browser and go to `http://127.0.0.1:8000/blogs`

---

## Key Concepts Demonstrated

- **Multiple Django apps** within a single project
- **URL namespacing** using `include()` in the root `urls.py`
- **Redirects** using `django.shortcuts.redirect`
- **Dynamic URL parameters** (e.g., `<number>` for blog IDs)
- **Reusable app design** — each app can be plugged into other Django projects

---

## Root URL Configuration

The root `urls.py` delegates routes to each app using `include()`:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('newapp.urls')),      # handles /blogs/...
    path('survey/', include('surveys.urls')),  # handles /surveys/...
    path('users/', include('users.urls')),     # handles /register, /login, /users/...
]
```

---

## Notes

- All views currently return **placeholder `HttpResponse` strings** — templates and database logic will be added in future assignments.
- When redirecting, always provide the **full path starting with `/`** (e.g., `redirect('/blogs')`).
- The `users` app routes (`/register`, `/login`) do **not** share a common prefix, unlike `blogs` and `surveys`.
