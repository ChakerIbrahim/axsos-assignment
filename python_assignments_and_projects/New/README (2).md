# 🥷 Dojos & Ninjas — Django One-to-Many Assignment

A full-stack Django web application that demonstrates a **one-to-many database relationship** between Dojos and Ninjas. Built as part of the Coding Dojo Python Stack curriculum.

---

## 📸 Features

- ✅ Add a Dojo (name, city, state)
- ✅ Add a Ninja and assign them to a Dojo via dropdown
- ✅ View all Dojos with their associated Ninjas
- 🥷 **NINJA BONUS** — Delete a Dojo (and all its Ninjas via CASCADE)
- 🥋 **SENSEI BONUS** — Ninja count displayed next to each Dojo name

---

## 🗂️ Project Structure

```
dojos_ninjas/
├── manage.py
├── requirements.txt
├── dojos_ninjas_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── dojos_app/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py          ← Dojo & Ninja models (ForeignKey relationship)
    ├── views.py           ← All route logic
    ├── urls.py            ← URL patterns
    ├── migrations/
    │   └── 0001_initial.py
    └── templates/
        └── index.html     ← Single template with both forms + dojos list
```

---

## 🚀 Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/dojos-ninjas.git
cd dojos-ninjas
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv

# Mac / Linux
source venv/bin/activate

# Windows
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

### 5. Start the development server

```bash
python manage.py runserver
```

### 6. Open in your browser

```
http://127.0.0.1:8000/
```

---

## 🗃️ Database Models

### Dojo

| Field        | Type         | Notes                  |
|--------------|--------------|------------------------|
| `id`         | AutoField    | Primary key (auto)     |
| `name`       | CharField    | max_length=255         |
| `city`       | CharField    | max_length=255         |
| `state`      | CharField    | max_length=255         |
| `created_at` | DateTimeField| auto_now_add=True      |
| `updated_at` | DateTimeField| auto_now=True          |

### Ninja

| Field        | Type         | Notes                              |
|--------------|--------------|------------------------------------|
| `id`         | AutoField    | Primary key (auto)                 |
| `first_name` | CharField    | max_length=255                     |
| `last_name`  | CharField    | max_length=255                     |
| `dojo`       | ForeignKey   | Links to Dojo; CASCADE on delete   |
| `created_at` | DateTimeField| auto_now_add=True                  |
| `updated_at` | DateTimeField| auto_now=True                      |

The `ForeignKey` on `Ninja.dojo` creates the **one-to-many** relationship:  
> One Dojo → Many Ninjas

---

## 🛣️ URL Routes

| URL                          | View           | Description                              |
|------------------------------|----------------|------------------------------------------|
| `/`                          | `index`        | Main page — both forms + all dojos list  |
| `/dojos/create/`             | `create_dojo`  | POST — creates a new Dojo                |
| `/ninjas/create/`            | `create_ninja` | POST — creates a new Ninja               |
| `/dojos/<id>/delete/`        | `delete_dojo`  | GET — deletes Dojo + its Ninjas (CASCADE)|

---

## 🧠 How It Works — Step by Step

### Step 1 — Project & App Setup
Django separates code into a **project** (global config) and **apps** (feature modules). We created a project called `dojos_ninjas_project` and one app called `dojos_app`, then registered the app in `settings.py` under `INSTALLED_APPS`.

### Step 2 — Define the Models (`models.py`)
Two classes inherit from `django.db.models.Model`:
- `Dojo` — stores name, city, state
- `Ninja` — stores first_name, last_name, and a **ForeignKey** to Dojo

The ForeignKey line is the core of the one-to-many relationship:
```python
dojo = models.ForeignKey(Dojo, related_name='ninjas', on_delete=models.CASCADE)
```
- `related_name='ninjas'` lets us call `dojo.ninjas.all()` from a Dojo instance
- `on_delete=models.CASCADE` means deleting a Dojo automatically deletes all its Ninjas

### Step 3 — Migrations
Running `makemigrations` + `migrate` translates the Python model classes into actual SQL database tables.

### Step 4 — Views (`views.py`)
Four view functions handle all the logic:
- `index` — queries all Dojos, passes them to the template
- `create_dojo` — reads POST data and calls `Dojo.objects.create()`
- `create_ninja` — reads POST data, fetches the selected Dojo by ID, calls `Ninja.objects.create()`
- `delete_dojo` — fetches the Dojo by ID and calls `.delete()` (CASCADE handles the Ninjas)

### Step 5 — URL Routing (`urls.py`)
The app-level `urls.py` maps URL patterns to view functions. The project-level `urls.py` includes the app URLs with `include('dojos_app.urls')`.

### Step 6 — The Template (`index.html`)
A single Django template handles everything:
- **Add a Dojo form** — POSTs to `/dojos/create/`
- **Add a Ninja form** — POSTs to `/ninjas/create/`; dropdown uses `{% for dojo in all_dojos %}` to list every Dojo from the database
- **All the Dojos list** — loops through each Dojo, then uses `dojo.ninjas.all` to display that Dojo's Ninjas (this works because of `related_name='ninjas'` on the ForeignKey)
- **SENSEI BONUS** — `{{ dojo.ninjas.count }}` displays the ninja count
- **NINJA BONUS** — a Delete link points to `/dojos/<id>/delete/`

The `{% csrf_token %}` tag inside every form is required by Django to protect against Cross-Site Request Forgery attacks.

---

## ✅ Assignment Checklist

- [x] Add a template to the app
- [x] Route that renders the template and displays all dojos with their associated ninjas
- [x] Route to process the creation of a new dojo
- [x] Route to process the creation of a new ninja; dropdown is a list of all existing dojos
- [x] **NINJA BONUS** — Delete button next to each dojo that deletes the dojo (and associated ninjas)
- [x] **SENSEI BONUS** — Count of ninjas next to each dojo name

---

## 🛠️ Technologies Used

- Python 3.x
- Django 4.x
- SQLite (default Django database)
- HTML / CSS (vanilla, no frameworks)
