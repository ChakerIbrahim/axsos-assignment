# Blueprint — developer project dashboard

A Django app built from the wireframe: account registration/login, a
dashboard of projects, project creation, project details with a team
list, and project editing — with the validation and permission rules
called out in the wireframe's annotations.

## Features

- **Accounts** — register and log in with email + password (no separate
  username). Custom user model (`accounts.User`).
- **Dashboard** — lists every project with its owner. The action column
  adapts to you: **Delete** if you own it, **Separate −** if you've
  joined it, **Join +** if you haven't.
- **Create / Edit project** — name, tagline, description, start/end date.
- **Project details** — full description, team list, and (owner-only)
  **Edit project** / **Delete project** buttons. Owners can remove a
  team member with the **×** next to their name.

## Validation rules implemented

| Field | Rule |
|---|---|
| First / last name | at least 2 characters |
| Email | valid format, must be unique |
| Password | at least 8 characters |
| Confirm password | must match password |
| Project name | at least 3 characters |
| Description | at least 10 characters |
| Start / end date | required |
| Start date (on **create** only) | must be today or later |
| End date | must be on/after the start date *(added for data sanity — the original notes didn't specify this, but it stops nonsensical date ranges)* |

Note: the "start date in present" rule is only enforced when **creating**
a project, not when **editing** one — the edit wireframe shows an
existing project with a start date in the past, so editing an in-flight
project stays allowed.

## Setup

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

Visit `http://127.0.0.1:8000/`.

Optional, to browse the data in Django admin:

```bash
python manage.py createsuperuser
```
then visit `http://127.0.0.1:8000/admin/`.

## Project structure

```
projecthub/        # settings, root urls
accounts/           # custom User model, register/login views & forms
projects/           # Project model, dashboard/CRUD/join-leave views & forms
templates/           # all HTML templates (base.html + accounts/, projects/)
static/css/style.css # the "blueprint" design system
```

## Design notes

The visual design ("Blueprint") leans into the idea of a project
*blueprint*: a pale drafting-paper background with a hairline grid, a
technical display face (Space Grotesk) paired with a monospace utility
face for IDs, dates, and small validation captions under form fields —
a tidy nod to the original wireframe's red/violet sticky-note callouts.
Each dashboard row carries a colored left edge (blue = you own it,
violet = you've joined it) so relationship to a project reads at a
glance.
