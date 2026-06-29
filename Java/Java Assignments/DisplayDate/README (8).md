# Display Date - Spring MVC Assignment

## Description
A Spring Boot MVC web application that displays the current date and time across three pages using JSTL formatting, an external CSS file, and an external JavaScript file.

## Technologies Used
- Java 17
- Spring Boot 3.2.0
- Spring MVC
- JSTL (Jakarta) - `fmt` taglib for date formatting
- JSP
- CSS (external)
- JavaScript (external)

## Project Structure
```
src/
└── main/
    ├── java/com/axsos/displaydate/
    │   ├── controllers/
    │   │   └── HomeController.java
    │   └── DisplayDateApplication.java
    ├── resources/
    │   ├── static/
    │   │   ├── css/
    │   │   │   └── style.css
    │   │   └── js/
    │   │       └── alert.js
    │   └── application.properties
    └── webapp/
        └── WEB-INF/
            └── views/
                ├── index.jsp
                ├── date.jsp
                └── time.jsp
```

## Pages & Routes
| Route   | Page       | Description                                        |
|---------|------------|----------------------------------------------------|
| `/`     | Dashboard  | Links to Date and Time pages                       |
| `/date` | Date Page  | Displays current date (e.g. Tuesday, Jan 23, 2024) |
| `/time` | Time Page  | Displays current time (e.g. 6:26 PM)               |

## How It Works
1. The `HomeController` handles three routes: `/`, `/date`, and `/time`.
2. For `/date` and `/time`, a `new Date()` object is added to the `Model` and passed to the JSP.
3. The JSP views use the JSTL `fmt:formatDate` tag to format the date/time correctly.
4. An external CSS file styles all three pages.
5. An external JavaScript file triggers an alert on the Date and Time pages when the page loads.

## Setup & Run
1. Clone or download the project
2. Open in Eclipse (Spring Tools Suite recommended)
3. Make sure Maven resolves all dependencies
4. Run as **Spring Boot App**
5. Visit `http://localhost:8080` in your browser

## Dependencies (pom.xml)
```xml
<!-- Spring MVC -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Tomcat for WAR -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>

<!-- JSP Support -->
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
    <scope>provided</scope>
</dependency>

<!-- JSTL -->
<dependency>
    <groupId>jakarta.servlet.jsp.jstl</groupId>
    <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
</dependency>
<dependency>
    <groupId>org.glassfish.web</groupId>
    <artifactId>jakarta.servlet.jsp.jstl</artifactId>
</dependency>
```

## Key Concepts Used
- **Spring MVC `@Controller`** — handles HTTP requests and returns view names
- **`Model`** — passes data from controller to JSP view
- **`fmt:formatDate`** — JSTL tag to format `java.util.Date` objects
- **External CSS** — served from `src/main/resources/static/css/`
- **External JS** — served from `src/main/resources/static/js/`
- **`window.onload`** — triggers alert when page finishes loading

## Date & Time Formats Used
| Page | JSTL Pattern         | Example Output        |
|------|----------------------|-----------------------|
| Date | `EEEE, MMM dd, yyyy` | Tuesday, Jan 23, 2024 |
| Time | `h:mm a`             | 6:26 PM               |
