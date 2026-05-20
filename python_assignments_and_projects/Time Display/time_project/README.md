# ⏰ Time Display — Django Assignment

A simple Django web application that displays the **current date and time** at the root URL. Built as part of the Python Stack Onsite curriculum.

---

## 📸 Preview

> Visiting `localhost:8000` renders a page showing the current date and time, e.g.:
>
> **Current time and date**
> 2026-05-20 13:02 PM

---

## 🎯 Objectives

- Practice setting up a Django project
- Pass data from a view to a template using context
- Connect to static files (custom stylesheet)

---

## 🗂️ Project Structure

```
time_project/
├── time_display/
│   ├── templates/
│   │   └── index.html        # HTML template rendering the time
│   ├── views.py              # View logic using Python's time module
│   ├── urls.py               # App-level URL routing
│   ├── models.py
│   ├── apps.py
│   └── tests.py
├── time_project/
│   ├── settings.py
│   ├── urls.py               # Project-level URL routing
│   └── wsgi.py
├── db.sqlite3
└── manage.py
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/time-display.git
cd time-display
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### 3. Install Django

```bash
pip install django
```

### 4. Run the development server

```bash
python manage.py runserver
```

### 5. Open in your browser

Navigate to [http://localhost:8000](http://localhost:8000)

---

## 🧠 How It Works

### `views.py`

The `time` view uses Python's built-in `time` module to get the current UTC time via `gmtime()`, then formats it into a readable string with `strftime()`. The formatted string is passed to the template through a context dictionary.

### `urls.py` (app-level)

Maps the root URL `''` to the `time` view function.

### `index.html`

A Django template that uses `{{ time }}` to render the time string passed from the view.

---

## ✅ Assignment Checklist

- [x] Create a new project with a single app
- [x] Have the root route display the current date and time
- [ ] Incorporate a custom stylesheet
- [ ] NINJA BONUS: Come up with a different way to retrieve the data

---

## 📚 Resources

- [Python `strftime` docs](https://docs.python.org/3.3/library/time.html?highlight=time.strftime#time.strftime)
- [Converting strings to datetime — StackOverflow](https://stackoverflow.com/questions/466345/converting-string-into-datetime)
- [Django documentation](https://docs.djangoproject.com/)

---

## 📝 Notes on Time Zones

`gmtime()` returns UTC time. For a production app, it's best practice to store timestamps in UTC in the database and use JavaScript on the client side to convert to the user's local timezone. For the purposes of this assignment, UTC is fine.

---

## 👤 Author

Chaker — [GitHub](https://github.com/ChakerIbrahim)
