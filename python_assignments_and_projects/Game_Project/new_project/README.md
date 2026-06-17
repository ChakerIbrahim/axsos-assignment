# Django Game Management App

## Setup Instructions

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate        # Windows
   source venv/bin/activate     # Mac/Linux
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Start the server:
   ```
   python manage.py runserver
   ```

5. Open your browser at: http://127.0.0.1:8000/

## Features
- User registration with validation
- User login/logout with bcrypt password hashing
- Create, view, edit, delete games
- Only the creator can edit or delete their own game
- Add games to favorites
- Shows list of users who favorited a game
