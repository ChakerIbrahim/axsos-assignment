# 🥷 Dojos & Ninjas with Template

A Django web application demonstrating a **one-to-many relationship** between Dojos and Ninjas, with full CRUD operations and Django template rendering.

---

## 📸 Preview

A single-page app where you can:
- Add a Dojo (name, city, state)
- Add a Ninja and assign them to a Dojo via dropdown
- View all Dojos with their associated Ninjas and ninja count
- Delete a Dojo (cascades to delete all its Ninjas)

---

## 🚀 Features

- **One-to-Many relationship** — each Ninja belongs to one Dojo; each Dojo can have many Ninjas
- **Create Dojos** with name, city, and state
- **Create Ninjas** with first/last name and a Dojo assignment via dropdown
- **List all Dojos** with nested Ninja lists and counts
- **Delete Dojo** — cascade deletes all associated Ninjas
- **Django Templates** — server-rendered HTML with `{% for %}` loops and `{{ }}` variables

---

## 🛠️ Tech Stack

- **Backend:** Python, Django
- **Database:** SQLite (default Django ORM)
- **Frontend:** HTML (plain), Django Templating Engine

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dojos-and-ninjas.git
cd dojos-and-ninjas
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
```

### 3. Install dependencies

```bash
pip install django
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

Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser.

---

## 🗂️ Project Structure

```
project/
├── dojos_app/
│   ├── models.py        # Dojo and Ninja models (ForeignKey relationship)
│   ├── views.py         # index, create_dojo, create_ninja, delete_dojo
│   ├── urls.py          # URL routing
│   └── templates/
│       └── index.html   # Single-page template with forms and dojo list
├── manage.py
└── README.md
```

---

## 🔗 URL Routes

| URL | View | Description |
|---|---|---|
| `/` | `index` | Render main page with all dojos |
| `/dojos/create` | `create_dojo` | POST — create a new dojo |
| `/ninjas/create` | `create_ninja` | POST — create a new ninja |
| `/dojos/<id>/delete` | `delete_dojo` | POST — delete a dojo and its ninjas |

---

## 🗃️ Models

### `Dojo`
| Field | Type |
|---|---|
| `name` | CharField |
| `city` | CharField |
| `state` | CharField |
| `created_at` | DateTimeField |
| `updated_at` | DateTimeField |

### `Ninja`
| Field | Type |
|---|---|
| `first_name` | CharField |
| `last_name` | CharField |
| `dojo` | ForeignKey → Dojo (`related_name="ninjas"`, CASCADE) |
| `created_at` | DateTimeField |
| `updated_at` | DateTimeField |

---

## ✅ Assignment Checklist

- [x] Add a template to the app
- [x] Route that renders the template and displays all dojos with their associated ninjas
- [x] Route to process the creation of a new dojo
- [x] Route to process the creation of a new ninja; dropdown populated with all existing dojos
- [x] **NINJA BONUS:** Delete button next to each dojo that deletes it and all associated ninjas

---

## 👤 Author

Chaker Ibrahim

Built as part of the **Python Stack Onsite** course — *Django ORM* module.
