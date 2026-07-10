# Book Club — Line-by-Line Code Explanation

This assignment combines the two chapters: **Login & Registration** (Full Spring) + the **one-to-many relationship** (Adding One-to-Many). Files that are identical to the Login and Registration assignment (LoginUser, UserRepository, UserService) are summarized briefly; everything new gets the full treatment.

---

## 1. `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bookclub
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.mvc.view.prefix=/WEB-INF/
```
Same setup as before, pointing at a `bookclub` schema (create it first!). Hibernate builds both the `users` and `books` tables from our models.

```properties
spring.mvc.hiddenmethod.filter.enabled=true
```
NEW: HTML forms can natively send only GET and POST. This filter lets a form smuggle the *real* verb inside a hidden input named `_method` — Spring reads it and treats the request as PUT or DELETE, which is what our edit and delete routes need (`@PutMapping`, `@DeleteMapping`).

---

## 2. `models/User.java`

Identical to the Login and Registration assignment (validations, `@Transient` confirm, getters/setters), **plus one new field** — the "one" side of the relationship:

```java
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Book> books;
```
Exactly the pattern from the One-to-Many lesson (like Dojo → ninjas):
- `@OneToMany` — one user is related to a *collection* of books, hence `List<Book>`.
- `mappedBy = "user"` — maps this list to the `user` attribute in the `Book` class; the Book side owns the relationship (it holds the foreign key).
- `fetch = FetchType.LAZY` — the books are only fetched when needed.

---

## 3. `models/Book.java`

```java
@Entity
@Table(name = "books")
public class Book {
```
A new JPA entity mapping to the `books` table.

```java
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
```
Auto-incremented primary key.

```java
    @NotEmpty(message = "Title must not be blank!")
    private String title;

    @NotEmpty(message = "Author must not be blank!")
    private String author;

    @NotEmpty(message = "My thoughts must not be blank!")
    private String myThoughts;
```
The assignment's validations: **title, author and thoughts must not be blank** — one `@NotEmpty` each, with the message that `form:errors` will display. ("Author must not be blank" is literally highlighted on the wireframe.)

```java
    @Column(updatable = false)
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    protected void onCreate() { this.createdAt = new Date(); }

    @PreUpdate
    protected void onUpdate() { this.updatedAt = new Date(); }
```
The automatic timestamps, same as the Dojo/Ninja models: `@PrePersist` fills `createdAt` right before the first INSERT, `@PreUpdate` refreshes `updatedAt` before every UPDATE, and `@Column(updatable=false)` protects `createdAt` from ever changing.

```java
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
```
The "many" side: **many books belong to one user** — each book can only be associated with the one user who posted it.
- `@ManyToOne` — a single-valued association back to the User entity.
- `@JoinColumn(name = "user_id")` — defines the foreign key column `user_id` in the `books` table, referencing the `users` table. This attribute gives the user that posted a specific book.

---

## 4. `models/LoginUser.java`, `repositories/UserRepository.java`, `services/UserService.java`

Byte-for-byte the same as the Login and Registration assignment:
- `LoginUser` — no `@Entity`, just email + password validators, discarded after login.
- `UserRepository` — `Optional<User> findByEmail(String email)`; still no repository for LoginUser.
- `UserService` — `register` (email taken? confirm matches? → `rejectValue`; then `BCrypt.hashpw` + save), `login` (`findByEmail` + `isPresent()`; `BCrypt.checkpw`; return user or null), `findUserById`.

See the Login and Registration explanation for the full line-by-line of these three.

---

## 5. `repositories/BookRepository.java`

```java
@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    List<Book> findAll();
}
```
Standard CRUD repository for books, with `findAll()` overridden to return a `List` — used to **display all books from your database** on the Books page.

---

## 6. `services/BookService.java`

```java
@Service
public class BookService {

    @Autowired
    private BookRepository bookRepo;
```
The Book business-logic layer, repository injected with `@Autowired`.

```java
    public List<Book> allBooks() {
        return bookRepo.findAll();
    }
```
All books, for the shelves table.

```java
    public Book createBook(Book book) {
        return bookRepo.save(book);
    }
```
Saves a new book (no id yet → INSERT).

```java
    public Book findBook(Long id) {
        Optional<Book> optionalBook = bookRepo.findById(id);
        if (optionalBook.isPresent()) {
            return optionalBook.get();
        } else {
            return null;
        }
    }
```
The `Optional` + `isPresent()` pattern for fetching one book by id (details page, edit page).

```java
    public Book updateBook(Book book) {
        return bookRepo.save(book);
    }
```
The Potential Data Binding Issues lesson explained this: the repository uses the **same `save` method for both creation and updates** — the determining factor is the presence of an id. Our edit form's book has an id, so `save()` performs an UPDATE.

```java
    public void deleteBook(Long id) {
        bookRepo.deleteById(id);
    }
```
`deleteById` is one of the free CrudRepository methods — used by the Ninja-bonus delete button.

---

## 7. `controllers/HomeController.java`

Same three auth routes as the Login and Registration assignment, with two changes for this assignment:

```java
    @GetMapping("/")
    public String index(Model model, HttpSession session) {
        if (session.getAttribute("userId") != null) {
            return "redirect:/books";
        }
        ...
    }
```
NEW: if someone who is *already* logged in visits `/`, we skip the forms and send them to the Books page — "logged-in users should be redirected to the Books page."

```java
        session.setAttribute("userId", user.getId());
        return "redirect:/books";
```
And after a successful register or login, the destination is now `/books` instead of `/home`. Everything else (double empty objects, re-adding the other form's object on errors, `session.invalidate()` in logout) is unchanged.

---

## 8. `controllers/BookController.java`

```java
@Controller
public class BookController {

