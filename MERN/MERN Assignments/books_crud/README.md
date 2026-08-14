# Books CRUD — MERN

Full CRUD app: dashboard list, create, details, update, delete.
Server = Express + Mongoose. Client = React (Vite) + Material UI.

## Requirements

- Node.js 18 or newer
- MongoDB running locally

## 1. Start MongoDB

Make sure `mongod` is running. Check it with:

```bash
mongosh
```

If that connects, you're fine.

## 2. Start the server

```bash
cd server
npm install
npm start
```

You should see:

```
connected to db
server is running
```

Test it in the browser: http://localhost:8000/api/health
It should return `{"message":"backend is healthy"}`.

If it says `error connecting to db`, MongoDB is not running.

## 3. Start the client

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

Open the URL it prints, normally http://localhost:5173

## Pages

| Path | Page |
|---|---|
| `/` | Dashboard — table of all books, delete button |
| `/create` | Create a book |
| `/book/:id` | Book details |
| `/edit/:id` | Update a book |

The dashboard starts empty. Click **Add Book** to create the first one.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | check the server is up |
| GET | `/api/books` | all books |
| POST | `/api/books` | create |
| GET | `/api/books/:id` | one book |
| PUT | `/api/books/:id` | update |
| DELETE | `/api/books/:id` | delete |

Responses are wrapped in an object: `GET /api/books` returns `{ "books": [...] }`,
so on the client you read `response.data.books`, not `response.data`.

## Book schema

| Field | Type | Rules |
|---|---|---|
| `title` | String | required, min 3 characters |
| `author` | String | required |
| `price` | Number | required |
| `description` | String | optional |

Plus `createdAt` and `updatedAt` from `{ timestamps: true }`.

## Files

```
server/
  .env                          PORT and MONGOOSE_URI
  server.js                     middleware, routes, listen
  config/mongoose.config.js     database connection
  models/book.model.js          schema
  routes/book.routes.js         route definitions
  controllers/book.controller.js  the five CRUD functions

client/
  index.html
  vite.config.js
  src/main.jsx                  BrowserRouter wraps App
  src/App.jsx                   route definitions
  src/pages/Dashboard.jsx       list + delete
  src/pages/CreateBook.jsx      create form
  src/pages/BookDetails.jsx     read one
  src/pages/UpdateBook.jsx      pre-filled update form
```

## Changing the entity

To turn Books into something else, rename in this order:

1. `models/book.model.js` — schema fields and the `mongoose.model("book", ...)` name
2. `controllers/book.controller.js` — function names and the object keys in `res.json({ ... })`
3. `routes/book.routes.js` — the `/api/books` paths
4. `server.js` — the `require("./routes/book.routes")` path
5. Client pages — the URLs, the `response.data.books` key, the form fields, the table columns

## Common problems

| Symptom | Cause |
|---|---|
| `error connecting to db` | MongoDB isn't running |
| CORS error in browser console | `app.use(cors())` missing or server not started |
| `books.map is not a function` | used `response.data` instead of `response.data.books` |
| Everything saves empty | `app.use(express.json())` missing |
| Update form loads blank | missing `value={}` on the TextField |
| Port 8000 already in use | another server is running — kill it or change PORT in `.env` |
