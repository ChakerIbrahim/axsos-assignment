# Rendering Books — JSP View Assignment

Extends the Books API project with a second, browser-facing controller that renders a book's details as an HTML page using JSP and JSTL, instead of returning JSON.

## 📚 Overview

This project now has **two parallel controllers** serving the same underlying data in different formats:

| Controller | Annotation | Returns | Consumed by |
|---|---|---|---|
| `BooksApi` | `@RestController` | JSON | Postman / API clients |
| `BookController` | `@Controller` | Rendered HTML (JSP) | Web browsers |

Both share the exact same `BookService` and `BookRepository` — no duplicated data-access logic. Only the presentation layer differs.

## 🗂 Project Structure (additions)

```
src/main/java/com/axsosacademy/mvc/
└── controllers/
    ├── BooksApi.java          (existing REST controller)
    └── BookController.java    (new — this assignment)

src/main/webapp/
└── WEB-INF/
    └── show.jsp                (new — this assignment)
```

## ⚙️ Setup

### 1. Add JSP/JSTL dependencies to `pom.xml`

```xml
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
<dependency>
    <groupId>jakarta.servlet.jsp.jstl</groupId>
    <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
</dependency>
<dependency>
    <groupId>org.glassfish.web</groupId>
    <artifactId>jakarta.servlet.jsp.jstl</artifactId>
</dependency>
```

- `tomcat-embed-jasper` — the JSP compiler/engine for embedded Tomcat.
- `jakarta.servlet.jsp.jstl-api` + `org.glassfish.web:jakarta.servlet.jsp.jstl` — the JSTL tag library interface and implementation, needed for `<c:out>`, `<c:forEach>`, etc.

### 2. Configure the view resolver in `application.properties`

```properties
spring.mvc.view.prefix=/WEB-INF/
spring.mvc.view.suffix=.jsp
```

This tells Spring MVC: whenever a controller method returns a plain String like `"show"`, resolve it to the file `/WEB-INF/show.jsp`.

## 🧩 `BookController.java`

```java
package com.axsosacademy.mvc.controllers;

import com.axsosacademy.mvc.models.Book;
import com.axsosacademy.mvc.services.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books/{id}")
    public String show(@PathVariable("id") Long id, Model model) {
        Book book = bookService.getBook(id);
        model.addAttribute("book", book);
        return "show";
    }
}
```

**Key difference from `BooksApi`:** this uses `@Controller` (not `@RestController`), and its method returns a `String` — the *logical view name* — rather than the data itself. The actual data is placed into the `Model` object, which the JSP can then read.

## 🖥 `show.jsp`

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <title>Book Details</title>
</head>
<body>
    <h1><c:out value="${book.title}" /></h1>

    <p><strong>Description:</strong> <c:out value="${book.description}" /></p>
    <p><strong>Language:</strong> <c:out value="${book.language}" /></p>
    <p><strong>Number of Pages:</strong> <c:out value="${book.numberOfPages}" /></p>
</body>
</html>
```

- `${book.title}` is **EL (Expression Language)** — it automatically calls `book.getTitle()` behind the scenes.
- `<c:out>` safely prints the value as escaped text, preventing broken HTML or injection issues if a field ever contained special characters.
- `book` in `${book.title}` refers to the exact attribute name used in `model.addAttribute("book", book)` back in the controller — the names must match.

## 🌐 How to test

1. Make sure at least one book exists in the database (create one via Postman if needed, or check existing ids with `SELECT * FROM books;` in MySQL Workbench).
2. Start the application.
3. In a **web browser**, navigate to:
   ```
   http://localhost:8080/books/{id}
   ```
   replacing `{id}` with a real book id.
4. You should see a plain HTML page displaying that book's title, description, language, and page count.

## ✅ Assignment Checklist

- [x] Created a second controller, `BookController`, using `@Controller`
- [x] Created `show.jsp` inside `src/main/webapp/WEB-INF/`
- [x] Added JSP/JSTL dependencies and view resolver configuration
- [x] Added a route for `/books/{id}` where the id is a path variable
- [x] Rendered the JSP with the book's information populated from the database

---

**Author:** Chaker Ibrahim
