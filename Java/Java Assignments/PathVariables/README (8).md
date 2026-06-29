# Path Variables - Spring MVC Assignment

## Description
A Spring Boot MVC web application that handles dynamic URL path variables. The app adds two new routes to an existing Routes project using `@PathVariable` to extract data from the URL and display dynamic responses.

## Technologies Used
- Java 17
- Spring Boot 3.2.0
- Spring MVC
- JSP
- CSS (external)

## Project Structure
```
src/
└── main/
    ├── java/com/axsos/daikichi/
    │   ├── controllers/
    │   │   └── DaikichiController.java
    │   └── DaikichiApplication.java
    ├── resources/
    │   ├── static/
    │   │   └── css/
    │   │       └── style.css
    │   └── application.properties
    └── webapp/
        └── WEB-INF/
            └── views/
                ├── travel.jsp
                └── lotto.jsp
```

## Routes
| Method | URL                          | Description                              |
|--------|------------------------------|------------------------------------------|
| GET    | `/daikichi/travel/{city}`    | Displays travel message for given city   |
| GET    | `/daikichi/lotto/{number}`   | Displays fortune based on even/odd number|

## How It Works

### Travel Route
- URL: `http://localhost:8080/daikichi/travel/Honolulu`
- The `{city}` path variable is extracted using `@PathVariable`
- Response: `"Congratulations! You will soon travel to Honolulu!"`

### Lotto Route
- URL: `http://localhost:8080/daikichi/lotto/6`
- The `{number}` path variable is extracted and checked for even/odd
- If **even** → `"You will take a grand journey in the near future, but be wary of tempting offers"`
- If **odd** → `"You have enjoyed the fruits of your labor but now is a great time to spend time with family and friends."`

## Key Concepts Used
- **`@PathVariable`** — extracts dynamic values from the URL path
- **`@RequestMapping`** — maps HTTP requests to controller methods
- **`Model`** — passes data from controller to JSP view
- **Even/Odd logic** — uses modulo operator `%` to check if number is even or odd

## Setup & Run
1. Clone or download the project
2. Open in Eclipse (Spring Tools Suite recommended)
3. Make sure Maven resolves all dependencies
4. Run as **Spring Boot App**
5. Visit `http://localhost:8080/daikichi/travel/{city}` or `http://localhost:8080/daikichi/lotto/{number}`

## Example URLs
| URL                                    | Output                                      |
|----------------------------------------|---------------------------------------------|
| `/daikichi/travel/Honolulu`            | Congratulations! You will soon travel to Honolulu! |
| `/daikichi/travel/Kyoto`               | Congratulations! You will soon travel to Kyoto! |
| `/daikichi/lotto/6`                    | You will take a grand journey... (even)     |
| `/daikichi/lotto/37`                   | You have enjoyed the fruits... (odd)        |
