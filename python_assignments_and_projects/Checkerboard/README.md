# Checkerboard - Flask Assignment

A Flask web application that renders dynamic checkerboards based on URL parameters.

---

## Features

- Renders an 8×8 checkerboard by default
- Supports custom rows and columns via URL parameters
- Supports custom colors via URL parameters (SENSEI BONUS)
- CSS served from a separate static stylesheet linked to the Jinja2 template
- Uses Jinja2 `for` loops to generate the board dynamically

---

## Project Structure

```
checkerboard/
├── app.py                   # Flask application and routes
├── static/
│   └── style.css            # Checkerboard styles
└── templates/
    └── checkerboard.html    # Jinja2 template
```

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/checkerboard.git
   cd checkerboard
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate        # Mac/Linux
   venv\Scripts\activate           # Windows
   ```

3. **Install Flask**
   ```bash
   pip install flask
   ```

4. **Run the app**
   ```bash
   python app.py
   ```

5. Open your browser at `http://localhost:5000`

---

## URL Routes

| URL | Description |
|-----|-------------|
| `http://localhost:5000/` | Default 8×8 red/black checkerboard |
| `http://localhost:5000/4` | 8 rows × 4 columns checkerboard |
| `http://localhost:5000/10/10` | 10×10 checkerboard |
| `http://localhost:5000/<x>/<y>` | x rows × y columns checkerboard |
| `http://localhost:5000/<x>/<y>/<color1>/<color2>` | x×y board with custom colors |

### Examples

```
http://localhost:5000/             → 8x8, red & black
http://localhost:5000/4            → 8x4, red & black
http://localhost:5000/10/10        → 10x10, red & black
http://localhost:5000/6/6/blue/white  → 6x6, blue & white
http://localhost:5000/5/5/green/beige → 5x5, green & beige
```

---

## How It Works

The Flask app passes `rows`, `cols`, `color1`, and `color2` to the Jinja2 template. The template uses nested `for` loops to build an HTML `<table>`. Cell color is determined by whether `(row + col)` is even or odd:

```html
{% for row in range(rows) %}
  <tr>
    {% for col in range(cols) %}
      {% if (row + col) % 2 == 0 %}
        <td style="background-color: {{ color1 }};"></td>
      {% else %}
        <td style="background-color: {{ color2 }};"></td>
      {% endif %}
    {% endfor %}
  </tr>
{% endfor %}
```

> **Note:** URL parameters arrive as strings by default — they are converted to `int` in the route before being passed to the template.

---

## Assignment Checklist

- [x] Root route renders a checkerboard template
- [x] CSS in a separate stylesheet linked to the template
- [x] Route accepts a single parameter (`/<x>`) — x columns, 8 rows
- [x] **NINJA BONUS:** Route accepts two parameters (`/<x>/<y>`) — x rows, y columns
- [x] **SENSEI BONUS:** Route accepts four parameters (`/<x>/<y>/<color1>/<color2>`) — x rows, y columns, custom colors
