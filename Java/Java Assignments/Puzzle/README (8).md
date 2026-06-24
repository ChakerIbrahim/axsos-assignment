# PuzzleJava 🎲

A Java class that uses the `Random` library to generate random values including dice rolls, letters, and passwords.

---

## 📋 Assignment Overview

This project introduces the `Random` class in Java. The goal is to build a `PuzzleJava` class with multiple methods that generate random values, and test them using a separate `TestPuzzleJava` class.

---

## 📁 Project Structure

```
├── PuzzleJava.java        # Main class with all methods
└── TestPuzzleJava.java    # Test file to verify all methods
```

---

## 🔧 Methods

### 1. `getTenRolls()`
- Generates and returns an array of **10 random integers**
- Each number is between **1 and 20** (inclusive)

```java
int[] rolls = generator.getTenRolls();
// Output: [4, 17, 2, 11, 20, 8, 3, 15, 9, 6]
```

---

### 2. `getRandomLetter()`
- Creates an array of all **26 alphabet letters**
- Generates a **random index** between 0 and 25
- Returns the letter at that index

```java
char letter = generator.getRandomLetter();
// Output: m
```

---

### 3. `generatePassword()`
- Calls `getRandomLetter()` **8 times**
- Builds and returns a random **8-character string**

```java
String password = generator.generatePassword();
// Output: krtxpqzl
```

---

### 4. `getNewPasswordSet(int length)`
- Accepts an `int` as a parameter
- Calls `generatePassword()` **length** times
- Returns an array of random 8-character passwords

```java
String[] passwordSet = generator.getNewPasswordSet(5);
// Output: [abcdefgh, xyzpqrst, mnopqrst, abcxyzpq, lmnopqrs]
```

---

## 🚀 How to Run

### Prerequisites
- Java JDK 17+
- Maven 3.9+

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/puzzle-java.git
cd puzzle-java
```

2. **Compile the files**
```bash
javac PuzzleJava.java TestPuzzleJava.java
```

3. **Run the test file**
```bash
java TestPuzzleJava
```

---

## 📤 Expected Output

```
Ten Rolls: [4, 17, 2, 11, 20, 8, 3, 15, 9, 6]
Random Letter: m
Generated Password: krtxpqzl
Password Set: [abcdefgh, xyzpqrst, mnopqrst, abcxyzpq, lmnopqrs]
```

---

## 💡 Key Concepts Used

| Concept | Usage |
|---------|-------|
| `Random` class | Generating random numbers |
| `nextInt(n)` | Returns random int from 0 to n-1 |
| `char[]` array | Storing alphabet letters |
| `String` concatenation | Building the password |
| `Arrays.toString()` | Printing arrays readably |

---

## 🔗 Resources

- [Java Random Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Random.html)
- [Java Arrays Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html)
