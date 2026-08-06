# 🎭 Jokes API

A RESTful CRUD API built with **Node.js**, **Express**, and **MongoDB** that stores and serves jokes. Built as part of the MERN Stack course at Axsos Academy.

Every joke has a `setup` and a `punchline`, and the API exposes full Create, Read, Update, and Delete functionality — plus a bonus route that returns a random joke.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework — routing and middleware |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose** | ODM for schema definition, validation, and queries |
| **dotenv** | Loads environment variables from a `.env` file |
| **Postman** | Testing and documenting the API endpoints |
| **nodemon** *(dev)* | Auto-restarts the server on file changes |

---

## 📁 Project Structure

```
jokes/
├── config/
│   └── mongoose.config.js      # Database connection
├── controllers/
│   └── joke.controller.js      # Request handling logic
├── models/
│   └── joke.model.js           # Mongoose schema + validations
├── routes/
│   └── joke.routes.js          # Endpoint definitions
├── screenshots/                # Postman screenshots
├── .env                        # Environment variables (NOT committed)
├── .gitignore
├── package.json
└── server.js                   # Entry point
```

---

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-username/jokes-api.git
cd jokes-api
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file** in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=jokes_db
PORT=8000
```

> ⚠️ Never commit your `.env` file or hardcode your connection string — your database credentials would be publicly visible.

**4. Start the server**

```bash
npm start
# or, for development
npm run dev
```

The server runs at `http://localhost:8000`.

---

## 📡 API Endpoints

Base URL: `http://localhost:8000`

| Route | HTTP Verb | Description |
|---|---|---|
| `/api/jokes` | **GET** | Returns a list of all jokes |
| `/api/jokes/:id` | **GET** | Returns one joke with a matching id |
| `/api/jokes` | **POST** | Adds a new joke to the database |
| `/api/jokes/:id` | **PATCH** | Partially updates an existing joke with a matching id |
| `/api/jokes/:id` | **DELETE** | Removes a joke with a matching id |

### Request Body Format

```json
{
  "setup": "Why don't scientists trust atoms?",
  "punchline": "Because they make up everything!"
}
```

---

## ✅ Validations

Validations are defined at the schema level in `joke.model.js` and enforced on both create and update operations (`runValidators: true`):

| Field | Rules |
|---|---|
| `setup` | Required · minimum **10** characters |
| `punchline` | Required · minimum **3** characters |

If a request fails validation, the API responds with a `400` status and a Mongoose error object describing exactly which field failed and why.

---


## 🧪 Testing

All endpoints were tested using **Postman**. To test a `POST` or `PATCH` request, set the body to **raw → JSON**.

After creating, updating, or deleting a joke, run `GET /api/jokes` to confirm the change was persisted to the database.

---

## 👤 Author

**Chaker Ibrahim**
MERN Stack — Axsos Academy
[GitHub](https://github.com/ChakerIbrahim) · [LinkedIn](https://www.linkedin.com/in/chaker-ibrahim-677bab111/)
