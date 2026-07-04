# ⚔️ Ninja Gold Game

A Spring Boot + JSP mini-game built for the **Axsos Academy Java Stack** curriculum (Java Spring → Ninja Gold Game assignment).

Your ninja starts with 0 gold. Send them to a farm, a cave, or a house for a guaranteed (small) payout, or send them on a quest, where they might earn up to 50 gold... or lose up to 50. Every trip is logged with a timestamp so you can see the ninja's full history.

## How it works

- The page shows the ninja's current gold total and 4 buttons: **Farm**, **Cave**, **House**, **Quest**.
- Each button lives inside its own `<form>`, but all 4 forms `POST` to the **same** URL (`/ninja-gold`). A hidden input (`name="place"`) tells the server which location was clicked — this is the "use hidden inputs to differentiate the forms" hint from the assignment.
- The server calculates a random gold change for that location, adds it to the ninja's running total (stored in the session), logs a timestamped message, and redirects back to the game page.
- Only **2 controller methods** are used in total: one `GET` to display the game, one `POST` that all 4 forms share.

## Gold ranges

| Location | Gold change            |
|----------|-------------------------|
| Farm     | +10 to +20 (guaranteed) |
| Cave     | +5 to +10 (guaranteed)  |
| House    | +2 to +5 (guaranteed)   |
| Quest    | -50 to +50 (risky!)     |

## Routes

| Method | Path          | Purpose                                                              |
|--------|---------------|-----------------------------------------------------------------------|
| GET    | `/ninja-gold` | Renders the game page with the current gold total and activity log   |
| POST   | `/ninja-gold` | Shared handler for all 4 location forms; updates gold + log, redirects back to `/ninja-gold` |

## Tech stack

- **Java 17**
- **Spring Boot 3** (Spring MVC)
- **JSP + core JSTL** (`<c:forEach>`) for the view — plain HTML, no CSS
- **HttpSession** to persist gold total and activity log between requests
- Maven, packaged as a **WAR** (required for embedded JSP support)

## Project structure

```
NinjaGoldGame/
├── pom.xml
└── src/main/
    ├── java/com/axsos/NinjaGoldGame/
    │   ├── NinjaGoldGameApplication.java
    │   └── NinjaGoldController.java     # The 2 routes described above
    ├── resources/
    │   └── application.properties       # JSP view resolver config
    └── webapp/WEB-INF/
        └── ninja-gold.jsp               # The game page
```

## application.properties

```properties
spring.application.name=NinjaGoldGame
spring.mvc.view.prefix=/WEB-INF/
spring.mvc.view.suffix=.jsp
server.port=8080
```

> Note the trailing slash on `spring.mvc.view.prefix` — without it, Spring resolves `"ninja-gold"` to `/WEB-INFninja-gold.jsp` instead of `/WEB-INF/ninja-gold.jsp` and you'll get a 404.

## How a single click flows through the app

1. You click **Find Gold!** on, say, the Cave form.
2. The browser sends a `POST /ninja-gold` request with `place=cave` (from the form's hidden input).
3. `findGold()` in the controller reads `place`, rolls a random number between 5 and 10, and builds a timestamped message.
4. That message is added to the **front** of the activity list (so newest is always on top), and the roll is added to the gold total.
5. Both values are saved back into the `HttpSession`.
6. The controller returns `"redirect:/ninja-gold"`, which tells the browser to make a brand new `GET /ninja-gold` request.
7. `showGame()` runs, reads the (now updated) gold and activity list out of the session, and hands them to the JSP.
8. The JSP prints the new gold total and loops over the activity list with `<c:forEach>`, showing your cave visit at the top.

This `POST → redirect → GET` pattern (Post/Redirect/Get) is why refreshing the page never resubmits a form by accident, and why the gold total survives between requests instead of resetting.

## Design notes

- **Random ranges are inclusive on both ends.** `low + random.nextInt(high - low + 1)` is used so, for example, the farm can genuinely roll a 10 *or* a 20, not just 10–19.
- **The quest** uses `random.nextInt(101) - 50`, producing a uniformly random integer from -50 to +50.
- **Activity log entries are inserted at the front of the list** (`activities.add(0, message)`) so the most recent trip always appears at the top, matching the wireframe's ordering (newest timestamp first).
- **Timestamps** are formatted with `DateTimeFormatter.ofPattern("MMMM d, yyyy h:mm a")` (e.g. `July 2, 2026 1:05 AM`). This is a close match to the wireframe's style but skips the ordinal suffix ("3rd", "4th") since Java's built-in formatter doesn't support that pattern natively.

## Running it locally

```bash
git clone <this-repo-url>
cd NinjaGoldGame
mvn spring-boot:run
```

Then open **http://localhost:8080/ninja-gold** in your browser.

---

Built by **Chaker Ibrahim**
