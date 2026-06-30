# Counter

A simple Spring Boot web application that demonstrates session management using JSP views. The app tracks how many times a user has visited the home page during their session, using `HttpSession` to store and increment a counter.

## Features

- Spring Boot MVC application packaged as a WAR
- JSP views rendered via Apache Tomcat Jasper
- Session-based visit counter using `HttpSession`
- Two pages:
  - **Home (`/`)** — Welcomes the user and increments the session visit counter.
  - **Counter (`/counter`)** — Displays the current number of visits stored in the session.

## Tech Stack

- Java 17
- Spring Boot 4.1.0 (Spring Boot Starter Web, Tomcat, Jasper)
- JSP / JSTL
- Maven (WAR packaging)

## Project Structure

```
Counter/
├── src/
│   └── main/
│       ├── java/com/axsos/counter/
│       │   └── MainController.java   # Handles routing and session logic
│       └── webapp/
│           └── WEB-INF/
│               └── views/
│                   ├── index.jsp     # Welcome page
│                   └── counter.jsp   # Displays visit count
└── pom.xml
```

## How It Works

1. When a user visits `/`, `MainController` checks if a `counter` attribute exists in the current `HttpSession`.
   - If it exists, the counter is incremented.
   - If it doesn't, the counter is initialized to `1`.
2. The user can then navigate to `/counter` to view the current session's visit count, pulled from `sessionScope.counter` in the JSP.
3. Since the counter is stored in the session (not a database), it resets when the session ends (e.g., browser closed, session timeout, or a new session is started).

## Getting Started

### Prerequisites

- Java 17 or later
- Maven 3.6+

### Running the App

1. Clone or download the project.
2. From the project root, run:
   ```bash
   mvn spring-boot:run
   ```
3. Open your browser and go to:
   ```
   http://localhost:8080/
   ```
4. Refresh the page a few times, then visit:
   ```
   http://localhost:8080/counter
   ```
   to see your visit count.

### Building a WAR

```bash
mvn clean package
```

The resulting WAR file will be in the `target/` directory and can be deployed to any Servlet container (e.g., standalone Tomcat).

## Endpoints

| Method | Path       | Description                                  |
|--------|------------|-----------------------------------------------|
| GET    | `/`        | Increments and stores the visit count in session |
| GET    | `/counter` | Displays the current session visit count      |

## Notes / Possible Improvements

- The counter is stored as session state only; it does not persist across sessions or server restarts. A future improvement could persist counts in a database for a global visit counter.
- Currently uses raw `int` boxing/unboxing for the session attribute; could be refactored to use a dedicated counter service or `AtomicInteger` for clarity.
- No tests are currently included; consider adding unit/integration tests with `spring-boot-starter-test`.

## Author

Assignment project for learning Spring Boot session management with JSP views.
