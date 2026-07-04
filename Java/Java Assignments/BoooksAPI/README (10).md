# Books API — Update & Delete

A Spring Boot MVC assignment implementing full CRUD for a `Book` resource, with `update` (`PUT`) and `delete` (`DELETE`) endpoints backed by Spring Data JPA, plus field validation and automatic timestamp tracking.

## 📚 Overview

This project follows a standard layered Spring MVC architecture:

```
Controller (BooksApi)  →  Service (BookService)  →  Repository (BookRepository)  →  MySQL Database
```

| Layer | Responsibility |
|---|---|
| **Controller** | Handles HTTP requests/responses, maps routes to service calls |
| **Service** | Contains business logic; talks to the repository |
| **Repository** | Interface extending `CrudRepository<Book, Long>` — Spring generates the SQL for us |
| **Model** | `Book` entity, mapped to the `books` table via JPA annotations |

## 🗂 Project Structure

```
src/main/java/com/axsosacademy/mvc/
├── BoooksApiApplication.java
├── controllers/
│   └── BooksApi.java
├── models/
│   └── Book.java
├── repositories/
│   └── BookRepository.java
└── services/
    └── BookService.java
```

## 🧱 The `Book` Entity

`Book.java` maps to a table named **`books`** and includes:

| Field | Type | Rules |
|---|---|---|
| `id` | `Long` | Auto-generated primary key |
| `title` | `String` | Required, 5–200 characters |
| `description` | `String` | Required, 5–200 characters |
| `language` | `String` | Required, 3–40 characters |
| `numberOfPages` | `Integer` | Required, minimum 100 |
| `createdAt` | `Date` | Auto-set on creation, never updated afterward |
| `updatedAt` | `Date` | Auto-set every time the book is updated |

### Automatic timestamps

Two JPA lifecycle hooks stamp the dates automatically — no manual code needed in the service layer:

```java
@PrePersist
protected void onCreate() {
    this.createdAt = new Date();
}

@PreUpdate
protected void onUpdate() {
    this.updatedAt = new Date();
}
```

- `@PrePersist` fires once, right before the very first `INSERT`.
- `@PreUpdate` fires every time an existing row is saved again via `UPDATE`.
- `@Column(updatable = false)` on `createdAt` prevents it from ever being overwritten by a later save.

## 🔑 The Core Concept: `save()` for both Create and Update

Spring Data's `CrudRepository.save(entity)` decides `INSERT` vs `UPDATE` based on whether the entity's `id` is already set:

- **`id` is `null`** → treated as new → `INSERT`
- **`id` already exists in the DB** → treated as existing → `UPDATE`

This is why `updateBook()` in `BookService` **fetches the existing book first**, mutates it with setters, and only then calls `save()`:

```java
public Book updateBook(Long id, String title, String description, String language, Integer numberOfPages) {
    Book book = getBook(id);              // 1. fetch the existing, already-persisted entity
    book.setTitle(title);                 // 2. mutate it with setters
    book.setDescription(description);
    book.setLanguage(language);
    book.setNumberOfPages(numberOfPages);
    return bookRepository.save(book);     // 3. save() -> UPDATE, not INSERT
}
```

Skipping step 1 (building a `new Book()` instead) would leave `id` as `null`, and `save()` would insert a duplicate row instead of updating the original — exactly the bug this assignment asks you to test against.

## 🗑 Deleting a Book

`CrudRepository` provides `deleteById(id)` and `existsById(id)` for free:

```java
public void deleteBook(Long id) {
    boolean exists = bookRepository.existsById(id);
    if (exists) {
        bookRepository.deleteById(id);
    }
}
```

We check existence first so the method doesn't attempt to delete a row that isn't there.

## 🌐 Endpoints

| Method | URL | Params | Description |
|---|---|---|---|
| `GET` | `/api/books/{id}` | — | Get one book |
| `POST` | `/api/books` | `title, description, language, pages` | Create a book |
| `PUT` | `/api/books/{id}` | `title, description, language, pages` | **Update** a book |
| `DELETE` | `/api/books/{id}` | — | **Delete** a book |

> Note: the form field is named `pages` in requests, mapped internally to the `numberOfPages` field on the entity.

## ⚙️ Setup

**1. Create the database** in MySQL Workbench:

```sql
CREATE DATABASE books_api_db;
```

**2. Configure `application.properties`:**

```properties
spring.application.name=BoooksAPI

spring.datasource.url=jdbc:mysql://localhost:3306/books_api_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**3. Required Maven dependencies** (in addition to `spring-boot-starter-data-jpa`, `spring-boot-starter-webmvc`, and `mysql-connector-j`):

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

This provides `@NotNull`, `@Size`, and `@Min` for entity field validation.

**4. Run the app.** Hibernate will auto-create the `books` table matching the `Book` entity.

## 🧪 Testing with Postman

### 1. Create a book
- Method: `POST`
- URL: `http://localhost:8080/api/books`
- Body → `x-www-form-urlencoded`: `title`, `description`, `language`, `pages`
- **Verify:** response includes a generated `id` and a filled-in `createdAt`, with `updatedAt` as `null`.

### 2. Update a book
- Method: `PUT`
- URL: `http://localhost:8080/api/books/1`
- Body → `x-www-form-urlencoded`: same fields, new values
- **Verify:** `GET /api/books/1` afterward shows the new values, the same `id`, and `updatedAt` now filled in — confirming it updated in place rather than creating a duplicate.

### 3. Delete a book
- Method: `DELETE`
- URL: `http://localhost:8080/api/books/1`
- **Verify:** `GET /api/books/1` afterward returns a not-found/error response, confirming the correct book was removed.

## ✅ Assignment Checklist

- [x] Implement `updateBook` in `BookService` using setters + `save()`
- [x] Implement `deleteBook` in `BookService` using `deleteById()`
- [x] Wire both into `BooksApi` controller (`PUT` and `DELETE` routes)
- [x] Add `@NotNull`/`@Size`/`@Min` validation to entity fields
- [x] Add automatic `createdAt`/`updatedAt` timestamps via `@PrePersist`/`@PreUpdate`
- [x] Test update does not create a duplicate row
- [x] Test delete removes the correct row

## 📖 Reference

- [Spring Data `CrudRepository` docs](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html)

---

**Author:** Chaker Ibrahim
