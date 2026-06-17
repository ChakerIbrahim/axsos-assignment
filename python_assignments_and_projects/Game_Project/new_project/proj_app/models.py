from django.db import models
import re
import bcrypt
from datetime import datetime, date


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


class User(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()


def register(postData):
    pw_hash = bcrypt.hashpw(postData['password'].encode(), bcrypt.gensalt()).decode()
    user = User.objects.create(
        first_name=postData['first_name'],
        last_name=postData['last_name'],
        email=postData['email'],
        password=pw_hash
    )
    return user


def login(postData):
    users = User.objects.filter(email=postData['email'])
    if users:
        logged_user = users[0]
        if bcrypt.checkpw(postData['password'].encode(), logged_user.password.encode()):
            return logged_user
    return None


def get_specific_user(request):
    return User.objects.get(id=request.session['user_id'])


class GameManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        if len(postData['game_name']) < 2:
            errors["game_name"] = "Game name must be at least 2 characters"
        if len(postData['genre']) < 1:
            errors["genre"] = "Genre is required"
        if len(postData["relese_date"]) < 1:
            errors["relese_date"] = "Release date is required"
        else:
            release = datetime.strptime(postData["relese_date"], "%Y-%m-%d").date()
            if release > date.today():
                errors["relese_date"] = "Release date cannot be in the future"
        if len(postData["description"]) < 1:
            errors["description"] = "Description is required"
        return errors


class Game(models.Model):
    game_name = models.CharField(max_length=45)
    genre = models.CharField(max_length=80)
    relese_date = models.DateField()
    description = models.TextField()
    user = models.ForeignKey(User, related_name="games", on_delete=models.CASCADE)
    favorites = models.ManyToManyField(User, related_name='favorites', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = GameManager()


def create_game(postData, request):
    user = User.objects.get(id=request.session['user_id'])
    return Game.objects.create(
        game_name=postData['game_name'],
        genre=postData['genre'],
        relese_date=postData['relese_date'],
        description=postData['description'],
        user=user
    )


def get_all_game():
    return Game.objects.all()


def get_specific_game(id):
    return Game.objects.get(id=id)


def delete_game(id):
    Game.objects.get(id=id).delete()


def edit_page(postData, id):
    game = Game.objects.get(id=id)
    game.game_name = postData['game_name']
    game.genre = postData['genre']
    game.relese_date = postData['relese_date']
    game.description = postData['description']
    game.save()
    return game


def show_game_edit(id):
    return Game.objects.get(id=id)


def get_game_by_id(id):
    return Game.objects.get(id=id)
