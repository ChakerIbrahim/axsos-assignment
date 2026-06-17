from django.contrib import admin
from .models import Expense, Budget, Bill, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'currency', 'language', 'monthly_income']


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'amount', 'category', 'date']
    list_filter = ['category', 'date']
    search_fields = ['title', 'user__username']


@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ['user', 'category', 'budget_amount', 'month', 'year']
    list_filter = ['month', 'year', 'category']


@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'amount', 'due_date', 'is_paid']
    list_filter = ['is_paid']
