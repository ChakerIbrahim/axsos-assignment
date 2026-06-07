# Django Courses Management App

This is a Django project for the "Courses" assignment, implementing CRUD operations for courses with model validations and one-to-one relationship for descriptions.

## Features
- Add new courses with name (>5 chars) and description (>15 chars)
- Display courses in a table
- Delete courses with confirmation
- One-to-One relationship between Course and Description models
- Basic form validation and messages

## Setup Instructions

1. Clone the repository
2. Create virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install Django:
   ```
   pip install django
   ```
4. Apply migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Create superuser (optional):
   ```
   python manage.py createsuperuser
   ```
6. Run the server:
   ```
   python manage.py runserver
   ```
7. Visit http://127.0.0.1:8000/

## Project Structure
- `courses_project/`: Main project settings
- `courses/`: App with models, views, templates
- Models: Course and Description (1:1)

## Screenshots
Matches the wireframes provided in the assignment.

## Bonus
- Basic implementation of one-to-one as per Ninja bonus.
- Confirmation for delete.

Submit the zip of this project for the assignment.