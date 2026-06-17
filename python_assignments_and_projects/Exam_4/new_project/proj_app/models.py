from django.db import models
import re
import bcrypt
from datetime import datetime, date
from datetime import date


class UserManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not EMAIL_REGEX.match(postData['email']):
            errors['email'] = "Invalid email address!"
        if User.objects.filter(email=postData['email']).exists():
            errors['email_error_unique'] = "Email already registered!"
        if len(postData['first_name']) < 4:
            errors["first_name"] = "First Name should be at least 4 characters"
        if len(postData['last_name']) < 4:
            errors["last_name"] = "Last Name should be at least 4 characters"
        if len(postData['password']) < 8:
            errors["password"] = "Password should be at least 8 characters"
        if postData['password'] != postData['confirm_pw']:
            errors['confirm_pw'] = "Passwords do not match."
        return errors
    

        # if postData['birthday']:
        #     user_bday = datetime.strptime(postData['birthday'], "%Y-%m-%d").date()
        #     if user_bday > date.today():
        #         errors['birthday'] = "Birthday must be in the past."
        #         today = date.today()
        #         age = today.year - 'birthday'.year - ((today.month,today.day)) < (birthday.month,birthday.day)
        


class User(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    # birthday = models.DateField(default='2024-04-01')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

def register(postData):
    first_name = postData['first_name']
    last_name = postData['last_name']
    email = postData['email']
    password = postData['password']
    # birthday = postData['birthday']
    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User.objects.create(first_name = first_name,last_name = last_name,email = email,password = pw_hash)
    return user

def login(postData):
    users = User.objects.filter(email = postData['email'])
    password = postData['password']
    if users :                      #users because of use filter that return query set(list)
        logged_user = users[0]
        if bcrypt.checkpw(password.encode(), logged_user.password.encode()):
            return logged_user
    return None                 #if email or password false return none

def get_specific_user(request):
    return User.objects.get(id = request.session['user_id'])

class GameManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        if len(postData['game_name']) < 2:
            errors["game_name"] = "Game Name is required"
        if len(postData['genre']) < 1:
            errors["genre"] = "Genre is required"
        if len(postData["relese_date"]) < 1:
            errors["relese_date"] = "description is required"
            if len(postData["description"]) < 1:
                errors["description"] = "description is required"
        return errors

# class GameManager(models.Manager):
#     def game_validator(self, data):
#         errors = {}

#         if len(data['name']) < 2:
#             errors['name'] = "Game name must be at least 2 characters"

#         if data['release_date'] > str(date.today()):
#             errors['date'] = "Release date cannot be in the future"

#         if len(data['description']) == 0:
#             errors['description'] = "Description cannot be empty"

#         return errors

# GENRES = [
#     ("Action", "Action"),
#     ("RPG", "RPG"),
#     ("Strategy", "Strategy"),
#     ("Adventure", "Adventure"),
#     ("Arcade", "Arcade"),
#     ("Shooter", "Shooter"),
# ]

# class Game(models.Model):
#     name = models.CharField(max_length=80)
#     genre = models.CharField(max_length=20, choices=GENRES)
#     release_date = models.DateField()
#     description = models.TextField()
#     creator = models.ForeignKey(User, related_name="games", on_delete=models.CASCADE)
#     liked_by = models.ManyToManyField(User, related_name="liked_games")

#     objects = GameManager()


class Game(models.Model):
    game_name = models.CharField(max_length=45)
    genre = models.CharField(max_length=80)
    relese_date = models.DateField()
    description = models.TextField()
    user = models.ForeignKey(User, related_name="games", on_delete=models.CASCADE)
    favorites = models.ManyToManyField(User, related_name='favorites')
    # rate = models.ManyToManyField(User, through="GameRating", related_name='rated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = GameManager()



def create_game(postData,request):
    game_name = postData['game_name']
    genre = postData['genre']
    relese_date = postData['relese_date']
    description = postData['description']
    # game_id = postData['genre']
    user = User.objects.get(id = request.session['user_id'])
    new_game = Game.objects.create(game_name = game_name, genre = genre, relese_date = relese_date ,description = description,user = user)
    return new_game

def get_all_game():
    return Game.objects.all()

def get_specific_game(id):
    return Game.objects.get(id = id)

def delete_game(id):
    del_game = Game.objects.get(id = id)
    del_game.delete()


# def edit_page(postData):
#     game = Game.objects.get(id = postData['game_id'])
#     game.game_name = postData['game_name']
#     game.genre = postData['genre']
#     game.relese_date = postData['relese_date']
#     game.description = postData['description']
#     game.save()
#     return game

def edit_page(postData, id):
    game = Game.objects.get(id=id)  # use the id parameter, not postData['game_id']
    game.game_name = postData['game_name']
    game.genre = postData['genre']
    game.relese_date = postData['relese_date']
    game.description = postData['description']
    game.save()
    return game

# def edit_page(request,id):
#     game = models.show_game_edit(id)

def show_game_edit(id):
    return Game.objects.get(id = id)

def get_game_by_id(id):
    return Game.objects.get(id = id)