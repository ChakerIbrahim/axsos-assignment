# 🍔 Burger Tracker

A Spring MVC app for tracking burger experiences — the burger name, restaurant,
rating, and any notes. Built for the Axsos Academy "Burger Tracker" assignments
(Part I: create + list, Part II: edit + update).

## Features

- View every burger you've logged in a table
- Add a new burger through a form
- **Edit an existing burger** via an "edit" link on each row
- Server-side validation on both create and edit: no blank fields, rating
  must be between 1 and 4
- Invalid submissions re-render the same form with inline error messages and
  keep the user's entered data, on both the add form and the edit form
- Data is persisted to MySQL via Spring Data (`CrudRepository`)

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
│   │   └── BurgerService.java          # findAll, findById, save
│   └── controller/
│       └── BurgerController.java       # GET /, POST /burgers,
│                                        # GET & POST /burgers/edit/{id}
└── src/main/
    ├── resources/
    │   └── application.properties      # DB connection + JSP view resolver
    └── webapp/WEB-INF/views/
        ├── index.jsp                   # table (with edit links) + add form
        └── edit.jsp                    # edit form, pre-filled per burger
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

## Routes

| Method | Path                  | Purpose                                      |
|--------|------------------------|-----------------------------------------------|
| GET    | `/`                    | Show the table of burgers + the "add" form    |
| POST   | `/burgers`             | Create a new burger, validate, redirect to `/`|
| GET    | `/burgers/edit/{id}`   | Show the edit form pre-filled for that burger |
| POST   | `/burgers/edit/{id}`   | Validate and save the update, redirect to `/` |

*(Per the assignment note, using `POST` — instead of `PUT`/`PATCH` — for the
update is intentionally fine here.)*

## How the code fits together

### 1. `Burger.java` — the model

`@Entity`, mapped to a `burger` table. Validation annotations:
- `@NotBlank` on `burgerName`, `restaurantName`, `notes`
- `@NotNull` + `@Min(1)` + `@Max(4)` on `rating` ("greater than 0 and less
  than 5" → valid values are 1–4)

### 2. `BurgerRepository.java` — the data layer

`CrudRepository<Burger, Long>` gives us `findAll()`, `findById()`, `save()`
for free. `findById(id)` returns `Optional<Burger>`, since the id might not
exist.

### 3. `BurgerService.java` — the service layer

- `findAll()` — converts the `Iterable<Burger>` from `CrudRepository` into a
  `List<Burger>` for the JSP/controller to use.
- `findById(id)` — forwards straight to the repository; controller decides
  what to do if the result is empty.
- `save(burger)` — used for **both** create and update. If `burger.getId()`
  is `null`, Hibernate does an `INSERT`; if it's already set to an existing
  row's id, Hibernate does an `UPDATE`. No separate "update" method is
  needed at this layer.

### 4. `BurgerController.java` — the controller

- **`GET /`** — puts an empty `Burger` in the model (for the add form) and
  the full list (for the table).
- **`POST /burgers`** — validates and creates a new burger. On error,
  re-renders `index.jsp` with the invalid input and error messages still
  showing.
- **`GET /burgers/edit/{id}`** — looks up the burger by id. If found, puts it
  in the model and renders `edit.jsp`, which comes pre-filled with its
  current values. If not found, redirects back to `/`.
- **`POST /burgers/edit/{id}`** — rebuilds the `Burger` from the submitted
  form, forces its id to match the URL's `{id}` (so the hidden form field
  can't be tampered with to update a different row), validates it, and
  either re-renders `edit.jsp` with errors or saves and redirects to `/`.

### 5. `index.jsp` — the dashboard view

Same table + add form as before, plus a new **Action** column:
```jsp
<td><a class="edit-link" href="/burgers/edit/${b.id}">edit</a></td>
```
Each row's link points at that specific burger's id.

### 6. `edit.jsp` — the edit view (new)

- `<form:form method="POST" modelAttribute="burger">` with no `action`
  attribute — it posts back to whatever URL is currently loaded
  (`/burgers/edit/{id}`), so the JSP doesn't need to know the id itself.
- `<form:hidden path="id"/>` keeps the burger's id flowing through the form
  along with the rest of its fields.
- Same `form:input` / `form:errors` / `form:textarea` bindings as the add
  form, but pre-filled with the burger's existing data instead of blank
  fields.

### 7. `application.properties`

Unchanged from Part I — MySQL connection, `ddl-auto=update` so Hibernate
keeps the schema in sync automatically, and the JSP view resolver
(`prefix`/`suffix`) that turns `"index"`/`"edit"` into actual `.jsp` files.

## Testing it manually

1. Start the app, go to `/` — you should see the table (with an Action
   column) and the add form.
2. Add a burger, confirm it shows up with an "edit" link.
3. Click "edit" — confirm the edit form loads pre-filled with that burger's
   exact data.
4. Clear a required field (or set an invalid rating) and submit — confirm
   the edit page reloads with an error message and your other input intact.
5. Fix the field and resubmit — confirm you're redirected to `/` and the
   table shows the updated values.
6. Check MySQL Workbench — the same row (same id) should now show the new
   values, not a duplicate row.

## Task list (fill in as you go)

- [ ] Add the Action column and edit links to `index.jsp`
- [ ] Create `edit.jsp`
- [ ] Add `findById()` to the service
- [ ] Add the `GET /burgers/edit/{id}` route
- [ ] Add the `POST /burgers/edit/{id}` route
- [ ] Test validation errors on the edit form
- [ ] Test a full successful edit end-to-end
- [ ] Pair with another student at some point during this assignment

- *(example)* Forgot to set `burger.setId(id)` before saving in the POST
  route — updates were silently inserting new rows instead of updating the
  existing one.
