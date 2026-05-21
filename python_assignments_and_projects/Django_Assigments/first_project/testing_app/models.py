from django.db import models

# Create your models here.
class Movie(models.model):
    tittle = models.CharField(max_length=45)
    description = models.TextFiels()
    release_date = models.DateTimeField()
    duration = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

Movie.objects.create(field1=10 , field2=20)
newly_created_movie = Movie.objects.create(tittle= "The Princess Bride" , description= "the best movie ever", release_date="1987-09-25", duration=98)
print(newly_created_movie.id)

newly_created_movie = Movie(tittle= "The Princess Bride" , description= "the best movie ever", release_date="1987-09-25", duration=98)
newly_created_movie.save()

all_movies = Movie.objects.all()

Movie.objects.filter(field=2 , field2=3)

some_movies = Movie.objects.filter(release_date='2018-11-16')

Movie.objects.exclude(field1=2)

other_movies = Movie.objects.exclude(release_date='2018-11-16')

from m in all_movies:
    print(m.tittle)

Movie.objects.get(field1= 6)
one_movie = Movie.objects.get(id=7)

Movie.objects.first()
first_movie = Movie.objects.first()

movie.objects.last()
last_movie = Movie.objects.last()

print("Movie 7", one_movie.tittle)
print("First movie", first_movie.release_date)
print("Last movie", last_movie.description)


movie_to_update = Movie.objects.get(id=42)
movie_to_update.description = "the answer to the universe"
movie_to_update.tittle = "The Hitchhiker's Guide to the Galaxy"
movie_to_update.save()

movie_to_delete = Movie.objects.get(id=2)
movie_to_delete()