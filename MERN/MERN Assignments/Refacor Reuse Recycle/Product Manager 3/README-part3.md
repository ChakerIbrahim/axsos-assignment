# Product Manager

A full stack MERN application for managing products. Built as the Product Manager (Part III) assignment for the Axsos Academy MERN Stack course.

Users can add a product with a title, price, and description, see all products in a list, view a single product on its own page, edit an existing product through an auto-filled form, and delete products from either the list or the detail page.

## Features

- **Create a product** — a form with title, price, and description fields
- **View all products** — every product is listed as a clickable link
- **View one product** — each product has its own detail page at `/products/:id`
- **Update a product** — an edit form at `/products/:id/edit` that loads with the current values already filled in
- **Delete a product** — a delete button on both the list and the detail page
- **Instant updates** — new products appear and deleted products disappear right away, without reloading the page
- **Redirect after delete** — deleting from the detail page sends you back to the main list
- **Form validation** — the database rejects empty fields, prices below zero, and titles or descriptions shorter than 3 characters, on both create and update
- **Timestamps** — every product is saved with `createdAt` and `updatedAt`

## Technologies Used

**Frontend**

- React 19
- React Router DOM 7
- Axios
- Vite

**Backend**

- Node.js
- Express 5
- Mongoose
- MongoDB Atlas

**Other**

- dotenv — for environment variables
- cors — to connect the client and server
- nodemon — to restart the server automatically

## Screenshots

### Product Manager form and product list

![Product Manager main page](./screenshots/main-page.png)

### Product detail page

![Product detail page](./screenshots/product-detail.png)

### Edit form with the product's current values

![Edit product page](./screenshots/product-edit.png)



## Project Structure

```
product-manager/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── ProductForm.jsx
│       │   ├── ProductList.jsx
│       │   ├── ProductDetail.jsx
│       │   └── ProductUpdate.jsx
│       ├── App.jsx
│       └── main.jsx
└── server/
    ├── config/
    │   └── mongoose.config.js
    ├── controllers/
    │   └── product.controller.js
    ├── models/
    │   └── product.model.js
    ├── routes/
    │   └── product.routes.js
    └── server.js
```

## API Routes

| Method | Route               | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/products`     | Create a new product  |
| GET    | `/api/products`     | Get all products      |
| GET    | `/api/products/:id` | Get one product by id |
| PATCH  | `/api/products/:id` | Update a product      |
| DELETE | `/api/products/:id` | Delete a product      |

## Client Routes

| Path                  | Page                     |
| --------------------- | ------------------------ |
| `/`                   | Product form and list    |
| `/products/:id`       | Product detail           |
| `/products/:id/edit`  | Edit product form        |

## How to Run

You need Node.js installed and a MongoDB Atlas account.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/product-manager.git
cd product-manager
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Then start the server:

```bash
npm start
```

The server runs on `http://localhost:8000`.

### 3. Set up the client

Open a second terminal and leave the server running.

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173`. Open that address in your browser.

## Author

Chaker — Axsos Academy MERN Stack course
