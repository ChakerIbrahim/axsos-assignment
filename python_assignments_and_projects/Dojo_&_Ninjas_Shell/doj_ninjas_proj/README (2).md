# 🥷 Dojo & Ninjas — Django ORM Shell Assignment

A Django project demonstrating **One-to-Many relationships** using the Django ORM shell. Built as part of the Python Stack course on Axsos Academy.

---

## 📌 Overview

This project creates two related models — `Dojo` and `Ninja` — and uses the **Django shell** to practice ORM queries, including creating, retrieving, and navigating related objects.

---

## 🗂️ Project Structure

```
dojo_ninjas_proj/
├── dojo_ninjas_app/
│   ├── models.py          # Dojo and Ninja models
│   ├── migrations/        # Auto-generated migration files
│   └── ...
├── manage.py
└── ...
```

---

## 🧱 Models

### Dojo
| Field  | Type           |
|--------|----------------|
| id     | INT (auto)     |
| name   | VARCHAR(255)   |
| city   | VARCHAR(255)   |
| state  | VARCHAR(2)     |

### Ninja
| Field      | Type           |
|------------|----------------|
| id         | INT (auto)     |
| dojo_id    | FK → Dojo      |
| first_name | VARCHAR(255)   |
| last_name  | VARCHAR(255)   |

> A **Dojo** has many **Ninjas**. Each **Ninja** belongs to one **Dojo**.

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd dojo_ninjas_proj

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate       # Mac/Linux
venv\Scripts\activate          # Windows

# 3. Install dependencies
pip install django

# 4. Run migrations
python manage.py makemigrations
python manage.py migrate

# 5. Open the Django shell
python manage.py shell
```

---

## 🐚 Shell Queries

Once inside the shell, import your models:

```python
from dojo_ninjas_app.models import Dojo, Ninja
```

### Create Dojos
```python
Dojo.objects.create(name="Shadow Dojo", city="Austin", state="TX")
Dojo.objects.create(name="Steel Dojo", city="Seattle", state="WA")
Dojo.objects.create(name="Fire Dojo", city="Phoenix", state="AZ")
```

### Create Ninjas
```python
d1 = Dojo.objects.get(id=1)
Ninja.objects.create(dojo=d1, first_name="John", last_name="Doe")
Ninja.objects.create(dojo=d1, first_name="Jane", last_name="Smith")
```

### Retrieve All Ninjas in a Dojo
```python
dojo = Dojo.objects.get(id=1)
dojo.ninja_set.all()
```

### Retrieve the Dojo a Ninja Belongs To
```python
ninja = Ninja.objects.get(id=1)
ninja.dojo
```

---

## 🐛 Common Error & Fix

**Error encountered during migration:**
```
django.db.utils.IntegrityError: NOT NULL constraint failed: new__dojo_ninjas_app_dojo.desc
```

**Fix:** When adding a new field to an existing model, always provide a default value or allow null:
```python
desc = models.CharField(max_length=255, default='')
# or
desc = models.CharField(max_length=255, null=True, blank=True)
```

---

## 📚 Concepts Practiced

- Defining Django models with relationships
- Running and applying migrations
- Using the Django ORM shell
- One-to-Many relationships (`ForeignKey`)
- Forward and reverse lookups

---

## 🛠️ Built With

- Python 3.x
- Django
- SQLite (default DB)

---

## 👤 Author

**Chaker Ibrahim**  
Axsos Academy — Python Stack  
