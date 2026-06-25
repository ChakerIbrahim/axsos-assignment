# Lists of Exceptions 🚨

A Java program that demonstrates how to handle `ClassCastException` using try/catch blocks when working with mixed-type ArrayLists.

---

## 📋 Assignment Overview

This project introduces **exception handling** in Java. The goal is to create an `ArrayList` that contains both numbers and strings, attempt to cast each element to an `Integer`, and handle the `ClassCastException` that occurs gracefully using try/catch blocks.

---

## 📁 Project Structure

```
└── ListsOfExceptions.java   # Main class with exception handling logic
```

---

## 🔧 How It Works

### 1. Create a Mixed ArrayList
An `ArrayList<Object>` is created to hold both `String` and `Integer` values:

```java
ArrayList<Object> myList = new ArrayList<Object>();
myList.add("13");
myList.add("hello world");
myList.add(48);
myList.add("Goodbye World");
```

| Index | Value | Type |
|-------|-------|------|
| 0 | "13" | String |
| 1 | "hello world" | String |
| 2 | 48 | Integer |
| 3 | "Goodbye World" | String |

---

### 2. Try to Cast Each Element
A for loop iterates through every item and attempts to cast it to `Integer`:

```java
for (int i = 0; i < myList.size(); i++) {
    try {
        Integer castedValue = (Integer) myList.get(i);
        System.out.println("Success: " + castedValue);
    } catch (ClassCastException e) {
        System.out.println("Error Message: " + e.getMessage());
        System.out.println("Index: " + i);
        System.out.println("Value: " + myList.get(i));
        System.out.println("---");
    }
}
```

---

### 3. Exception Handling Flow

```
For each item in the list:
        ↓
  Try to cast to Integer
        ↓
✅ Works?          ❌ Fails?
Print Success    Print error details
        ↓               ↓
    Continue to next item ✅ (never crashes)
```

---

## 🚀 How to Run

### Prerequisites
- Java JDK 17+

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/lists-of-exceptions.git
cd lists-of-exceptions
```

2. **Compile the file**
```bash
javac ListsOfExceptions.java
```

3. **Run the program**
```bash
java ListsOfExceptions
```

---

## 📤 Expected Output

```
Error Message: class java.lang.String cannot be cast to class java.lang.Integer
Index: 0
Value: 13
---
Error Message: class java.lang.String cannot be cast to class java.lang.Integer
Index: 1
Value: hello world
---
Success: 48
Error Message: class java.lang.String cannot be cast to class java.lang.Integer
Index: 3
Value: Goodbye World
---
```

---

## 💡 Key Concepts Used

| Concept | Usage |
|---------|-------|
| `ArrayList<Object>` | Stores both Strings and Integers in one list |
| `try` block | Attempts the cast to Integer |
| `catch` block | Catches the error without crashing the program |
| `ClassCastException` | Thrown when casting a String to Integer fails |
| `e.getMessage()` | Returns a description of the error |
| `myList.get(i)` | Gets the item at index `i` |

---

## ❓ Why Does ClassCastException Happen?

```
(Integer) "13"            ❌ → String cannot become Integer
(Integer) "hello world"   ❌ → String cannot become Integer
(Integer) 48              ✅ → Already an Integer, works fine
(Integer) "Goodbye World" ❌ → String cannot become Integer
```

---

## ⚠️ Without try/catch vs With try/catch

| Without try/catch | With try/catch |
|-------------------|----------------|
| Program **crashes** on first error | Program **continues** after error |
| Only processes first item | Processes **all** items |
| Shows ugly stack trace | Shows **clean** error message |

---

## 🔗 Resources

- [Java Exception Handling Documentation](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Java ArrayList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
- [Java ClassCastException Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/ClassCastException.html)
