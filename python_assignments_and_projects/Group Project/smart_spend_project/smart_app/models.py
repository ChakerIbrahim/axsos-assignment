from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    currency = models.CharField(max_length=10, default='ILS')
    language = models.CharField(max_length=20, default='english')
    email_alerts = models.BooleanField(default=True)
    bill_reminders = models.BooleanField(default=True)
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.user.username}'s profile"


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Transportation', 'Transportation'),
        ('Entertainment', 'Entertainment'),
        ('Bills', 'Bills'),
        ('Shopping', 'Shopping'),
        ('Health', 'Health'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.title} - {self.amount}"


class Budget(models.Model):
    CATEGORY_CHOICES = [
        ('food', 'Food & Dining'),
        ('transport', 'Transport'),
        ('shopping', 'Shopping'),
        ('bills', 'Bills & Utilities'),
        ('health', 'Health'),
        ('entertainment', 'Entertainment'),
        ('other', 'Other'),
    ]

    CATEGORY_EMOJI = {
        'food': '🍔',
        'transport': '🚗',
        'shopping': '🛍',
        'bills': '💡',
        'health': '💊',
        'entertainment': '🎬',
        'other': '📦',
    }

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    budget_amount = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    month = models.IntegerField()   # 1-12
    year = models.IntegerField()

    class Meta:
        unique_together = ['user', 'category', 'month', 'year']

    def get_emoji(self):
        return self.CATEGORY_EMOJI.get(self.category, '📦')

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.month}/{self.year}"


class Bill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['due_date']

    def days_until_due(self):
        from django.utils import timezone
        today = timezone.now().date()
        delta = self.due_date - today
        return delta.days

    def __str__(self):
        return f"{self.name} - ${self.amount} due {self.due_date}"
