from django.db import models

# Create your models here.
class Show(models.Model):
    title = models.CharField(max_length=50)
    network = models.CharField(max_length=20)
    release_date = models.DateField()
    desc = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



def create_show(data):
    Show.objects.create(
    title=data['title'],
    network=data['network'],
    release_date=data['release_date'],
    desc=data['desc'],
    )

def update_show(data,id):
    show =Show.objects.get(id = id)
    show.title = data['title']
    show.network=data['network']
    show.release_date=data['release_date']
    show.desc=data['desc']
    show.save()

def all_the_shows():
    return Show.objects.all()

def get_show_id(id):
    return Show.objects.get(id=id)

def delete_procress(id):
    deleting = Show.objects.get(id=id)
    deleting.delete()