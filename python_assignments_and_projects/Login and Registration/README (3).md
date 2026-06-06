# 🔐 Django Login & Registration

A full-stack Django web application featuring user authentication — registration, login, session management, and a protected dashboard.

---

## 📸 Preview

| Registration | Login | Dashboard |
|---|---|---|
| Sign up with validation | Secure login with bcrypt | Protected user workspace |

---

## 🚀 Features

- **User Registration** with server-side validation (name, email, password strength, confirmation match)
- **Secure Login** with bcrypt password hashing
- **Session Management** — user ID stored in session on login, flushed on logout
- **Protected Dashboard** — redirects unauthenticated users away from `/homepage/`
- **Flash Messages** — inline feedback for errors and success states
- **Responsive UI** built with Tailwind CSS

---

## 🛠️ Tech Stack

- **Backend:** Python, Django
- **Database:** SQLite (default Django ORM)
- **Password Hashing:** bcrypt
- **Frontend:** HTML, Tailwind CSS (CDN)
- **Templating:** Django Templates

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
```

### 3. Install dependencies

```bash
pip install django bcrypt
```

### 4. Apply migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Run the development server

```bash
python manage.py runserver
```

Then open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser.

---

## 🗂️ Project Structure

```
project/
├── login_page/
│   ├── models.py        # User model + userManager with validators
│   ├── views.py         # signup, login, create_user, check_user, homepage, logout
│   ├── urls.py          # App URL patterns (namespace: login_page)
│   └── templates/
│       └── htmls/
│           ├── index.html       # Login page
│           ├── sighnup.html     # Registration page
│           └── homepage.html    # Protected dashboard
├── manage.py
└── README.md
```

---

## 🔗 URL Routes

| URL | View | Name |
|---|---|---|
| `/` | Login page | `login_page:login` |
| `/login/` | Login page | `login_page:login` |
| `/check_user/` | Process login | `login_page:check_user` |
| `/signup/` | Registration page | `login_page:signup` |
| `/create_user/` | Process registration | `login_page:create_user` |
| `/homepage/` | Protected dashboard | `login_page:homepage` |
| `/logout/` | Logout & clear session | `login_page:logout` |

---

## ✅ Validation Rules

### Registration
| Field | Rule |
|---|---|
| First Name | Min 3 characters, letters only |
| Last Name | Min 3 characters, letters only |
| Email | Valid format, must be unique |
| Password | Min 8 chars, must include uppercase, lowercase, number, and special character (`@$!%*#?&`) |
| Confirm Password | Must match password |

### Login
- Email must exist in the database
- Password verified against bcrypt hash

---

## 🧠 Assignment Checklist

- [x] Create a new Django project with a login app
- [x] Root route renders login/registration page
- [x] Complete registration method with error handling
- [x] Complete login method with error handling
- [x] Redirect to dashboard on success, displaying user's name
- [x] Logout clears session and redirects to login
- [x] Protected route — unauthenticated users cannot access `/homepage/`

---

## 👤 Author
Chaker Ibrahim


Built as part of the **Python Stack Onsite** course — *Full Stack Django* module.
