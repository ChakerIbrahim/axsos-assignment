from django.db import models
import re
import bcrypt
from datetime import date

class ManagerLogin(models.Manager):
    
    def update_check(self,valid_update):
        errorsss = {}
        if len(valid_update['gname']) < 2:
            errorsss['gname'] = "name must be more than 2 charcters"
        if valid_update['release_date'] >= str(date.today()):
            errorsss['release_date'] = "try something in past man"
        return errorsss

    def game_check(self,valid_game):
        errorss= {}
        if len(valid_game['gname']) < 2:
            errorss['gname'] = "name must be more than 2 charcters"

        if len(valid_game['desc']) == 0:
            errorss['desc'] = "description should not be blank"

        if valid_game['release_date'] >= str(date.today()):
            errorss['release_date'] = "try something in past man"
        return errorss


    def login_valid(self,valid_data):
        errors = {}
        if valid_data['date'] >= str(date.today()):
            errors['date'] = "try something in past man"
        
        elif int(date.today().year) - int(valid_data['date'].split('-')[0]) <18:
            errors['date'] = "the user must be bigger than 18 years old"

        if "first_name" not in valid_data and len(valid_data['first_name'])<1:
            errors['first_name'] = "fill the blank"

        elif len(valid_data['first_name']) < 4:
            errors['first_name'] = "name must be more than 4 charcters"

        if "last_name" not in valid_data and len(valid_data['last_name'])<1:
            errors['last_name'] = "fill the blank"

        elif len(valid_data['last_name']) < 4 :
            errors['last_name'] = "name must be more than 4 charcters"

        if len(valid_data['password']) < 8 : 
            errors['password'] = "password must be more than 8 charcters"

        if "email" not in valid_data and len(valid_data['email'])<1:
            errors['email'] = "fill the blank"

        if "password" not in valid_data and len(valid_data['password'])<1:
            errors['password'] = "fill the blank"
            
        if "confirm_password" not in valid_data and len(valid_data['confirm_password'])<1:
            errors['confirm_password'] = "fill the blank"

        if "date" not in valid_data and len(valid_data['date'])<1:
            errors['confirm_password'] = "fill the blank"
        email_regex = re.compile(r'^[\w.-]+@[\w.-]+\.\w+$')
        if not email_regex.match(valid_data['email']):
            errors['email'] = "Invalid email format"

        name_regex = re.compile(r'^[a-zA-Z]+$')
        if not name_regex.match(valid_data['first_name']):
            errors['first_name'] = " first name must be enter with only a-z / A-Z charcters"

        if not name_regex.match(valid_data['last_name']):
            errors['last_name'] =  "last name must be enter with only a-z / A-Z charcters"

        if valid_data['password'] != valid_data['confirm_password']:
            errors['confirm_password'] = "not a matching password"

        if len(User.objects.filter(email = valid_data['email'])) >0:
            errors['email'] = "Email is already exists"
        return errors

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name =  models.CharField(max_length=50)
    email =models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    date = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    #games
    #gamez
    objects = ManagerLogin()

class Game(models.Model):
    gname = models.CharField(max_length=60)
    genre = models.CharField(max_length=60)
    release_date = models.DateField()
    desc = models.TextField()
    created_by = models.ForeignKey(User,related_name="gamez",default=1,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = ManagerLogin()


def create_account(data):
    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt()).decode()

    User.objects.create(
        first_name = data['first_name'],
        last_name = data['last_name'],
        email = data['email'],
        date = data['date'],
        password = hashed,
    )

def enter_account(data):
    user_email = User.objects.filter(email=data['email'])
    if len(user_email) > 0 :
        if bcrypt.checkpw(data['password'].encode(), user_email[0].password.encode()):
            return user_email[0]
        return False


def show_data():
    return User.objects.all()

def create_game(data,user):
    game = Game.objects.create(
        gname = data['gname'],
        genre = data['genre'],
        release_date = data['release_date'],
        desc = data['desc'],
        created_by = user
    )
    return game ,user

def show_game():
    return Game.objects.all()

def update_game(data,id):
    show =Game.objects.get(id = id)
    show.gname = data['gname']
    show.genre=data['genre']
    show.release_date=data['release_date']
    show.desc=data['desc']
    show.save()

def get_user_for_game(id):
    game = Game.objects.get(id = id)
    return game.created_by.id