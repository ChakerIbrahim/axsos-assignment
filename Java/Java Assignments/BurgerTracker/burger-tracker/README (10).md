# 🍔 Burger Tracker

A Spring MVC app for tracking burger experiences — the burger name, restaurant,
rating, and any notes. Built for the Axsos Academy "Burger Tracker 1" assignment.

## Features

- View every burger you've logged in a table
- Add a new burger through a form
- Server-side validation: no blank fields, rating must be between 1 and 4
- Invalid submissions re-render the form with inline error messages and keep
  your previously entered data
- Data is persisted to MySQL via Spring Data (CrudRepository)

## Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Language     | Java 11                              |
| Framework    | Spring Boot 2.7 / Spring MVC          |
| Views        | JSP + JSTL + Spring `<form:*>` tags   |
| Persistence  | Spring Data JPA (`CrudRepository`)    |
| Database     | MySQL                                |
| Build tool   | Maven                                |

## Project Structure

```
burger-tracker/
├── pom.xml
├── src/main/java/com/axsos/burgertracker/
│   ├── BurgerTrackerApplication.java   # main() entry point
│   ├── model/
│   │   └── Burger.java                 # @Entity + validation annotations
│   ├── repository/
│   │   └── BurgerRepository.java       # CrudRepository interface
│   ├── service/
│   │   └── BurgerService.java          # business logic between controller & repo
│   └── controller/
│       └── BurgerController.java       # GET / and POST /burgers routes
└── src/main/
    ├── resources/
    │   └── application.properties      # DB connection + JSP view resolver
    └── webapp/WEB-INF/views/
        └── index.jsp                   # table + add-burger form
```

## Setup

1. **Create the database** (or let the app do it — the datasource URL includes
   `createDatabaseIfNotExist=true`):
   ```sql
   CREATE DATABASE burger_tracker;
   ```
2. **Update credentials** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. **Run it**:
   ```bash
   mvn spring-boot:run
   ```
4. Visit **http://localhost:8080/**

## How the code fits together

### 1. `Burger.java` — the model

Marked `@Entity` so Hibernate maps it to a `burger` table. Each field has a
bean-validation annotation:

- `@NotBlank` on `burgerName`, `restaurantName`, and `notes` — rejects `null`
  **and** empty/whitespace-only strings ("no fields should be left blank").
- `@NotNull` + `@Min(1)` + `@Max(4)` on `rating` — enforces "greater than 0 and
  less than 5", i.e. only 1, 2, 3, or 4 are valid.

### 2. `BurgerRepository.java` — the data layer

An interface extending `CrudRepository<Burger, Long>`. You get `findAll()`,
`save()`, `findById()`, etc. for free — no SQL to write. Note:
`CrudRepository.findAll()` returns `Iterable<Burger>`, not `List<Burger>` —
that's handled in the service layer below.

### 3. `BurgerService.java` — the service layer

Sits between the controller and the repository.

- `save()` just forwards to the repository.
- `findAll()` converts the `Iterable<Burger>` returned by `CrudRepository`
  into a proper `List<Burger>`, since the rest of the app (the controller,
  and the JSP's `<c:forEach>`) works with a `List`:
  ```java
  public List<Burger> findAll() {
      List<Burger> burgers = new ArrayList<>();
      burgerRepository.findAll().forEach(burgers::add);
      return burgers;
  }
  ```

### 4. `BurgerController.java` — the controller

Two routes:

- **`GET /`** — the "render" route. Puts an empty `Burger` in the model under
  `"burger"` (so the JSP form has something to bind to) and the full burger
  list under `"burgers"` (so the table can render).
- **`POST /burgers`** — the "create" route. `@Valid` triggers the validation
  annotations on `Burger`; `BindingResult` (which must come immediately after
  the `@Valid` argument) catches any errors instead of throwing an exception.
  - If validation fails: reload the `burgers` list and re-render `index.jsp`.
    The partially-filled `burger` is still in the model automatically, so the
    user doesn't lose what they typed.
  - If validation passes: save, then `redirect:/` (Post/Redirect/Get pattern
    — stops the form from resubmitting on refresh).

### 5. `index.jsp` — the view

- `<c:forEach var="b" items="${burgers}">` loops over the burger list and
  builds one table row per burger.
- `<form:form modelAttribute="burger" action="/burgers" method="POST">` binds
  each input to a field on the `burger` model attribute.
- `<form:input path="burgerName"/>` pre-fills from `burger.getBurgerName()`,
  so failed validation doesn't wipe out what the user entered.
- `<form:errors path="burgerName" cssClass="error"/>` prints the message from
  the matching `@NotBlank`/`@Min`/`@Max` annotation, only if that field failed.

### 6. `application.properties`

- `spring.datasource.*` — MySQL connection.
- `spring.jpa.hibernate.ddl-auto=update` — Hibernate creates/updates the
  `burger` table automatically based on the `Burger` entity.
- `spring.mvc.view.prefix` / `suffix` — tells Spring MVC that `"index"` means
  `/WEB-INF/views/index.jsp`.

## Testing it manually

1. Start the app, go to `/` — you should see an empty table and the form.
2. Submit the form with a blank field, or a rating of `0` or `5` — the page
   should reload with red error text under the offending field(s), and the
   fields you *did* fill in should still show your input.
3. Submit a fully valid burger — you should be redirected to `/` and see your
   new burger in the table.
4. Check MySQL Workbench — a `burger` table should exist in `burger_tracker`
   with your row in it.
