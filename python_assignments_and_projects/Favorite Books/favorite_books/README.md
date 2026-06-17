# 📚 Favorite Books — Django Assignment

A full-stack Django web app where users can upload books, browse all books, and manage their personal favorites list. Demonstrates both **one-to-many** and **many-to-many** database relationships.

---

## ✅ Features Checklist

| Requirement | Status |
|---|---|
| User & Book models with correct relationships | ✅ |
| Validated login / registration page | ✅ |
| Add a new book with validations (auto-favorited by uploader) | ✅ |
| List all books showing title + uploader | ✅ |
| Click title → book detail page with all fans listed | ✅ |
| Un-favorite a book if already favorited | ✅ |
| Add to favorites if not yet favorited | ✅ |
| Edit / delete book (uploader only, with validations) | ✅ |
| **NINJA BONUS**: Show "Add to Favorites" or "Already Favorited" on main page | ✅ |
| **SENSEI BONUS**: User page showing all their favorited books | ✅ |

---

## 🗄 Database Design (ERD)

```
User (Django built-in)
 │
 ├── Book  [one-to-many via uploaded_by FK]
 │    ├── id           (PK)
 │    ├── title        (CharField)
 │    ├── uploaded_by  (FK → User,  related_name='books_uploaded')
 │    ├── users_who_like (ManyToManyField → User, related_name='liked_books')
 │    ├── created_at
 │    └── updated_at
 │
 └── [Likes join table — auto-created by Django for ManyToManyField]
      ├── book_id (FK → Book)
      └── user_id (FK → User)
```

### Two Relationships Explained

| Relationship | Type | How Stored |
|---|---|---|
| User uploads Books | **One-to-many** | `uploaded_by` FK column on `Book` table |
| Users ↔ Books (likes) | **Many-to-many** | Separate `likes` join table (auto-created) |

### ORM Usage Examples

```python
# Get the user who uploaded a book
Book.objects.first().uploaded_by

# Get all books uploaded by a user
user.books_uploaded.all()

# Get all users who liked a book
Book.objects.first().users_who_like.all()

# Get all books a user has liked
user.liked_books.all()
```

---

## 🗂 Project Structure

```
favorite_books/
├── manage.py
├── requirements.txt
├── README.md
│
├── favorite_books_project/     # Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── login_app/                  # Register / Login / Logout
│   ├── migrations/
│   ├── templates/login_app/
│   │   ├── login.html
│   │   └── register.html
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
└── books_app/                  # Core book functionality
    ├── migrations/
    ├── templates/books_app/
    │   ├── index.html          # Main page (list + add)
    │   ├── detail.html         # Single book + fans list
    │   ├── edit.html           # Edit book title
    │   └── favorites.html      # My favorites (Sensei Bonus)
    ├── models.py
    ├── views.py
    └── urls.py
```

---

## 🚀 Setup & Run

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/favorite-books.git
cd favorite-books
```

### 2. Create & activate virtual environment

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
| `http://localhost:8000/login/` | Login |
| `http://localhost:8000/register/` | Register |
| `http://localhost:8000/books/` | All Books (main page) |
| `http://localhost:8000/books/<id>/` | Book detail |
| `http://localhost:8000/books/my-favorites/` | My Favorites |
| `http://localhost:8000/admin/` | Django admin |

---

## 🔗 URL Routes

### login_app

| URL | View | Description |
|---|---|---|
| `/login/` | `login_page` | Login form |
| `/register/` | `register_page` | Registration form |
| `/logout/` | `logout_view` | Log out |

### books_app

| URL | View | Description |
|---|---|---|
| `/books/` | `index` | List all books + add form |
| `/books/<id>/` | `book_detail` | Book info + fans |
| `/books/<id>/favorite/` | `favorite_book` | Add to favorites |
| `/books/<id>/unfavorite/` | `unfavorite_book` | Remove from favorites |
| `/books/<id>/edit/` | `edit_book` | Edit title (uploader only) |
| `/books/<id>/delete/` | `delete_book` | Delete book (uploader only) |
| `/books/my-favorites/` | `my_favorites` | Current user's favorites |

---

## 🔐 Validation Rules

- Book title cannot be empty
- Duplicate book titles are rejected
- Only the uploader can edit or delete a book
- Only the uploader can delete their book
- Passwords must be at least 6 characters
- Passwords must match on registration
- All `/books/` routes require login (`@login_required`)

---

## 🛠 Tech Stack

- **Python 3.10+**
- **Django 4.2**
- **SQLite** (no extra setup)
- **HTML / CSS** (no external frameworks)
