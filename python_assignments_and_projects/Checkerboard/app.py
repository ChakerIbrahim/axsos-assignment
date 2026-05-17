from flask import Flask, render_template

app = Flask(__name__)

# Root route: default 8x8 checkerboard
@app.route("/")
def index():
    return render_template("checkerboard.html", rows=8, cols=8, color1="red", color2="black")

# Single parameter: 8 rows x <x> columns
@app.route("/<x>")
def one_param(x):
    cols = int(x)
    return render_template("checkerboard.html", rows=8, cols=cols, color1="red", color2="black")

# Two parameters: x rows x y columns
@app.route("/<x>/<y>")
def two_params(x, y):
    rows = int(x)
    cols = int(y)
    return render_template("checkerboard.html", rows=rows, cols=cols, color1="red", color2="black")

# SENSEI BONUS: x rows, y columns, custom colors
@app.route("/<x>/<y>/<color1>/<color2>")
def four_params(x, y, color1, color2):
    rows = int(x)
    cols = int(y)
    return render_template("checkerboard.html", rows=rows, cols=cols, color1=color1, color2=color2)

if __name__ == "__main__":
    app.run(debug=True)
