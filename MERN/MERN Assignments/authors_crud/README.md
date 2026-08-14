# Authors — MERN CRUD

Assignment build: list, create, edit, delete authors with backend validation.

## Run

MongoDB must be running (local `mongod`, or set an Atlas URI in `server/.env`).

Terminal 1:
```bash
cd server
npm install
npm start
```
Expect `connected to db` and `server is running`.

Terminal 2:
```bash
cd client
npm install
npm run dev
```

## Routes

| Path | Page |
|---|---|
| `/` | list of all authors |
| `/authors/new` | add a new author |
| `/authors/:id/edit` | edit an existing author |

## API

| Method | Endpoint |
|---|---|
| GET | `/api/authors` (sorted A–Z) |
| POST | `/api/authors` |
| GET | `/api/authors/:id` |
| PUT | `/api/authors/:id` |
| DELETE | `/api/authors/:id` |

## Requirements covered

- List page showing all authors
- Create page, redirects to `/` on success and on Cancel
- Edit form pre-populated with existing data
- Delete removes the row without a page refresh
- Backend validation: name required, minimum 3 characters
- Error messages shown on create AND on edit
- Alphabetical sorting
- Bonus: unknown id on the edit page shows an apology plus a link to the create form
