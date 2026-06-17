# 🧱 The Wall — Django Assignment

A Facebook-style message board built with Django. Users can register, log in, post messages, and comment on each other's posts. Owners can delete their own messages (within 30 minutes) and their own comments.

---

## 📋 Features

| Feature | Status |
|---|---|
| User registration | ✅ |
| User login / logout | ✅ |
| Post messages to the Wall | ✅ |
| Display all messages (newest first) | ✅ |
| Comment on any message | ✅ |
| Display all comments per message | ✅ |
| Delete own messages | ✅ (Extra Credit I) |
| Delete own messages within 30 min only | ✅ (Extra Credit II) |
| Delete own comments | ✅ |
| Flash messages for all actions | ✅ |

---

## 🗂 Project Structure

```
the_wall_project/
├── manage.py
├── requirements.txt
├── README.md
│
├── the_wall_project/          # Django project config
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── login_app/                 # Handles register / login / logout
│   ├── migrations/
│   ├── templates/login_app/
│   │   ├── login.html
│   │   └── register.html
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py
│   ├── urls.py
│   └── views.py
│
└── wall_app/                  # The Wall feed: messages & comments
    ├── migrations/
    ├── templates/wall_app/
    │   └── wall.html
    ├── __init__.py
    ├── apps.py
    ├── models.py
    ├── urls.py
    └── views.py
```

---

## 🚀 Setup & Run (Step by Step)

### 1. Clone or download the project

```bash
git clone https://github.com/YOUR_USERNAME/the-wall.git
cd the-wall
```

### 2. Create & activate a virtual environment

```bash
# Mac / Linux
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

### 4. Run database migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. (Optional) Create a superuser for the admin panel

```bash
python manage.py createsuperuser
```

### 6. Start the development server

```bash
python manage.py runserver
```

### 7. Open your browser

| URL | Description |
|---|---|
| `http://localhost:8000/` | Redirects to login |
| `http://localhost:8000/login/` | Login page |
| `http://localhost:8000/register/` | Registration page |
| `http://localhost:8000/wall/` | The Wall (requires login) |
| `http://localhost:8000/admin/` | Django admin panel |

---

## 🗄 Database Models (ERD Overview)

```
User (built-in Django)
 │
 ├── Message
 │    ├── id          (PK)
 │    ├── user_id     (FK → User)
 │    ├── content     (TextField)
 │    ├── created_at  (DateTimeField, auto)
 │    └── updated_at  (DateTimeField, auto)
 │
 └── Comment
      ├── id          (PK)
      ├── message_id  (FK → Message)
      ├── user_id     (FK → User)
      ├── content     (TextField)
      └── created_at  (DateTimeField, auto)
```

**Relationships:**
- One `User` → Many `Message`s (one-to-many)
- One `Message` → Many `Comment`s (one-to-many)
- One `User` → Many `Comment`s (one-to-many)

---

## 🔗 URL Routes

### login_app

| Method | URL | View | Description |
|---|---|---|---|
| GET/POST | `/login/` | `login_page` | Login form |
| GET/POST | `/register/` | `register_page` | Register form |
| GET | `/logout/` | `logout_view` | Logs out user |

### wall_app

| Method | URL | View | Description |
|---|---|---|---|
| GET/POST | `/wall/` | `wall` | Main wall page + post message |
| POST | `/wall/comment/<id>/` | `add_comment` | Add comment to message |
| GET | `/wall/delete/message/<id>/` | `delete_message` | Delete own message (≤30 min) |
| GET | `/wall/delete/comment/<id>/` | `delete_comment` | Delete own comment |

---

## 🔐 Authentication Flow

1. User visits `/` → redirected to `/login/`
2. After successful login/register → redirected to `/wall/`
3. All `/wall/` routes are protected with `@login_required`
4. Unauthenticated requests are redirected to `/login/`

---

## ⚠️ Important Notes

- **30-minute delete rule**: Users can only delete their own messages if the message was created within the last 30 minutes (`created_at >= now - 30 min`). This uses `django.utils.timezone` for timezone-aware comparisons.
- **Comment deletion**: Users can delete their own comments at any time (no time restriction).
- **Flash messages**: All actions (post, comment, delete, login, logout) show a flash message via Django's `messages` framework.
- **Jinja2 tip (from the assignment)**: When iterating over related objects in templates, use `message.comments.all` without parentheses: `{% for comment in message.comments.all %}` — NOT `message.comments.all()`.

---

## 🛠 Technologies

- **Python 3.10+**
- **Django 4.2**
- **SQLite** (default, no extra setup needed)
- **HTML / CSS** (no external frameworks)

---

## 📝 License

MIT — free to use for learning purposes.
