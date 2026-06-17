from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.db.models import Sum
from decimal import Decimal
import datetime

from .models import Expense, Budget, Bill, UserProfile


# ─────────────────────────────────────────
#  Auth Views
# ─────────────────────────────────────────

def landing_page(request):
    """Public landing page."""
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'landingPage.html')


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')

        # Allow login by email
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            username = email  # fallback: try as username

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid email or password.')

    return render(request, 'login.html')


def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        fullname = request.POST.get('fullname', '').strip()
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm = request.POST.get('confirm-password', '')

        if password != confirm:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'register.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return render(request, 'register.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return render(request, 'register.html')

        # Split full name
        parts = fullname.split(' ', 1)
        first_name = parts[0]
        last_name = parts[1] if len(parts) > 1 else ''

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        # Create profile
        UserProfile.objects.create(user=user)

        messages.success(request, 'Account created! Please log in.')
        return redirect('success')

    return render(request, 'register.html')


def logout_view(request):
    logout(request)
    return redirect('login')


def forgot_password_view(request):
    return render(request, 'forgot-password.html')


def reset_password_view(request):
    return render(request, 'reset-password.html')


def verify_email_view(request):
    return render(request, 'verify-email.html')


def success_view(request):
    return render(request, 'success.html')


# ─────────────────────────────────────────
#  Protected App Views
# ─────────────────────────────────────────

@login_required(login_url='login')
def dashboard_view(request):
    user = request.user
    today = timezone.now().date()
    current_month = today.month
    current_year = today.year

    # Summary stats
    expenses_qs = Expense.objects.filter(
        user=user, date__month=current_month, date__year=current_year
    )
    total_spent = expenses_qs.aggregate(total=Sum('amount'))['total'] or Decimal('0')

    budget_qs = Budget.objects.filter(
        user=user, month=current_month, year=current_year
    )
    total_budget = budget_qs.aggregate(total=Sum('budget_amount'))['total'] or Decimal('0')

    open_bills = Bill.objects.filter(user=user, is_paid=False).count()
    recent_expenses = expenses_qs[:5]

    # Category breakdown for donut chart
    categories = expenses_qs.values('category').annotate(total=Sum('amount')).order_by('-total')

    profile, _ = UserProfile.objects.get_or_create(user=user)

    context = {
        'total_spent': total_spent,
        'total_budget': total_budget,
        'open_bills': open_bills,
        'recent_expenses': recent_expenses,
        'categories': list(categories),
        'profile': profile,
        'month_name': today.strftime('%B %Y'),
    }
    return render(request, 'dashboard.html', context)


@login_required(login_url='login')
def expenses_view(request):
    user = request.user

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        amount = request.POST.get('amount', '0')
        category = request.POST.get('category', 'Other')
        date_str = request.POST.get('date', '')

        try:
            amount = Decimal(amount)
            date = datetime.date.fromisoformat(date_str)
            Expense.objects.create(
                user=user,
                title=title,
                amount=amount,
                category=category,
                date=date,
            )
            messages.success(request, 'Expense added successfully.')
        except Exception as e:
            messages.error(request, f'Error adding expense: {e}')

        return redirect('expenses')

    expenses = Expense.objects.filter(user=user)
    return render(request, 'expenses.html', {'expenses': expenses})


@login_required(login_url='login')
def delete_expense_view(request, expense_id):
    expense = get_object_or_404(Expense, id=expense_id, user=request.user)
    expense.delete()
    messages.success(request, 'Expense deleted.')
    return redirect('expenses')


