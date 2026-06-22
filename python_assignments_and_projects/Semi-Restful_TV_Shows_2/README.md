# Semi-Restful TV Shows

A Django project implementing CRUD for TV shows using restful routing conventions, per the assignment spec.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
pip install django
python manage.py migrate
python manage.py runserver
```

Then visit **http://127.0.0.1:8000/** — it redirects straight to `/shows/`.

## Routes implemented

| URL                     | Method | Behavior                                                              |
|--------------------------|--------|-------------------------------------------------------------------------|
| `/`                      | GET    | Redirects to `/shows/`                                                  |
| `/shows/`                | GET    | Displays all shows in a table                                           |
| `/shows/new/`            | GET    | Form for adding a new show                                              |
| `/shows/create/`         | POST   | Adds the show to the DB, redirects to `/shows/<id>/`                    |
| `/shows/<id>/`           | GET    | Displays one show's info                                                |
| `/shows/<id>/edit/`      | GET    | Form for editing that show                                              |
| `/shows/<id>/update/`    | POST   | Updates the show, redirects to `/shows/<id>/`                           |
| `/shows/<id>/destroy/`   | POST   | Deletes the show, redirects to `/shows/`                                |

## Project layout

```
tv_shows_project/      # Django project (settings, root urls.py)
shows/                 # The "shows" app
  models.py            # Show model: title, network, release_date, description, last_updated
  forms.py             # ShowForm (ModelForm) used for both create and edit
  views.py             # index, new, create, show, edit, update, destroy
  urls.py              # app-level routes, included at /shows/ in the project urls.py
  templates/shows/      # index.html, new.html, show.html, edit.html, base.html
  static/shows/style.css
```

## Notes

- `ShowForm` is reused for both the "new" and "edit" pages, matching the wireframe's shared field layout (Title / Network / Release Date / Description).
- Delete is a POST'd HTML form (not a plain `<a>` link) since GET requests shouldn't trigger destructive side effects.
- `last_updated` auto-updates via `auto_now=True` whenever a show is saved, and is shown on the individual show page like in the wireframe ("Last Updated: ...").
- `ALLOWED_HOSTS = ['*']` is set for local development convenience — tighten this before any real deployment.
