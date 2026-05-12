# 🌐 Flask Routing Assignment — Understanding Routing

A Flask server built as part of the **Python Stack Onsite** curriculum on Axsos Academy. This assignment covers the fundamentals of URL routing in Flask, including static routes, dynamic routes, and URL converters.

---

## 📋 Objectives

- Practice building a server with Flask from scratch
- Get comfortable with routes and passing information to routes

---

## 🚀 Routes

| URL Pattern | Response |
|---|---|
| `localhost:5000/` | `Hello World!` |
| `localhost:5000/Champion` | `Champion!` |
| `localhost:5000/say/<name>` | `Hi <name>!` (e.g. `Hi Flask!`, `Hi Michael!`) |
| `localhost:5000/repeat/<int:num>/<word>` | Repeats `<word>` `<num>` times (e.g. `hello` × 35) |

### Examples

```
localhost:5000/repeat/35/hello  →  "hello" repeated 35 times
localhost:5000/repeat/80/bye    →  "bye" repeated 80 times
localhost:5000/repeat/99/dogs   →  "dogs" repeated 99 times
```

> ⭐ **Ninja Bonus:** The `<int:num>` URL converter ensures the repeat count is always an integer.

---

## 🗂️ Project Structure

```
understanding-routing/
└── server2.py
```

---

## 🛠️ Setup & Run

### Prerequisites

- Python 3.x
- Flask

### Install Flask

```bash
pip install flask
```

### Run the Server

```bash
python server2.py
```

The server will start in debug mode at `http://localhost:5000`.

---

## 💻 Code

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def first():
    return "Hello World"

@app.route("/Champion")
def second():
    return "Champion"

@app.route("/say/<name>")
def forth(name):
    return f"Hi {name}"

@app.route("/repeat/<int:num>/<word>")
def seventh(word, num):
    return f"{word}" * num

if __name__ == "__main__":
    app.run(debug=True)
```

---

## 📚 Concepts Covered

- Creating a Flask app instance
- Defining static routes (`/`, `/Champion`)
- Using dynamic route parameters (`<name>`)
- Using URL converters (`<int:num>`) to enforce data types
- Running Flask in debug mode

---

*Part of the Python Stack Onsite curriculum — Flask Fundamentals module.*