    @Autowired
    private BookService bookServ;

    @Autowired
    private UserService userServ;
```
This controller needs BOTH services: books for the CRUD, users to fetch the logged-in user (like the NinjaController needed DojoService).

### GET /books — the shelves

```java
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }
```
Every book route starts with this guard: no `userId` in session → not logged in → back to the login page. This is the same session protection as `/home` in the previous assignment, applied everywhere.

```java
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userServ.findUserById(userId));
        model.addAttribute("books", bookServ.allBooks());
        return "books.jsp";
```
Fetch the logged-in user (for "Welcome, Astrid") and all the books (for the table), hand both to the JSP.

### GET /books/new and POST /books — adding a book

```java
    @GetMapping("/books/new")
    public String newBook(@ModelAttribute("book") Book book, HttpSession session) {
```
The empty `Book` for the form's data binding, plus the login guard.

```java
    @PostMapping("/books")
    public String createBook(@Valid @ModelAttribute("book") Book book,
            BindingResult result, HttpSession session) {
        ...
        if (result.hasErrors()) {
            return "newBook.jsp";
        }
```
`@Valid` runs the three `@NotEmpty` validations; on errors, re-render the form with messages.

```java
        Long userId = (Long) session.getAttribute("userId");
        User user = userServ.findUserById(userId);
        book.setUser(user);

        bookServ.createBook(book);
        return "redirect:/books";
```
**This is where the one-to-many link happens.** The form only sends title/author/thoughts — the poster is whoever is logged in, so we take the ID from session, fetch that User, and attach it with `book.setUser(user)`. When `save()` runs, the book's `user_id` foreign key is filled with the logged-in user's id. Then redirect to the shelves.

### GET /books/{id} — the details page

```java
        model.addAttribute("book", bookServ.findBook(id));
        model.addAttribute("userId", session.getAttribute("userId"));
        return "showBook.jsp";
```
`@PathVariable` grabs the id from the URL (the title links point here: `/books/5`). We pass the book AND the logged-in user's id — the JSP needs that id to decide the Sensei wording ("You read...") and whether to show the Ninja edit/delete controls.

### GET /books/{id}/edit — Change your Entry (NINJA BONUS PAGE)

```java
        Book book = bookServ.findBook(id);

        Long userId = (Long) session.getAttribute("userId");
        if (!book.getUser().getId().equals(userId)) {
            return "redirect:/books";
        }

        model.addAttribute("book", book);
        return "editBook.jsp";
```
Two things:
1. **Ownership guard** — hiding the edit link (in the JSP) isn't enough, because anyone could type `/books/5/edit` in the URL. So the controller checks that the book's poster is the logged-in user; anyone else is bounced to the shelves.
2. **Pre-population** — instead of an empty `Book`, we bind the *existing* book to the form. Data binding then fills every input with the current values ("Be sure to pre-populate with the existing values for the book").

### PUT /books/{id} — saving the edit

```java
    @PutMapping("/books/{id}")
    public String updateBook(@PathVariable("id") Long id,
            @Valid @ModelAttribute("book") Book book,
            BindingResult result, HttpSession session) {
```
The edit form arrives as a PUT (thanks to the hidden `_method` input). Same `@Valid` — "Validations: Same as for create."

```java
        if (result.hasErrors()) {
            return "editBook.jsp";
        }
```
On errors we re-render the edit page — and because the bound `book` object is sent back to the form, the inputs stay populated **"even after a validation"**, exactly as the wireframe requires.

```java
        book.setId(id);
        Long userId = (Long) session.getAttribute("userId");
        book.setUser(userServ.findUserById(userId));

        bookServ.updateBook(book);
        return "redirect:/books";
```
The book built from the form needs two things restored before saving: its **id** (from the path variable — with an id present, `save()` UPDATEs instead of INSERTing) and its **user** (the foreign key isn't part of the form, so we re-attach the poster).

### DELETE /books/{id} (NINJA BONUS)

```java
        Book book = bookServ.findBook(id);
        Long userId = (Long) session.getAttribute("userId");
        if (book.getUser().getId().equals(userId)) {
            bookServ.deleteBook(id);
        }
        return "redirect:/books";
```
Same ownership guard as edit, then delete — "The button should delete the book and redirect to the books page."

---

## 9. `index.jsp`

Same double-form page as the Login and Registration assignment (register bound to `newUser`, login bound to `newLogin`), just with the Book Club heading and "A place for friends to share thoughts on books." from the wireframe.

---

## 10. `books.jsp`

```jsp
<h1>Welcome, <c:out value="${user.userName}" /></h1>
<a href="/logout">logout</a>
```
"Welcome the user with their name" + the logout link from the wireframe.

```jsp
<a href="/books/new">+ Add a book to my shelf!</a>
```
The link to the add-book form.

```jsp
<c:forEach var="oneBook" items="${books}">
    <tr>
        <td><c:out value="${oneBook.id}" /></td>
        <td>
            <a href="/books/${oneBook.id}">
                <c:out value="${oneBook.title}" />
            </a>
        </td>
        <td><c:out value="${oneBook.author}" /></td>
        <td><c:out value="${oneBook.user.userName}" /></td>
    </tr>
</c:forEach>
```
The table includes all books. Two details:
- **"Title of the book is also a link to that book's details"** — the title sits inside an `<a>` pointing to `/books/${oneBook.id}`.
- The Posted By column uses dot notation through the relationship: `oneBook.user.userName` — the book's `@ManyToOne` user, then their name. Same trick as `${person.license.number}` in the case study.

---

## 11. `newBook.jsp`

```jsp
<form:form action="/books" method="post" modelAttribute="book">
```
Bound to the empty `book` object, POSTs to `/books`. Title and Author use `form:input`; thoughts use:

```jsp
<form:textarea path="myThoughts" />
```
`form:textarea` renders a multi-line text box (matching the big "My thoughts" field on the wireframe) — it binds through `path` exactly like `form:input`. Each field has its `form:errors` for the "must not be blank" messages.

---

## 12. `showBook.jsp`

```jsp
<c:choose>
    <c:when test="${book.user.id == userId}">
        ... (You) read ... <p>Here are your thoughts:</p>
    </c:when>
    <c:otherwise>
        <h3><c:out value="${book.user.userName}" /> read
            <c:out value="${book.title}" /> by <c:out value="${book.author}" />.</h3>
        <p>Here are <c:out value="${book.user.userName}" />'s thoughts:</p>
    </c:otherwise>
</c:choose>
```
`c:choose`/`c:when`/`c:otherwise` is JSTL's if/else. The test compares the book's poster id with the logged-in `userId` the controller passed:
- **SENSEI BONUS** (`c:when`): the logged-in user posted it → "You read..." / "Here are your thoughts".
- Otherwise: the wireframe's normal wording — "Bella read Kafka on the Shore by Haruki Murakami. Here are Bella's thoughts:".

```jsp
<c:if test="${book.user.id == userId}">
    <a href="/books/${book.id}/edit">edit</a>

    <form action="/books/${book.id}" method="post">
        <input type="hidden" name="_method" value="delete" />
        <input type="submit" value="delete" />
    </form>
</c:if>
```
**NINJA BONUS**: the edit link and delete button appear *only* if the book entry was posted by the person logged in (`c:if`). The delete "button" is a tiny form: browsers can't send DELETE directly, so it POSTs with the hidden `_method=delete` input, and the hidden-method filter (enabled in application.properties) converts it into a real DELETE that lands on `@DeleteMapping("/books/{id}")`.

---

## 13. `editBook.jsp`

```jsp
<form:form action="/books/${book.id}" method="put" modelAttribute="book">
```
The "Change your Entry" form. Because `modelAttribute="book"` is bound to the *existing* book the controller fetched, **every input comes pre-populated** with the current values. `method="put"` on a Spring `form:form` automatically inserts the hidden `_method` input for us (unlike the plain HTML delete form where we wrote it manually), so the submission reaches `@PutMapping("/books/{id}")`. The fields and `form:errors` mirror the create form — same validations.

---

## The full flow

1. **Auth:** register/login (BCrypt + rejectValue as before) → `userId` in session → `redirect:/books`.
2. **Shelves:** `/books` lists every book; Posted By comes through `book.user.userName`; each title links to `/books/{id}`.
3. **Add:** `/books/new` → POST `/books` → validations → `book.setUser(loggedInUser)` fills the `user_id` foreign key → save → back to shelves.
4. **Details:** `/books/{id}` → Sensei wording if you're the poster; edit/delete controls only for the poster.
5. **Edit (Ninja):** `/books/{id}/edit` (ownership-guarded, pre-populated) → PUT → `book.setId(id)` + re-attach user → `save()` UPDATEs.
6. **Delete (Ninja):** hidden `_method=delete` form → `@DeleteMapping` → ownership check → `deleteById` → back to shelves.
