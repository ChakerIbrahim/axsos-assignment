from flask import Flask , render_template
app = Flask(__name__)


@app.route("/")
def land() :
    return "Hi rand"
    


@app.route ("/play") 
def play () :
    return render_template("index.html" , x=3 , color= 'blue'   )

@app.route ("/play/<x>") 
def playnum(x) :
    return render_template("index.html" , int(x) , color= 'blue'   )
@app.route("/play/<x>/<color>")
def play_color(x, color):
    return render_template("index.html", x=int(x), color=color )

if __name__ == "__main__" :
    app.run(debug=True)