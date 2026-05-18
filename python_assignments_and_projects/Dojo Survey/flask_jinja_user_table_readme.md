# Flask User Table Project (README.md)

## Overview

This project is a simple **Flask web application** that:

- Creates a Python virtual environment
- Installs Flask
- Runs a local web server
- Passes Python data (`users` list) into an HTML template
- Uses **Jinja2 templating** to dynamically display users in a styled Tailwind CSS table
- Applies alternating row colors for modern UI design

---

# 1. Create Project Folder

```bash
mkdir flask
cd flask
```

---

# 2. Create Python Virtual Environment

## Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

## Mac/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

# 3. Install Flask

```bash
pip install flask
```

---

# 4. Project Structure

```bash
flask/
│__htabel
├── server.py
├── templates/
│   └── index.html
│   └── tailwind.config.js
└── README.md
```

---

# 5. Create `app.py`

```python
from flask import Flask, render_template

app = Flask(__name__)

users = [
    {'first_name': 'Michael', 'last_name': 'Choi'},
    {'first_name': 'John', 'last_name': 'Supsupin'},
    {'first_name': 'Mark', 'last_name': 'Guillen'},
    {'first_name': 'KB', 'last_name': 'Tonel'}
]

@app.route('/')
def user():
    return render_template("index.html", users=users)

if __name__ == "__main__":
    app.run(debug=True)
```

---

# 6. Run Flask Application

```bash
python htable/server.py
```

Open browser:

```bash
http://127.0.0.1:5000/
```

---

# 7. Create `templates/index.html`

## Tailwind CDN Setup

Inside `<head>`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

---

# 8. Jinja2 Dynamic Table Code

```html
<tbody class="divide-y divide-orange-100">
    {% for i in range(users|length) %}

    {% if i % 2 == 0 %}
    <tr class="hover:bg-orange-50 transition-all duration-300">
    {% else %}
    <tr class="bg-gray-50 hover:bg-orange-50 transition-all duration-300">
    {% endif %}

        <td class="px-8 py-5 text-gray-800 font-medium text-lg">
            {{ users[i]['first_name'] }}
        </td>

        <td class="px-8 py-5 text-gray-600 text-lg">
            {{ users[i]['last_name'] }}
        </td>
    </tr>

    {% endfor %}
</tbody>
```

---

# 9. Jinja Concepts Used

## Loop Through Data

```jinja
{% for i in range(users|length) %}
```

### Purpose:

Iterates through every user in the Python list.

---

## Access Python Dictionary Values

```jinja
{{ users[i]['first_name'] }}
{{ users[i]['last_name'] }}
```

### Purpose:

Displays user data dynamically.

---

## Conditional Row Styling

```jinja
{% if i % 2 == 0 %}
```

### Purpose:

Creates zebra-striping effect for alternating rows.

---

# 10. Common Errors Fixed

## Error:

```python
TypeError: user() missing 1 required positional argument: 'users'
```

### Cause:

Flask route functions should not take custom arguments.

### Fix:

```python
def user():
```

---

## Error:

```python
jinja2.exceptions.UndefinedError: 'len' is undefined
```

### Cause:

Jinja does not support Python's `len()` directly.

### Fix:

```jinja
users|length
```

---

# 11. Features Included

- Flask backend
- Python virtual environment
- Jinja2 template engine
- Tailwind CSS modern styling
- Responsive design
- Dynamic user rendering
- Alternating table row colors
- Hover animations

---

# 12. Future Improvements

You can expand this project by adding:

- SQL database integration
- User registration forms
- Search functionality
- Pagination
- Edit/Delete users
- Authentication system
- Dashboard UI

---

# 13. Install Requirements Later

```bash
pip freeze > requirements.txt
```

Install on another machine:

```bash
pip install -r requirements.txt
```

---

# 14. Summary

This project demonstrates:

## Backend:

- Flask routing
- Python data structures
- Template rendering

## Frontend:

- Tailwind CSS
- Responsive layout
- Jinja loops
- Dynamic HTML generation

---

# ![Screenshot 2026-05-13 222114](C:\Users\HP\OneDrive\Pictures\Screenshots%201\Screenshot%202026-05-13%20222114.png)
