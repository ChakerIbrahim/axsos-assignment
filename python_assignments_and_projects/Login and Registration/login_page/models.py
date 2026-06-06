from django.db import models
import re
import bcrypt
# Create your models here.
class userManager(models.Manager):
    def basic_validator(self,postData):
        errors={}


        #------Validation for first name-----
        #------------------------------------

        if len(postData['first_name']) <3:
            errors['first_name']='first name should be at least 3 characters'
        first_name_regex = re.compile(r'^[a-zA-Z]+$')
        if not first_name_regex.match(postData['first_name']):
            errors['first_name_regex']='first name should contain only letters'

        #------Validation for last name-----
        #------------------------------------
        if len(postData['last_name']) <3:
            errors['last_name']='last name should be at least 3 characters'
        last_name_regex = re.compile(r'^[a-zA-Z]+$')
        if not last_name_regex.match(postData['last_name']):
            errors['last_name_regex']='last name should contain only letters'

        #------Validation for email-----
        #------------------------------------
        if len(postData['email']) == 0:
            errors['email']='email is required'
        email_regex = re.compile(r'^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$'
)
        if not email_regex.match(postData['email']):
            errors['email_regex']='invalid email address'

        #------Validation for password-----
        #------------------------------------
        if len(postData['password']) <8:
            errors['password']='password should be at least 8 characters'

        password_regex= re.compile(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).*$')

        if not password_regex.match(postData['password']):
            errors['password_regex']='password should contain at least one letter in upper and lower case, one number, and one special character'

        if postData['password'] != postData['confirm_password']:
            errors['confirm_password']='passwords do not match'
        return errors



class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = userManager()

    def __str__(self):
        return self.first_name + ' ' + self.last_name + ' - ' + self.email





def create_account(PostData):
    first_name=PostData.get('first_name')
    last_name=PostData.get('last_name')
    email=PostData.get('email')
    password=PostData.get('password')
    
    user = User.objects.filter(email=email)
    
    if not user:
        pw_hash=bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        User.objects.create(first_name=first_name, last_name=last_name, email=email, password=pw_hash)
        return True
    else:
        return False
    
def find_user(email):
    user = User.objects.filter(email=email)
    if user:
        return user[0]
    else:
        return None