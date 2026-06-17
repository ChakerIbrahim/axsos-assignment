from django.urls import path
from . import views

urlpatterns = [
    # Public
    path('', views.landing_page, name='landing'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('forgot-password/', views.forgot_password_view, name='forgot_password'),
    path('reset-password/', views.reset_password_view, name='reset_password'),
    path('verify-email/', views.verify_email_view, name='verify_email'),
    path('success/', views.success_view, name='success'),

    # Protected app pages
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('expenses/', views.expenses_view, name='expenses'),
    path('expenses/delete/<int:expense_id>/', views.delete_expense_view, name='delete_expense'),
    path('budget/', views.budget_view, name='budget'),
    path('bills/', views.bills_view, name='bills'),
    path('bills/delete/<int:bill_id>/', views.delete_bill_view, name='delete_bill'),
    path('analytics/', views.analytics_view, name='analytics'),
    path('profile/', views.profile_view, name='profile'),
    path('settings/', views.settings_view, name='settings'),
    path('predictions/', views.predictions_view, name='predictions'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
]
