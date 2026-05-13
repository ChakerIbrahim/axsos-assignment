# Flask Playground 🎨

A Flask web application that renders dynamic HTML templates with colored boxes, built as part of the Python Stack Onsite bootcamp.

## Overview

This project demonstrates passing data from Flask routes to Jinja2 templates, using template loops and conditionals to render styled content dynamically.

## Features

- **Level 1** – `/play` renders 3 beautiful blue boxes using a template
- **Level 2** – `/play/<x>` renders `x` blue boxes (e.g. `/play/7` shows 7 boxes)
- **Level 3** – `/play/<x>/<color>` renders `x` boxes in any specified color (e.g. `/play/5/green`)

## Project Structure

```
Playground/
├── server.py
└── templates/
    └── index.html
```

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Playground
   ```

2. **Install Flask**
   ```bash
   pip install flask
   ```

3. **Run the server**
   ```bash
   python server.py
   ```

4. **Visit in your browser**
   ```
   http://localhost:5000/play
   ```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/play` | Displays 3 blue boxes |
| `/play/<x>` | Displays `x` blue boxes |
| `/play/<x>/<color>` | Displays `x` boxes in the given color |

## How It Works

**`server.py`** defines the routes and passes variables (`x`, `color`) to the template:

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/play")
def play():
    return render_template("index.html", x=3, color='blue')

@app.route("/play/<xx>")
def playnum(x):
    return render_template("index.html", int(x), color='blue')

@app.route("/play/<xx>/<color>")
def play_color(x, color):
    return render_template("index.html", x=int(x), color=color)

if __name__ == "__main__":
    app.run(debug=True)
```

**`templates/index.html`** uses Jinja2 to loop and render the boxes:

```html
<h1>Welcome!</h1>
<div class="container">
  {% for i in range(x) %}
    <div class="box"></div>
  {% endfor %}
</div>
```

## Technologies

- Python 3
- Flask
- Jinja2 (HTML templating)
- HTML / CSS (internal stylesheet)
