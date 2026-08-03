# Faker API

A simple REST API built with Express that returns randomly generated **User** and **Company** objects. Every request returns brand new data — nothing is stored in a database.

---

## Features

- Generates a random user with `userID`, `firstName`, `lastName`, `phoneNumber`, `email`, and `password`
- Generates a random company with `companyId`, `name`, and a nested `address` object containing `street`, `city`, `state`, `zipCode`, and `country`
- Returns a user and a company together in a single response
- Fresh data on every request — refresh the route and the values change
- Responses are sent as JSON, ready to be consumed by any client

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express | Web server and routing |
| @faker-js/faker | Random data generation |
| nodemon | Restarts the server automatically on save |
| Postman | Testing the GET routes |

---

## Installation

```bash
# Create the project folder
mkdir Faker_API
cd Faker_API

# Create package.json
npm init -y

# Install dependencies
npm install express @faker-js/faker

# Install nodemon globally (only needed once)
npm install -g nodemon
```

Then add `server.js` to the folder.

---

## How to Run

Start the server with:

```bash
nodemon server.js
```

You should see this in your terminal:

```
server is running
```

The API is now available at **http://localhost:9090**

---

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/users/new` | Returns a new user |
| GET | `/api/companies/new` | Returns a new company |
| GET | `/api/user/company` | Returns a new user and a new company |

### Sample Responses

**GET** `/api/users/new`

```json
{
  "user": {
    "userID": "ce243eca-660f-41fd-afac-f57c02d9db92",
    "firstName": "Samantha",
    "lastName": "Auer",
    "phoneNumber": "1-999-676-3454",
    "email": "Kaylee.Rohan@gmail.com",
    "password": "JTZ7oWIEELrQ"
  }
}
```

**GET** `/api/companies/new`

```json
{
  "com": {
    "companyId": "ff2c7e4d-8e77-4fa0-9181-8c60c87d49ca",
    "name": "Lockman - Hirthe",
    "address": {
      "street": "375 Second Avenue",
      "city": "Richardson",
      "state": "Kentucky",
      "zipCode": "61900",
      "country": "Slovenia"
    }
  }
}
```

**GET** `/api/user/company`

```json
{
  "user": {
    "userID": "de927bd9-b043-4b52-a68f-841c0b6f066d",
    "firstName": "Tabitha",
    "lastName": "Crona",
    "phoneNumber": "1-925-368-1767",
    "email": "Rylan_Weber@yahoo.com",
    "password": "q1XFmUDpbAX4"
  },
  "company": {
    "companyId": "e3b8fcf1-92d1-47ae-89c5-4606dc82c32a",
    "name": "Heidenreich, Jacobi and D'Amore",
    "address": {
      "street": "57054 Meadow Way",
      "city": "Herzogchester",
      "state": "Hawaii",
      "zipCode": "77728",
      "country": "Slovakia"
    }
  }
}
```

---

## Testing with Postman

1. Start the server with `nodemon server.js`
2. Open Postman and create a new request
3. Set the method to **GET**
4. Enter the route URL and press **Send**
5. Press **Send** again — the data changes every time

### Screenshots



**User and Company** — `GET http://localhost:9090/api/user/company`

![User and company route](/images/user-company.png)

---

## Project Structure

```
Faker_API/
├── images/             # Postman screenshots used in this README
├── node_modules/
├── package.json
├── README.md
└── server.js
```
