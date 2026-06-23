# 🤖 Alfred Bot

A Java assignment from the Axsos Academy Java Stack bootcamp. Alfred is Bruce Wayne's devoted butler — this project builds an automated version of him as a `AlfredQuotes` class that can greet guests, announce the date, and respond to conversations before Alexis can.

---

## 📁 Project Structure

```
alfredBot/
└── src/
    └── com/
        └── axsosacademy/
            └── alfredbot/
                ├── AlfredQuotes.java   # Main class with all Alfred's functionality
                └── AlfredTest.java     # Test file to run and verify the methods
```

---

## 🛠️ Methods Implemented

### `basicGreeting()`
Returns a basic greeting string.
```
"Hello, lovely to see you. How are you?"
```

### `guestGreeting(String name)`
Returns a personalised greeting that includes the guest's name.
```
Input:  "Beth Kane"
Output: "Hello, Beth Kane. Lovely to see you."
```

### `dateAnnouncement()`
Returns a polite announcement of the current date and time using Java's `Date` class.
```
Output: "It is currently Wed Aug 11 16:34:59 PDT 2022."
```

### `respondBeforeAlexis(String conversation)`
Listens to a conversation string and returns a response based on who is mentioned:

| Condition | Response |
|-----------|----------|
| "Alexis" is in the string | `"Right away, sir. She certainly isn't sophisticated enough for that."` |
| "Alfred" is in the string | `"At your service. As you wish, naturally."` |
| Neither name found | `"I'm not sure I follow, sir."` |

Uses `indexOf()` to search the conversation string.

---

## 🥷 Ninja Bonus — Overloaded `guestGreeting`

An overloaded version of `guestGreeting` that also takes the time of day:

```java
public String guestGreeting(String name, String dayPeriod)
```

```
Input:  "Beth Kane", "evening"
Output: "Good evening, Beth Kane. Lovely to see you."
```

---

## ▶️ How to Run

### In Eclipse
1. Right-click `AlfredTest.java`
2. Select **Run As → Java Application**

### In Terminal
```bash
# From the project root folder
javac com/axsosacademy/alfredbot/*.java
java com.axsosacademy.alfredbot.AlfredTest
```

---

## 💡 Concepts Used

- Java classes and methods
- `String.format()` for string interpolation
- `java.util.Date` for current date and time
- `String.indexOf()` for searching inside strings
- Method overloading (Ninja Bonus)

---

## 🔗 Useful Links

- [java.util documentation](https://docs.oracle.com/javase/8/docs/api/java/util/)
- [Java String documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)
- [Javadoc guide](https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html)