@login_required(login_url='login')
def budget_view(request):
    user = request.user
    today = timezone.now().date()
    current_month = today.month
    current_year = today.year

    if request.method == 'POST':
        income = request.POST.get('income', '0')
        category = request.POST.get('category', '')
        budget_amount = request.POST.get('budget-amount', '0')

        try:
            income = Decimal(income) if income else Decimal('0')
            budget_amount = Decimal(budget_amount)

            if category:
                Budget.objects.update_or_create(
                    user=user,
                    category=category,
                    month=current_month,
                    year=current_year,
                    defaults={
                        'budget_amount': budget_amount,
                        'monthly_income': income,
                    }
                )
                messages.success(request, 'Budget saved.')
        except Exception as e:
            messages.error(request, f'Error: {e}')

        return redirect('budget')

    # Get budgets for current month
    budgets = Budget.objects.filter(user=user, month=current_month, year=current_year)

    # Annotate each budget with spent amount
    budget_data = []
    total_spent = Decimal('0')
    total_budget_sum = Decimal('0')

    # Map expense categories to budget categories
    CATEGORY_MAP = {
        'Food': 'food',
        'Transportation': 'transport',
        'Shopping': 'shopping',
        'Bills': 'bills',
        'Health': 'health',
        'Entertainment': 'entertainment',
        'Other': 'other',
    }

    for b in budgets:
        # Find matching expense categories
        expense_cats = [k for k, v in CATEGORY_MAP.items() if v == b.category]
        spent = Expense.objects.filter(
            user=user,
            category__in=expense_cats,
            date__month=current_month,
            date__year=current_year,
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0')

        remaining = b.budget_amount - spent
        percent = int((spent / b.budget_amount * 100)) if b.budget_amount > 0 else 0

        if percent >= 100:
            status = 'danger'
            msg = 'Budget reached!'
        elif percent >= 85:
            status = 'warning'
            msg = f'₪ {remaining:.0f} remaining — almost over!'
        else:
            status = 'safe'
            msg = f'₪ {remaining:.0f} remaining'

        budget_data.append({
            'obj': b,
            'spent': spent,
            'remaining': remaining,
            'percent': min(percent, 100),
            'status': status,
            'msg': msg,
            'emoji': b.get_emoji(),
        })

        total_spent += spent
        total_budget_sum += b.budget_amount

    # Get monthly income from most recent budget entry
    monthly_income = budgets.first().monthly_income if budgets.exists() else Decimal('0')
    overall_percent = int((total_spent / total_budget_sum * 100)) if total_budget_sum > 0 else 0
    remaining_overall = monthly_income - total_spent

    context = {
        'budgets': budget_data,
        'total_spent': total_spent,
        'total_budget': total_budget_sum,
        'monthly_income': monthly_income,
        'remaining': remaining_overall,
        'overall_percent': overall_percent,
        'month_name': today.strftime('%B %Y'),
    }
    return render(request, 'budgetplaning.html', context)


@login_required(login_url='login')
def bills_view(request):
    user = request.user
    today = timezone.now().date()

    if request.method == 'POST':
        name = request.POST.get('bill_name', '').strip()
        amount = request.POST.get('amount', '0')
        due_date_str = request.POST.get('due_date', '')

        try:
            amount = Decimal(amount)
            due_date = datetime.date.fromisoformat(due_date_str)
            Bill.objects.create(user=user, name=name, amount=amount, due_date=due_date)
            messages.success(request, 'Bill reminder added.')
        except Exception as e:
            messages.error(request, f'Error: {e}')

        return redirect('bills')

    bills = Bill.objects.filter(user=user, is_paid=False)

    bills_with_days = []
    for bill in bills:
        days = bill.days_until_due()
        if days < 0:
            label = f'Overdue by {abs(days)} days'
        elif days == 0:
            label = 'Due today!'
        elif days == 1:
            label = 'Due tomorrow'
        else:
            label = f'Due in {days} days'
        bills_with_days.append({'bill': bill, 'days_label': label, 'days': days})

    total_needed = bills.aggregate(total=Sum('amount'))['total'] or Decimal('0')
    next_bill = bills.order_by('due_date').first()

    context = {
        'bills': bills_with_days,
        'upcoming_count': bills.count(),
        'total_needed': total_needed,
        'next_bill': next_bill,
    }
    return render(request, 'billReminder.html', context)


@login_required(login_url='login')
def delete_bill_view(request, bill_id):
    bill = get_object_or_404(Bill, id=bill_id, user=request.user)
    bill.delete()
    return redirect('bills')


@login_required(login_url='login')
def analytics_view(request):
    user = request.user
    today = timezone.now().date()
    current_month = today.month
    current_year = today.year

    expenses_qs = Expense.objects.filter(
        user=user, date__month=current_month, date__year=current_year
    )

    total_saved = Decimal('1280')  # placeholder — extend with savings model later
    categories = expenses_qs.values('category').annotate(total=Sum('amount')).order_by('-total')
    biggest = categories.first()
    total_spent = expenses_qs.aggregate(t=Sum('amount'))['t'] or Decimal('0')

    # Chart data
    chart_labels = [c['category'] for c in categories]
    chart_data = [float(c['total']) for c in categories]

    context = {
        'total_saved': total_saved,
        'biggest_category': biggest['category'] if biggest else '—',
        'biggest_amount': biggest['total'] if biggest else 0,
        'total_spent': total_spent,
        'chart_labels': chart_labels,
        'chart_data': chart_data,
    }
    return render(request, 'monthlyReport.html', context)


@login_required(login_url='login')
def profile_view(request):
    user = request.user
    profile, _ = UserProfile.objects.get_or_create(user=user)

    recent = Expense.objects.filter(user=user)[:4]

    # Compute total balance = income - spent this month
    today = timezone.now().date()
    monthly_spent = Expense.objects.filter(
        user=user,
        date__month=today.month,
        date__year=today.year,
    ).aggregate(t=Sum('amount'))['t'] or Decimal('0')

    total_balance = profile.monthly_income - monthly_spent

    context = {
        'profile': profile,
        'recent_expenses': recent,
        'total_balance': total_balance,
        'monthly_income': profile.monthly_income,
        'initials': (user.first_name[:1] + user.last_name[:1]).upper() or user.username[:2].upper(),
    }
    return render(request, 'profile.html', context)


@login_required(login_url='login')
def settings_view(request):
    user = request.user
    profile, _ = UserProfile.objects.get_or_create(user=user)

    if request.method == 'POST':
        action = request.POST.get('action', '')

        if action == 'update_info':
            username = request.POST.get('username', '').strip()
            email = request.POST.get('email', '').strip()
            if username:
                user.username = username
            if email:
                user.email = email
            user.save()
            messages.success(request, 'Profile updated.')

        elif action == 'change_password':
            current_pw = request.POST.get('current_password', '')
            new_pw = request.POST.get('new_password', '')
            if user.check_password(current_pw):
                if new_pw:
                    user.set_password(new_pw)
                    user.save()
                    messages.success(request, 'Password changed. Please log in again.')
                    return redirect('login')
            else:
                messages.error(request, 'Current password is incorrect.')

        elif action == 'preferences':
            profile.currency = request.POST.get('currency', 'ILS')
            profile.language = request.POST.get('language', 'english')
            profile.email_alerts = 'email_alerts' in request.POST
            profile.bill_reminders = 'bill_reminders' in request.POST
            profile.save()
            messages.success(request, 'Preferences saved.')

        elif action == 'delete_account':
            user.delete()
            return redirect('landing')

        return redirect('settings')

    context = {'profile': profile}
    return render(request, 'settings.html', context)


@login_required(login_url='login')
def predictions_view(request):
    """AI Predictions — simple rule-based spending forecast."""
    user = request.user
    today = timezone.now().date()

    # Last 3 months of data
    three_months_ago = today - datetime.timedelta(days=90)
    expenses = Expense.objects.filter(user=user, date__gte=three_months_ago)

    # Average monthly spend per category
    category_totals = expenses.values('category').annotate(total=Sum('amount'))
    predictions = []
    for item in category_totals:
        avg = float(item['total']) / 3
        predictions.append({
            'category': item['category'],
            'avg_monthly': round(avg, 2),
            'predicted_next': round(avg * 1.05, 2),  # 5% trend up
        })

    total_predicted = sum(p['predicted_next'] for p in predictions)

    context = {
        'predictions': predictions,
        'total_predicted': round(total_predicted, 2),
        'month_name': (today.replace(day=1) + datetime.timedelta(days=32)).strftime('%B %Y'),
    }
    return render(request, 'predictions.html', context)


def about_view(request):
    return render(request, 'about_us.html')


def contact_view(request):
    if request.method == 'POST':
        messages.success(request, 'Message sent! We will get back to you soon.')
        return redirect('contact')
    return render(request, 'contact.html')
