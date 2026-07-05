# Rendering All Books — JSTL Loop & Linking Assignment

Extends the Books API + Rendering Books project with a new `/books` route that lists every book in an HTML table, with each title linking through to that book's individual detail page (Ninja Bonus).

## 📚 Overview

The project now has three layers of book presentation, all sharing the same `BookService`/`BookRepository`:

| Route | Method | Controller | Returns |
|---|---|---|---|
| `/api/books/**` | REST endpoints | `BooksApi` | JSON |
| `/books/{id}` | `GET` | `BookController.show()` | HTML — one book's details |
| `/books` | `GET` | `BookController.index()` | HTML — table of every book |

No new dependencies, `pom.xml` changes, or `application.properties` changes are required — this reuses everything set up in the previous two assignments.

## 🗂 Project Structure (additions)

```
src/main/webapp/WEB-INF/
├── show.jsp              (existing — single book view)
└── books/
    └── index.jsp          (new — all books table)
```

## 🧩 `BookController.java` — new method

```java
@GetMapping("/books")
public String index(Model model) {
    List<Book> books = bookService.getAllBooks();
    model.addAttribute("books", books);
    return "books/index";
}
```

- Calls the existing `bookService.getAllBooks()` — no new service logic needed.
- Adds the full list to the model under the key `"books"`.
- Returns the view name `"books/index"`, which (combined with the project's `spring.mvc.view.prefix`/`suffix` settings) resolves to `/WEB-INF/books/index.jsp`.

## 🖥 `books/index.jsp`

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <title>All Books</title>
</head>
<body>
<h1>All Books</h1>
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Language</th>
            <th># Pages</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach items="${books}" var="book">
            <tr>
                <td><c:out value="${book.id}" /></td>
                <td>
                    <a href="<c:url value="/books/${book.id}" />">
                        <c:out value="${book.title}" />
                    </a>
                </td>
                <td><c:out value="${book.language}" /></td>
                <td><c:out value="${book.numberOfPages}" /></td>
            </tr>
        </c:forEach>
    </tbody>
</table>
</body>
</html>
```

### How the loop works

- `<c:forEach items="${books}" var="book">` iterates over the `books` list from the model, exposing each element as `book` inside the loop body — JSTL's equivalent of a Java `for` loop.
- Everything between `<c:forEach>` and `</c:forEach>` renders once per book, producing one `<tr>` per row.
- `${book.id}`, `${book.title}`, `${book.language}`, `${book.numberOfPages}` are EL expressions calling the matching getters on each `Book` object.

### The Ninja Bonus — linking each title

```jsp
<a href="<c:url value="/books/${book.id}" />">
    <c:out value="${book.title}" />
</a>
```

- `<c:url value="/books/${book.id}" />` dynamically builds a link like `/books/2` for each row, using that specific book's real id.
- Clicking the title navigates to `BookController.show()`, which renders that one book's full details — connecting the two views built across this assignment and the previous one.

## 🌐 How to test

1. Ensure at least a few books exist in the database (create some via `POST /api/books` in Postman if needed).
2. Start the application.
3. In a browser, go to:
   ```
   http://localhost:8080/books
   ```
4. Confirm every book appears as a row with its id, title, language, and page count.
5. Click any title and confirm it navigates to `/books/{id}` and shows that book's individual detail page.

## ✅ Assignment Checklist

- [x] Added `/books` route in `BookController` that fetches all books via the service
- [x] Passed the book list into the view model
- [x] Built `books/index.jsp` with a JSTL `<c:forEach>` loop rendering each row
- [x] Displayed ID, Title, Language, and Number of Pages per row
- [x] **Bonus:** made each title a link to that book's detail page

---

**Author:** Chaker Ibrahim
