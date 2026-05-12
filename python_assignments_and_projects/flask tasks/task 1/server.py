from flask import Flask
app = Flask(__name__)


@app.route("/")
def first():
    return "hi"


@app.route("/home/<name>")
def home(name):
    return "Welcome to Our Project"+ name

@app.route("/chaker")
def chaker():
    return "Welcome Mr Chaker"

if __name__ == '__main__':
    app.run(debug=True)