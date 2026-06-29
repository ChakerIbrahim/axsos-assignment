# Fruits Loops - Spring MVC Assignment

## Description
A Spring Boot MVC web application that dynamically renders a list of fruits and their prices using JSTL `c:forEach` tags and Object-Oriented Programming concepts.

## Technologies Used
- Java 17
- Spring Boot 3.2.0
- Spring MVC
- JSTL (Jakarta)
- JSP
- CSS

## Project Structure
```
FruitsLoops/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/axsos/fruitsloops/
│       │       ├── controllers/
│       │       │   └── ItemController.java
│       │       ├── models/
│       │       │   └── Item.java
│       │       └── FruitsLoopsApplication.java
│       ├── resources/
│       │   └── application.properties
│       └── webapp/
│           └── WEB-INF/
│               └── views/
│                   └── index.jsp
└── pom.xml
```

## How It Works
1. The `Item` model class holds `name` and `price` as member variables with a constructor, getters and setters.
2. The `ItemController` creates an `ArrayList` of `Item` objects and passes them to the view via the Spring `Model`.
3. The JSP view uses `c:forEach` to loop through the list and render each fruit in an HTML table.

## Setup & Run
1. Clone or download the project
2. Open in Eclipse (Spring Tools Suite recommended)
3. Make sure dependencies are resolved via Maven
4. Run as **Spring Boot App**
5. Visit `http://localhost:8080` in your browser

## Dependencies
- `spring-boot-starter-web`
- `spring-boot-starter-tomcat` (provided)
- `tomcat-embed-jasper` (provided)
- `jakarta.servlet.jsp.jstl-api`
- `org.glassfish.web:jakarta.servlet.jsp.jstl`
- `spring-boot-starter-test` (test)

## Features
- Displays a Fruit Store catalog with fruit names and prices
- Data is dynamically rendered from the controller using JSTL
- Custom CSS styling matching the wireframe
