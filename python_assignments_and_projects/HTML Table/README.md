# HTML Table — Flask Assignment

A Flask web application that renders a list of user dictionaries as a styled HTML table using the Jinja2 template engine.

---

## 📋 Assignment Objectives

- Pass data from a Flask route to a Jinja2 template
- Iterate over a list of dictionaries inside a template to generate dynamic HTML
- Style the output with Bootstrap 5

---

## 🗂️ Project Structure

```
html_table_project/
├── app.py               # Flask application & route
└── templates/
    └── index.html       # Jinja2 template with Bootstrap table
```

---

## ⚙️ Setup & Run

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/html-table-flask.git
cd html-table-flask
```

### 2. Create & activate a virtual environment

```bash
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install flask
```

### 4. Run the app

```bash
python app.py
```

Open your browser at **http://127.0.0.1:5000**

---

## 🔍 How It Works

### `app.py` — Route & Data

```python
@app.route('/')
def index():
    users = [
        {'first_name': 'Michael', 'last_name': 'Choi'},
        {'first_name': 'John',    'last_name': 'Supsupin'},
        {'first_name': 'Mark',    'last_name': 'Guillen'},
        {'first_name': 'KB',      'last_name': 'Tonel'}
    ]
    return render_template('index.html', users=users)
```

The route declares the `users` list and passes it to the template via `render_template`.

### `templates/index.html` — Jinja2 Loop

```html
{% for user in users %}
<tr>
  <td>{{ user['first_name'] }}</td>
  <td>{{ user['last_name'] }}</td>
  <td>{{ user['first_name'] }} {{ user['last_name'] }}</td>
</tr>
{% endfor %}
```

Jinja2 iterates over every dictionary in `users` and outputs one table row per record.

---

## 🎨 Styling

Uses **Bootstrap 5** (CDN) for responsive layout and custom CSS variables for a dark-theme design.

| Column | Source |
|--------|--------|
| First Name | `user['first_name']` |
| Last Name | `user['last_name']` |
| Full Name | Both keys concatenated in the template |

---

## ✅ Checklist

- [x] Start a new Flask project
- [x] Create a route that declares the data and passes it to the template engine
- [x] Create a template that displays the data in a table
- [x] **NINJA BONUS** — Use Bootstrap 5 to format the table

---

## 🛠️ Tech Stack

- **Python 3** — language
- **Flask** — micro web framework
- **Jinja2** — templating engine (bundled with Flask)
- **Bootstrap 5** — CSS framework (via CDN)
