# Semi-Restful TV Shows

A Django web application that implements full CRUD functionality for managing a TV shows database, following RESTful routing conventions.

## Overview

This project was built as part of the Python Stack curriculum to practice ORM queries, RESTful routing, template rendering, and form-based data creation in Django.

## Features

- Add new TV shows via a form
- View all TV shows in a table
- View a single TV show's details
- Edit existing TV shows
- Delete TV shows
- Root route redirects to `/shows`

## Tech Stack

- **Backend:** Python / Django
- **Database:** SQLite3
- **Frontend:** HTML Templates (Django templating engine)

## Project Structure

```
SemiRestful_TV_Shows/
├── appTV/
│   ├── templates/
│   │   ├── addshow.html
│   │   ├── allshow.html
│   │   ├── editshow.html
│   │   └── TVshows.html
│   ├── models.py
│   ├── views.py
│   └── urls.py
├── SemiRestful_TV_Shows/
│   ├── settings.py
│   └── urls.py
└── manage.py
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/shows/new` | Display form to add a new show |
| POST | `/shows/create` | Submit new show to the database, redirect to `/shows/<id>` |
| GET | `/shows/<id>` | Display a single show's details |
| GET | `/shows` | Display all shows in a table |
| GET | `/shows/<id>/edit` | Display form to edit a specific show |
| POST | `/shows/<id>/update` | Update the show in the database, redirect to `/shows/<id>` |
| POST | `/shows/<id>/destroy` | Delete the show from the database, redirect to `/shows` |

## Data Model

### Show

| Field | Type | Details |
|-------|------|---------|
| `title` | CharField | max_length=50 |
| `network` | CharField | max_length=20 |
| `release_date` | DateField | |
| `desc` | CharField | max_length=255 |
| `created_at` | DateTimeField | auto_now_add=True |
| `updated_at` | DateTimeField | auto_now=True |

## Model Methods

- `create_show(data)` — Creates a new Show record
- `update_show(data, id)` — Updates an existing Show by ID
- `all_the_shows()` — Returns all Show records
- `get_show_id(id)` — Returns a single Show by ID
- `delete_process(id)` — Deletes a Show by ID

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/semi-restful-tv-shows.git
   cd semi-restful-tv-shows
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install django
   ```

4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

6. Visit `http://localhost:8000` in your browser — you'll be redirected to `/shows`.

## Learning Objectives

- Practice ORM queries from the controller layer
- Implement RESTful routing conventions
- Render query results to HTML templates
- Use form input to create and update database records
