# Hello Human — Spring Boot Assignment

## Overview

A Spring Boot web application that greets visitors by name using URL query parameters. If no name is provided, it defaults to "Human". Includes bonus features for last name and repeated greetings.

---

## Project Structure

```
src/main/java/com/hellohuman/
└── MainController.java     # Handles all requests
```

---

## How to Run

1. Create a new Spring Boot project (Maven, packaging: jar)
2. Add `spring-boot-starter-web` dependency in `pom.xml`
3. Create `MainController.java` with the code below
4. Run the app and visit `localhost:8080`

---

## The Code

### MainController.java

```java
package com.hellohuman;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    @RequestMapping("/")
    @ResponseBody
    public String hello(
        @RequestParam(defaultValue = "Human") String name,
        @RequestParam(defaultValue = "") String last_name,
        @RequestParam(defaultValue = "1") int times
    ) {
        String greeting = "Hello " + name;

        if (!last_name.equals("")) {
            greeting = "Hello " + name + " " + last_name;
        }

        String result = "";
        for (int i = 0; i < times; i++) {
            result += greeting + " ";
        }

        return result.trim();
    }
}
```

---

## Step-by-Step Explanation

### Step 1 — @Controller
```java
@Controller
public class MainController {
```
Tells Spring Boot this class handles HTTP requests. Without this annotation, Spring ignores the class entirely.

---

### Step 2 — @RequestMapping("/")
```java
@RequestMapping("/")
```
Maps the method to the root URL `localhost:8080/`. When a user visits this URL, this method runs.

---

### Step 3 — @ResponseBody
```java
@ResponseBody
```
Tells Spring to send the return value directly to the browser as plain text. Without it, Spring would look for a JSP view file to render instead.

---

### Step 4 — @RequestParam
```java
@RequestParam(defaultValue = "Human") String name
@RequestParam(defaultValue = "") String last_name
@RequestParam(defaultValue = "1") int times
```
Reads values from the URL query string:
- `?name=Khoa` → name = "Khoa"
- `?last_name=Le` → last_name = "Le"
- `?times=3` → times = 3

`defaultValue` means: if the parameter is not in the URL, use this value instead.

---

### Step 5 — Building the greeting
```java
String greeting = "Hello " + name;

if (!last_name.equals("")) {
    greeting = "Hello " + name + " " + last_name;
}
```
- Starts with a basic "Hello [name]" greeting
- If a last name was provided (not empty string), adds it to the greeting
- `!last_name.equals("")` means "last_name is NOT empty"

---

### Step 6 — Repeating the greeting (Sensei Bonus)
```java
String result = "";
for (int i = 0; i < times; i++) {
    result += greeting + " ";
}
return result.trim();
```
- Loops `times` number of times
- Adds the greeting to the result each iteration
- `.trim()` removes the trailing space at the end

---

## URL Examples

| URL | Output |
|-----|--------|
| `localhost:8080/` | `Hello Human` |
| `localhost:8080/?name=Khoa` | `Hello Khoa` |
| `localhost:8080/?name=Khoa&last_name=Le` | `Hello Khoa Le` |
| `localhost:8080/?name=Khoa&times=3` | `Hello Khoa Hello Khoa Hello Khoa` |
| `localhost:8080/?name=Khoa&last_name=Le&times=2` | `Hello Khoa Le Hello Khoa Le` |

---

## Key Concepts Used

| Concept | Annotation | What it does |
|---------|-----------|--------------|
| Mark as controller | `@Controller` | Tells Spring this class handles requests |
| Map URL to method | `@RequestMapping("/")` | Runs this method when "/" is visited |
| Return plain text | `@ResponseBody` | Sends return value directly to browser |
| Read URL parameters | `@RequestParam` | Reads `?name=value` from URL |
| Default values | `defaultValue="Human"` | Used when parameter is missing from URL |

---

## Bonuses Implemented

### Ninja Bonus 1 — Last Name
```
localhost:8080/?name=Khoa&last_name=Le
→ Hello Khoa Le
```

### Ninja Bonus 2 (Sensei Bonus) — Times
```
localhost:8080/?name=Khoa&times=3
→ Hello Khoa Hello Khoa Hello Khoa
```

---

## Author
Chaker
AXSOS Academy — Java Spring Stack
