from flask import Flask
app=Flask(__name__)


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
def seventh(word,num):
    return f"{word}" * num


if __name__ == "__main__":
    app.run(debug=True)