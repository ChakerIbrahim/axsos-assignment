# Assignment: Users (Shell)

## Overview

A Django ORM practice assignment from the **Python Stack Onsite** course on Axsos Academy. The goal is to use the Django Shell to run ORM commands and manipulate a database through a `Users` model.

---

## Project Setup

- **Project name:** `single_model_orm`
- **App name:** `users_app`

---

## Database Schema (ERD)

| Column        | Type          |
|---------------|---------------|
| id            | INT (PK)      |
| first_name    | VARCHAR(255)  |
| last_name     | VARCHAR(255)  |
| email_address | VARCHAR(255)  |
| age           | INT           |
| created_at    | DATETIME      |
| updated_at    | DATETIME      |

---

## Setup Instructions

1. Create the Django project and app:
   ```bash
   django-admin startproject single_model_orm
   cd single_model_orm
   python manage.py startapp users_app
   ```

2. Register `users_app` in `INSTALLED_APPS` inside `settings.py`.

3. Define the `Users` model in `users_app/models.py` following the ERD above.

4. Create and run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Open the Django shell:
   ```bash
   python manage.py shell
   ```

---

## Shell Queries

### Import the model
```python
from users_app.models import *
```

### Create 3 new users
```python
Users.objects.create(first_name="Chaker", last_name="Ibrahim", email_address="chaker703@hotmail.com", age=29)
Users.objects.create(first_name="Ramez", last_name="Atallah", email_address="ramez@gamil.ps", age=25)
Users.objects.create(first_name="Jalil", last_name="Wasaya", email_address="jalil23@gamil.com", age=30)
```

### Retrieve all users
```python
user1 = Users.objects.all()
```

### Retrieve the last user
```python
last_user = Users.objects.last()
```

### Retrieve the first user
```python
first_user = Users.objects.first()
```

### Update user with id=3 (change last name to "Pancakes")
```python
user3 = Users.objects.get(id=3)
user3.last_name = "Pancakes"
user3.save()
```

### Delete user with id=2
```python
user2 = Users.objects.get(id=2)
user2.delete()
```

### Get all users sorted by first name (ascending)
```python
sorted_users = Users.objects.all().order_by("first_name")
```

### BONUS: Get all users sorted by first name (descending)
```python
sorted_users = Users.objects.all().order_by("-first_name")
```

---

## Checklist

- [x] Create a model called `Users` following the ERD
- [x] Create and run migration files
- [x] Create a `.txt` file to save shell queries
- [x] Run the shell and import the `Users` model
- [x] Query: Create 3 new users
- [x] Query: Retrieve all users
- [x] Query: Retrieve the last user
- [x] Query: Retrieve the first user
- [x] Query: Change the user with id=3 so their last name is "Pancakes"
- [x] Query: Delete the user with id=2
- [x] Query: Get all users sorted by first name
- [x] BONUS: Get all users sorted by first name in descending order
- [x] Submit the `.txt` file containing all shell queries

---

## Technologies Used

- Python
- Django
- Django ORM
- SQLite (default Django database)
