from flask import Flask, render_template, request, redirect, session
app = Flask(__name__)  
app.secret_key="secret_key"

@app.route('/')         
def index():
    return render_template("index.html")

@app.route('/checkout', methods=['POST'])         
def checkout():
    session['strawberry']= int(request.form['strawberry'])
    session['raspberry']= int(request.form['raspberry'])
    session['apple']= int(request.form['apple'])
    session['first_name']= request.form['first_name']
    session['last_name']= request.form['last_name']
    session['student_id']= request.form['student_id']
    print(request.form)
    return render_template("checkout.html" , first_name = session['first_name'] , last_name = session['last_name']  , student_id = session['student_id'] , strawberry = int(session['strawberry']) , raspberry = int(session['raspberry']) , apple = int(session['apple']) , full_name = session['first_name'] + ' '+ session['last_name'])

@app.route('/fruits')         
def fruits():
    return render_template("fruits.html")

if __name__=="__main__":   
    app.run(debug=True)    