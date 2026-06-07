# Semi-Restful TV Shows Validated

A Django web application that performs full CRUD operations on TV shows, with comprehensive form validation to prevent dirty data from entering the database.

---

## 📋 Assignment Objectives

- Practice validating data before entering it into the database
- Display validation errors on the appropriate form pages
- Apply the same validations to both Create and Edit forms

---

## ✅ Features & Validations

### Core Validations (on both Create and Edit)

| Field | Rules |
|---|---|
| **Title** | Required, minimum 2 characters |
| **Network** | Required, minimum 3 characters |
| **Release Date** | Required |
| **Description** | See Ninja Bonus below |

### 🥷 Ninja Bonus
- **Release Date must be in the past** — future dates are rejected
- **Description is optional**, but if provided it must be at least 10 characters

### 🥋 Sensei Bonus
- **Title uniqueness** — before creating or updating, the app checks if a show with the same title already exists in the database (case-insensitive). Editing a show correctly excludes itself from the check.

---

## 🗂️ Project Structure

```
tv_shows_validated/
├── tv_shows_app/
│   ├── migrations/
│   ├── templates/
│   │   └── tv_shows_app/
│   │       ├── base.html       # Shared layout
│   │       ├── index.html      # All Shows page
│   │       ├── new.html        # Add Show form (with errors)
│   │       ├── edit.html       # Edit Show form (with errors)
│   │       └── show.html       # Single Show detail
│   ├── models.py               # Show model
│   ├── forms.py                # ShowForm with all validations
│   ├── views.py                # CRUD views
│   └── urls.py                 # URL routing
├── tv_shows_project/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── README.md
```

---

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/semi-restful-tv-shows-validated.git
cd semi-restful-tv-shows-validated
```

### 2. Create and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
```

### 3. Install dependencies
```bash
pip install django
```

### 4. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Start the development server
```bash
python manage.py runserver
```

### 6. Open in browser
```
http://localhost:8000/shows/
```

---

## 🔗 Routes (Semi-RESTful)

| Method | URL | Action | Description |
|--------|-----|--------|-------------|
| GET | `/shows/` | `index` | List all TV shows |
| GET | `/shows/new/` | `new` | Show create form |
| POST | `/shows/create/` | `create` | Submit new show |
| GET | `/shows/<id>/` | `show` | Show detail page |
| GET | `/shows/<id>/edit/` | `edit` | Show edit form |
| POST | `/shows/<id>/update/` | `update` | Submit edit |
| POST | `/shows/<id>/destroy/` | `destroy` | Delete a show |

---

## 🧠 How Validations Work (Step-by-Step)

### 1. The Model (`models.py`)
The `Show` model defines the database schema. `description` is set to `blank=True, null=True` so the database itself allows empty values — the form layer handles the conditional logic.

```python
class Show(models.Model):
    title = models.CharField(max_length=255)
    network = models.CharField(max_length=255)
    release_date = models.DateField()
    description = models.TextField(blank=True, null=True)
```

### 2. The Form (`forms.py`)
`ShowForm` extends `ModelForm` and uses `clean_<fieldname>()` methods for field-level validation and `clean()` for cross-field validation (uniqueness check).

**Field-level validation example:**
```python
def clean_release_date(self):
    release_date = self.cleaned_data.get('release_date')
    if release_date >= timezone.now().date():
        raise forms.ValidationError('Release Date must be in the past.')
    return release_date
```

**Cross-field (Sensei Bonus) uniqueness check:**
```python
def clean(self):
    cleaned_data = super().clean()
    title = cleaned_data.get('title')
    if title:
        qs = Show.objects.filter(title__iexact=title)
        if self.instance_pk:          # On edit, exclude the show being edited
            qs = qs.exclude(pk=self.instance_pk)
        if qs.exists():
            self.add_error('title', 'A TV show with this title already exists.')
    return cleaned_data
```

### 3. The Views (`views.py`)
Each mutating view (create, update) checks `form.is_valid()`. If valid, saves and redirects. If invalid, re-renders the form template — Django automatically passes the errors.

```python
def create(request):
    if request.method == 'POST':
        form = ShowForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('tv_shows_index')
        return render(request, 'tv_shows_app/new.html', {'form': form})  # errors shown
```

### 4. The Templates
Both `new.html` and `edit.html` display a summary error block at the top and inline field errors below each input:

```html
{% if form.errors %}
<div class="errors">
    {% for field in form %}
        {% for error in field.errors %}
            <li><strong>{{ field.label }}:</strong> {{ error }}</li>
        {% endfor %}
    {% endfor %}
</div>
{% endif %}
```

---

## 📸 Pages Overview

- **`/shows/`** — Table listing all shows with Show / Edit / Delete links
- **`/shows/new/`** — Form to add a show; displays validation errors on invalid submit
- **`/shows/<id>/`** — Detail view of a single show
- **`/shows/<id>/edit/`** — Pre-filled form to edit; same validations as create

---

## 🛠️ Tech Stack

- **Python 3.x**
- **Django 4.x**
- **SQLite** (default Django database)
- **HTML/CSS** (no external frameworks required)
