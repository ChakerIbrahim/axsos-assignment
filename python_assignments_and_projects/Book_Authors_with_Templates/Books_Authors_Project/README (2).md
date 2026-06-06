# Books & Authors Manager

A Django web application that manages books and authors with a many-to-many relationship. Built as part of the Python Stack onsite assignment.

---

## Features

- Add and view books
- Add and view authors
- Associate authors with books and books with authors
- Dropdown menus only show unassociated items (bonus)

---

## Models

### Book
| Field | Type |
|-------|------|
| title | CharField |
| description | TextField |
| authors | ManyToManyField → Author |
| created_at | DateTimeField |
| updated_at | DateTimeField |

### Author
| Field | Type |
|-------|------|
| firstname | CharField |
| lastname | CharField |
| notes | TextField |

---

## URLs

| URL | View | Description |
|-----|------|-------------|
| `/addbook/` | addbook | Add a new book + view all books |
| `/allbooks/` | allbooks | View all books |
| `/viewbook/<id>/` | showbook | View a specific book and its authors |
| `/addauthortobook/<id>/` | addauthor | Add an author to a book |
| `/addauthor/` | addauthor_form | Add a new author + view all authors |
| `/allauthors/` | allauthors | View all authors |
| `/viewauthor/<id>/` | showauthor | View a specific author and their books |
| `/addbooktoauthor/<id>/` | addbooktoauthor | Add a book to an author |

---

## Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Install dependencies
```bash
pip install django
```

### 3. Apply migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Run the server
```bash
python manage.py runserver
```

### 5. Open in browser
```
http://127.0.0.1:8000/addbook/
```

---

## Templates

| Template | Description |
|----------|-------------|
| `addbook.html` | Form to add a book + table of all books |
| `allbooks.html` | Table of all books |
| `viewbooks.html` | Book detail page with authors and add author form |
| `addauthor.html` | Form to add an author + table of all authors |
| `allauthors.html` | Table of all authors |
| `viewauthors.html` | Author detail page with books and add book form |

---

## How It Works

1. Create books at `/addbook/`
2. Create authors at `/addauthor/`
3. Open a book and use the dropdown to assign authors to it
4. Open an author and use the dropdown to assign books to them
5. The dropdowns only show items **not yet associated** with the current book or author
