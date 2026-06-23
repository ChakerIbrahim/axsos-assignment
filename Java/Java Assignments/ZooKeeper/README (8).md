# 🦍 Zoo Keeper — Java OOP Assignment

A Java project demonstrating **inheritance** and **object-oriented programming** concepts through a zoo animal tracking system.

## 📋 Assignment Overview

A zookeeper needs help tracking the energy levels of mammals. This project models two animals — a **Gorilla** and a **Bat** — that both extend a base `Mammal` class.

---

## 🏗️ Project Structure

```
ZooKeeper/
└── src/
    └── com/axosacademy/zookeeper/
        ├── Mammal.java
        ├── Gorilla.java
        ├── Bat.java
        └── test.java
```

---

## 🐾 Classes

### `Mammal` (Base Class)
- **Attribute:** `energy` (default: `100`)
- **Method:** `displayEnergy()` — prints and returns the current energy level

### `Gorilla extends Mammal`
| Method | Effect |
|---|---|
| `throwSomething()` | Energy `-5` · prints a throw message |
| `eatBanana()` | Energy `+10` · prints a satisfaction message |
| `climb()` | Energy `-10` · prints a climb message |

### `Bat extends Mammal`
Starting energy: **300**

| Method | Effect |
|---|---|
| `fly()` | Energy `-50` · prints an airborne message |
| `eatHumans()` | Energy `+25` · prints a satisfaction message |
| `attackTown()` | Energy `-100` · prints an attack message |

---

## 🧪 Test Scenario

```java
// Gorilla test
Gorilla jalil = new Gorilla();
jalil.throwSomething(); // x3
jalil.eatBanana();      // x2
jalil.climb();          // x1
jalil.displayEnergy();

// Bat test
Bat ramez = new Bat();
ramez.attackTown();  // x3
ramez.eatHumans();   // x2
ramez.fly();         // x2
ramez.displayEnergy();
```

### Expected Output (Bat)
```
The Bat Has Attacked the Town and it is Satisfied
The Bat Has Attacked the Town and it is Satisfied
The Bat Has Attacked the Town and it is Satisfied
The Bat is Satisfied after eating Humans
The Bat is Satisfied after eating Humans
The Bat is now airborne
The Bat is now airborne
remaining energy level: -50
```

---

## 🚀 How to Run

1. Clone or open the project in **Eclipse IDE**
2. Navigate to `src/com/axosacademy/zookeeper/test.java`
3. Run as a **Java Application**

---

## 💡 Concepts Used

- **Inheritance** (`extends`)
- **Constructor overriding** (custom energy in `Bat`)
- **Instance methods** and **`this` keyword**
- **`protected` fields** shared across subclasses
- **`System.out.println`** for console output

---

## 📚 Course

**Axsos Academy — Java Stack**
