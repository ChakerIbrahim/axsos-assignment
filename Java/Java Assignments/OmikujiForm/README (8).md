# 🔮 Omikuji Form

A Spring Boot + JSP web app built for the **Axsos Academy Java Stack** curriculum (Java Spring → Routes assignment).

Omikuji are fortunes written on small strips of paper and drawn at random. This app lets you "draw" a personalized omikuji for a friend by answering a few quick questions about them — the answers get woven into a fortune and shown back on the next page.

## How it works

1. Visit **`/omikuji`** and fill out the form: a number (5–25), a city, a real person's name, a hobby, a living thing, and a nice message.
2. Hit **Send** — this `POST`s the form to `/omikuji`, where the server stores your answers in the **HTTP session** and redirects to `/omikuji/show`.
3. **`/omikuji/show`** reads those values straight out of the session and renders them into a fortune template, e.g.:

   > In **10** years, you will live in **Nairobi** with **Bob Dylan** as your roommate, **selling origami** for a living. The next time you see a **ferret**, you will have good luck. Also, **you do not realize how happy you make others.**

4. Click **Go Back** to send another one.

Storing the data in the session (instead of just passing it as query params) means the fortune page can be reloaded without losing the data, and it keeps the form values out of the URL.

## Routes

| Method | Path            | Purpose                                                                |
|--------|-----------------|-------------------------------------------------------------------------|
| GET    | `/omikuji`      | Renders the home page with the Omikuji form                            |
| POST   | `/omikuji`      | Reads the submitted form fields, stores them in the session, redirects to `/omikuji/show` |
| GET    | `/omikuji/show` | Renders the fortune page, pulling the saved answers out of the session  |

## Tech stack

- **Java 17**
- **Spring Boot 3** (Spring MVC)
- **JSP + JSTL** for server-rendered views (`/WEB-INF`)
- **HttpSession** for temporary storage between the `POST` and the `show` page
- Maven, packaged as a **WAR** (required for embedded JSP support)

## Project structure

```
OmikujiForm/
├── pom.xml
└── src/main/
    ├── java/com/axsos/OmikujiForm/
    │   └── OmikujiController.java      # The 3 routes described above
    ├── resources/
    │   └── application.properties      # JSP view resolver config
    └── webapp/WEB-INF/
        ├── omikuji.jsp                 # The form
        └── show.jsp                    # The rendered fortune
```

## application.properties

```properties
spring.application.name=OmikujiForm
spring.mvc.view.prefix=/WEB-INF/
spring.mvc.view.suffix=.jsp
server.port=8080
```

> **Watch the trailing slash on `spring.mvc.view.prefix`.** Spring just concatenates `prefix + viewName + suffix`. Without the slash, a return value of `"omikuji"` resolves to `/WEB-INFomikuji.jsp` instead of `/WEB-INF/omikuji.jsp`, which 404s.

## Running it locally

```bash
git clone <this-repo-url>
cd OmikujiForm
mvn spring-boot:run
```

Then open **http://localhost:8080/omikuji** in your browser.

## Why JSP + WAR packaging?

Spring Boot's embedded servers don't support JSP out of the box with the default `jar` packaging — you need:
- `packaging` set to `war` in `pom.xml`
- `spring-boot-starter-tomcat` and `tomcat-embed-jasper` on the classpath (`provided` scope)
- `spring.mvc.view.prefix` / `spring.mvc.view.suffix` set in `application.properties` so Spring knows where to find the `.jsp` files

## Notes on the JSP views

- JSTL (`jakarta.servlet.jsp.jstl-api` + `glassfish` impl) is on the classpath so the views can use `<c:...>` tags if needed, though these particular pages mostly rely on plain EL (`${...}`) to read session attributes directly — Spring/JSP automatically exposes session attributes to EL by name, no extra `Model` wiring required.
- The controller's `showFortune()` return value must exactly match the JSP filename (minus `.jsp`) — e.g. if the file is `show.jsp`, the method must `return "show";`, not `"omikuji-show"`.
