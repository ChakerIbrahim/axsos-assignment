from flask import Flask, render_template, request, redirect

app = Flask(__name__)
@app.route('/' )
def user():
    return render_template("index.html")

@app.route('/profile', methods=['POST'])
def profile():
    firstname = request.form['firstname']
    dojo_location = request.form['dojo_location']
    favorite_language = request.form['Favorite_Language']
    comment = request.form['comments']
    return render_template("profile.html", firstname = firstname, dojo_location = dojo_location, favorite_language = favorite_language, comment = comment)

if __name__ == "__main__":

  app.run(debug=True)