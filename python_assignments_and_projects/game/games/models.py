from django.conf import settings
from django.db import models


class Game(models.Model):
    GENRE_CHOICES = [
        ('ACTION', 'Action'),
        ('RPG', 'RPG'),
        ('ARCADE', 'Arcade'),
        ('STRATEGY', 'Strategy'),
        ('TACTICAL_SHOOTER', 'Tactical shooter'),
        ('ADVENTURE', 'Adventure'),
    ]

    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=30, choices=GENRE_CHOICES)
    release_date = models.DateField()
    description = models.TextField()
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='games_created',
    )
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def formatted_release_date(self):
        # spec: "day in number, month in words, year in number" -> e.g. "27 Sep 2023"
        return self.release_date.strftime('%d %b %Y')


class Rating(models.Model):
    """
    The 'through' model connecting Players <-> Games.
    A plain ManyToManyField can't carry the rate value, so we model the
    relationship explicitly: one row per (player, game) pair, holding the rate.
    """
    player = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ratings',
    )
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='ratings')
    rate = models.PositiveSmallIntegerField(default=1)  # 1-5

    class Meta:
        unique_together = ('player', 'game')  # a player can only rate a given game once

    def __str__(self):
        return f'{self.player} rated {self.game} -> {self.rate}'
