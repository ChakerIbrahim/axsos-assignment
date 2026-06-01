# Django Counter App 🔢

A Django web application that tracks how many times the root route (`/`) has been visited using Django's session framework.

---

## 📋 Assignment Objectives

- Practice using the **session** to store data about a client's history with the app
- Check whether a session key exists
- Initialize a session
- Modify a session

---

## ✨ Features

| Feature | Route | Description |
|---|---|---|
| View counter | `/` | Displays how many times you've visited |
| Reset counter | `/destroy_session` | Clears the session and redirects to `/` |
| +2 Button | `/increment_by_two` | Increments counter by 2 (Ninja Bonus) |
| Custom increment | `/custom_increment` | POST: add any number N (Sensei Bonus) |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/django-counter.git
cd django-counter

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install Django
pip install django

# 4. Run database migrations (needed for session storage)
python manage.py migrate

# 5. Start the development server
python manage.py runserver
```

### Visit the App

Open your browser and go to:
- **`http://localhost:8000/`** — View and increment the counter
- **`http://localhost:8000/destroy_session`** — Reset the counter

---

## 📁 Project Structure

```
counter_project/
│
├── manage.py                  # Django management script
│
├── counter/                   # Project configuration
│   ├── __init__.py
│   ├── settings.py            # Django settings (sessions enabled here)
│   ├── urls.py                # Root URL configuration
│   └── wsgi.py
│
└── counter_app/               # The counter application
    ├── __init__.py
    ├── views.py               # All view logic (session handling)
    ├── urls.py                # App URL patterns
    └── templates/
        └── counter_app/
            └── index.html     # Main template
```

---

## 🧠 How It Works — Session Deep Dive

### What is a Session?

A **session** lets the server remember information about a specific user/browser across multiple requests. Without it, every page visit would be anonymous and stateless.

Django stores sessions in the database (by default) and sends the browser a **session cookie** (`sessionid`) to identify returning visitors.

### Checking if a Session Key Exists

```python
if 'counter' not in request.session:
    request.session['counter'] = 0  # Initialize it
```

You MUST check before incrementing — you can't add 1 to something that doesn't exist yet.

### Incrementing the Session Value

```python
request.session['counter'] += 1
```

### Clearing the Session

```python
request.session.flush()  # Deletes session data AND the cookie
```

`flush()` is used instead of `del` because it also removes the session from the database and resets the session cookie.

---

## 📄 Views Explained

### `index` view — `/`

```python
def index(request):
    if 'counter' not in request.session:
        request.session['counter'] = 0  # First visit: initialize

    if 'visits' not in request.session:
        request.session['visits'] = 0

    request.session['counter'] += 1    # Increment on every visit
    request.session['visits'] += 1

    context = {
        'counter': request.session['counter'],
        'visits': request.session['visits'],
    }
    return render(request, 'counter_app/index.html', context)
```

**Step by step:**
1. Check if `'counter'` key exists in the session
2. If not → create it and set to `0`
3. Increment it by 1
4. Pass the value to the template via `context`

---

### `destroy_session` view — `/destroy_session`

```python
def destroy_session(request):
    request.session.flush()   # Wipe everything
    return redirect('index')  # Send user back to /
```

This clears ALL session data and redirects back to the homepage (which re-initializes the counter to 0).

---

### `increment_by_two` view — `/increment_by_two` *(Ninja Bonus)*

```python
def increment_by_two(request):
    if 'counter' not in request.session:
        request.session['counter'] = 0
    request.session['counter'] += 2
    return redirect('index')
```

Same pattern — check, then add 2 instead of 1.

---

### `custom_increment` view — `/custom_increment` *(Sensei Bonus)*

```python
def custom_increment(request):
    if request.method == 'POST':
        try:
            amount = int(request.POST.get('amount', 1))
            if 'counter' not in request.session:
                request.session['counter'] = 0
            request.session['counter'] += amount
        except ValueError:
            pass  # Ignore invalid (non-integer) input
    return redirect('index')
```

Reads a number from a submitted HTML form and adds it to the counter.

---

## 🔗 URL Patterns

**`counter/urls.py`** (project level):
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('counter_app.urls')),  # Delegate to app
]
```

**`counter_app/urls.py`** (app level):
```python
urlpatterns = [
    path('', views.index, name='index'),
    path('destroy_session', views.destroy_session, name='destroy_session'),
    path('increment_by_two', views.increment_by_two, name='increment_by_two'),
    path('custom_increment', views.custom_increment, name='custom_increment'),
]
```

---

## 🎯 Assignment Checklist

- [x] Create a new Django project called `counter`
- [x] Root route (`/`) renders a template showing visit count
- [x] Counter increments and persists across page refreshes
- [x] `/destroy_session` clears the session and redirects to `/`
- [x] **Ninja Bonus**: Reset button using `/destroy_session`
- [x] **Ninja Bonus**: `+2` button with `/increment_by_two` route
- [x] **Sensei Bonus**: Form to increment by custom amount N
- [x] **Sensei Bonus**: Displays both visit count and counter value

---

## 💡 Key Concepts Summary

| Concept | Code |
|---|---|
| Check key exists | `if 'key' not in request.session:` |
| Initialize | `request.session['key'] = 0` |
| Read | `value = request.session['key']` |
| Modify | `request.session['key'] += 1` |
| Delete one key | `del request.session['key']` |
| Clear everything | `request.session.flush()` |

---

## 🛠 Built With

- [Django](https://www.djangoproject.com/) — Python web framework
- Django Sessions Framework — Built-in session middleware
- SQLite — Default database for session storage
