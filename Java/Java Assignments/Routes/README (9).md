# Routes - Spring Boot Fortune App

A simple Spring Boot REST API that delivers fortune messages based on the URL path requested.

## Overview

This project demonstrates the use of `@RestController` and `@RequestMapping` annotations in Spring Boot to handle different URL routes and return custom messages.

## Endpoints

| Method | URL | Response |
|--------|-----|----------|
| GET | `/Daikichi` | `Welcome` |
| GET | `/Daikichi/today` | `Today you will find luck in all your endeavors!` |
| GET | `/Daikichi/tomorrow` | `Tomorrow a new opportunity will arise, so be sure to be open to new ideas!` |

## Getting Started

### Prerequisites

- Java 17+
- Apache Maven
- Spring Boot

### Running the App

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/routes.git
   cd routes
   ```

2. Build and run with Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The server will start on `http://localhost:8080`

### Try It Out

Open your browser or use `curl`:

```bash
curl http://localhost:8080/Daikichi
curl http://localhost:8080/Daikichi/today
curl http://localhost:8080/Daikichi/tomorrow
```

## Project Structure

```
src/
└── main/
    └── java/
        └── com/
            └── axsos/
                └── routes/
                    ├── RoutesApplication.java
                    └── DaikichiController.java
```

## Key Concepts

- **`@RestController`** — marks the class as a REST controller, combining `@Controller` and `@ResponseBody`
- **`@RequestMapping`** — maps HTTP GET requests to specific handler methods based on the URL path

## Built With

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Apache Maven](https://maven.apache.org/)
- Java 17 (Amazon Corretto)
