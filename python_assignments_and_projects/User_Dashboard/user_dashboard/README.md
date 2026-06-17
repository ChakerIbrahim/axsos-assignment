# 👥 User Dashboard — Django Assignment

A full-stack Django web app implementing a complete user management system with registration, login (bcrypt-secured), and full CRUD operations on users — all without using Django's built-in auth system.

---

## ✅ Features

| Feature | Status |
|---|---|
| Custom User model (not Django's built-in) | ✅ |
| Registration with validation | ✅ |
| Login with bcrypt password checking | ✅ |
| Session-based authentication | ✅ |
| Dashboard listing all users in a table | ✅ |
| View individual user profile | ✅ |
| Create new user (from dashboard) | ✅ |
| Edit user info with validations | ✅ |
| Delete user | ✅ |
| Flash messages on all actions | ✅ |
| "You" badge for the logged-in user | ✅ |
| Auto-logout when deleting own account | ✅ |

---

## 🗂 Project Structure

```
user_dashboard/
├── manage.py
├── requirements.txt
├── README.md
│
├── user_dashboard_project/       # Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── users_app/                    # Core app
    ├── migrations/
    ├── templates/users_app/
    │   ├── base.html             # Shared nav + layout
    │   ├── register.html         # Register page
    │   ├── login.html            # Login page
    │   ├── index.html            # Dashboard (all users table)
    │   ├── detail.html           # Single user profile
    │   ├── new.html              # Create new user form
    │   └── edit.html             # Edit user form
    ├── models.py                 # User model + UserManager
    ├── views.py                  # All view logic
    └── urls.py                   # URL routing
```

---

## 🗄 Custom User Model

```python
class User(models.Model):
    first_name  = CharField(max_length=255)
    last_name   = CharField(max_length=255)
    email       = EmailField(unique=True)
    password    = CharField(max_length=255)   # bcrypt hash — NEVER plain text
    created_at  = DateTimeField(auto_now_add=True)
    updated_at  = DateTimeField(auto_now=True)
```

**Why a custom model?** This assignment intentionally avoids Django's built-in `AbstractUser` so you practice building auth from scratch using sessions and bcrypt.

---

## 🔐 Auth & Security

- Passwords are hashed with **bcrypt** before storing — never stored in plain text
- Login checks the entered password against the stored hash using `bcrypt.checkpw()`
- Sessions store only the user's ID (`request.session['user_id']`)
- All `/users/*` routes are protected by a `login_required_custom` guard
- Deleting your own account automatically flushes your session

---

## 🔗 URL Routes

| URL | View | Description |
|---|---|---|
| `/` | `index_root` | Redirect to login or dashboard |
| `/register/` | `register_page` | GET: form, POST: create account |
| `/login/` | `login_page` | GET: form, POST: authenticate |
| `/logout/` | `logout_view` | Flush session, redirect to login |
| `/users/` | `users_index` | Dashboard — all users table |
| `/users/new/` | `new_user` | GET: form, POST: create user |
| `/users/<id>/` | `user_detail` | View user profile |
| `/users/<id>/edit/` | `edit_user` | GET: form, POST: update user |
| `/users/<id>/delete/` | `delete_user` | Delete user, redirect |

---

## ✔️ Validation Rules

### Register / New User
- First name ≥ 2 characters
- Last name ≥ 2 characters
- Valid email format (contains `@` and `.`)
- Email not already registered
- Password ≥ 8 characters
- Password and confirm password must match

### Edit User
- First name ≥ 2 characters
- Last name ≥ 2 characters
- Valid email format
- Email not used by a **different** user (own email is OK)

---

## 🚀 Setup & Run

### 1. Clone / unzip and enter the folder
```bash
cd user_dashboard
```

### 2. Create and activate virtual environment
```bash
# Mac/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Start the server
```bash
python manage.py runserver
```

### 6. Open in browser

| URL | Page |
|---|---|
| `http://localhost:8000/` | → redirects to login |
| `http://localhost:8000/register/` | Create your first account |
| `http://localhost:8000/login/` | Login page |
| `http://localhost:8000/users/` | Dashboard (all users) |

---

## 🛠 Tech Stack

- **Python 3.10+**
- **Django 4.2**
- **bcrypt 4.x** — password hashing
- **SQLite** — database (no extra setup)
- **HTML / CSS** — no external CSS frameworks
