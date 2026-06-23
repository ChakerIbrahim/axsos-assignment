# 📱 Devices — Java OOP Assignment

A Java project demonstrating **inheritance**, **encapsulation**, and **object-oriented design** through a `Device` and `Phone` class hierarchy.

---

## 📁 Project Structure

```
src/com/axsosacademy/devices/
├── Devices.java      # Base class with battery attribute and status method
├── Phone.java        # Subclass extending Devices with call, game, and charge methods
└── DeviceTest.java   # Test class that instantiates and runs Phone methods
```

---

## ✅ Assignment Requirements

- [x] Create a `Device` class with a `battery` attribute and `displayBattery()` status method
- [x] Create a `Phone` class that extends `Device` with three methods:
  - `makeCall()` — drains 5% battery
  - `playGame()` — drains 20% battery
  - `charge()` — restores 50% battery
- [x] Create a `DeviceTest` class that instantiates `Phone` and calls:
  - `makeCall()` × 3
  - `playGame()` × 2
  - `charge()` × 1
- [x] **Ninja Bonus 1:** Display a `"Battery critical!"` warning when battery falls below 10
- [x] **Ninja Bonus 2:** Block `playGame()` if battery is below 25

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/java-devices-assignment.git
   ```

2. Open the project in your IDE (Eclipse, IntelliJ, VS Code, etc.)

3. Navigate to `DeviceTest.java` and run the `main` method.

---

## 💡 Key Concepts Used

| Concept | Where Applied |
|---|---|
| Inheritance | `Phone extends Devices` |
| Encapsulation | `protected int battery` in `Devices` |
| Method overriding | Battery logic in `Phone` methods |
| Conditional logic | Ninja Bonus 1 & 2 battery checks |

---

## 📋 Example Output

```
You made a call
Remaining battery life: 95
You made a call
Remaining battery life: 90
You made a call
Remaining battery life: 85
You played a game
Remaining battery life: 65
You played a game
Remaining battery life: 45
You are charging!
Remaining battery life: 95
```

---

## ⚠️ Known Fix Applied

The `battery` field in `Devices.java` was changed from `private` to `protected` so that the `Phone` subclass can access and modify it directly. Without this, Java throws a compile error since child classes cannot access `private` fields of a parent.

---

## 🥷 Ninja Bonuses

**Bonus 1 — Battery Critical Warning:**
A private `checkBattery()` method prints `"⚠️ Battery critical!"` whenever the battery drops below 10 after any action.

**Bonus 2 — Block Game Below 25%:**
`playGame()` checks the battery level before running. If it's below 25, it prints `"Battery too low to play a game!"` and returns early.

---

## 🛠️ Technologies

- Java (JDK 8+)
- No external dependencies
