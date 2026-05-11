# 🦁 Zoo - Python OOP Assignment

A virtual zoo simulation built with Python, demonstrating core Object-Oriented Programming concepts including inheritance, polymorphism, method overriding, and class associations.

---

## 📚 Objectives

- Practice using **inheritance**
- Practice **associations** between classes
- Practice **overriding methods**
- See **polymorphism** in action

---

## 🗂️ Project Structure

```
zoo/
├── Animal.py       # Base Animal class
├── Crow.py         # Crow subclass (inherits Animal)
├── Fox.py          # Fox subclass (inherits Animal)
├── Elephant.py     # Elephant subclass (inherits Animal)
└── Zoo.py          # Zoo class + main program
```

---

## 🧬 Class Diagram

```
         Animal
        /   |   \
      Crow  Fox  Elephant
        \   |   /
           Zoo
```

---

## 🐾 Classes Overview

### `Animal` (Base Class)
The foundation for all animals in the zoo.

| Attribute | Default | Description |
|---|---|---|
| `name` | required | Animal's name |
| `age` | required | Animal's age |
| `health_level` | 100 | Current health |
| `hapiness_level` | 100 | Current happiness |

**Methods:**
- `feed()` — increases health and happiness by **+10**
- `display_info()` — prints name, age, health, and happiness

---

### `Crow` 🐦 (extends `Animal`)

**Extra attribute:** `special_wings` (bool, default `False`)

**Overrides `feed()`:**
- Health **+50**
- Happiness **+70**

---

### `Fox` 🦊 (extends `Animal`)
> See `Fox.py` for unique attributes and feed behavior.

---

### `Elephant` 🐘 (extends `Animal`)
> See `Elephant.py` for unique attributes and feed behavior.

---

### `Zoo`
Manages a collection of animals.

| Method | Description |
|---|---|
| `add_crow(name)` | Adds a Crow to the zoo |
| `add_fox(name)` | Adds a Fox to the zoo |
| `add_elephant(name)` | Adds an Elephant to the zoo |
| `print_all_info()` | Displays info for all animals |

---

## ▶️ How to Run

```bash
python Zoo.py
```

**Example output:**
```
------------------------------ Chaker and Aws Zoo ------------------------------
name: Itachi age: 1 health: 100 hapiness: 100
name: Barbar age: 1 health: 100 hapiness: 100
name: kyuubi age: 1 health: 100 hapiness: 100
name: Shini age: 1 health: 100 hapiness: 100
```

To see health/happiness change, call `feed()` before printing:
```python
zoo1.add_crow("Itachi")
zoo1.animals[0].feed()
zoo1.print_all_info()
# health: 150, hapiness: 170
```

---

## 💡 Key OOP Concepts Used

| Concept | Example |
|---|---|
| **Inheritance** | `Crow(Animal)` — Crow inherits all Animal attributes and methods |
| **Method Overriding** | `Crow.feed()` gives +50/+70 instead of the default +10/+10 |
| **Polymorphism** | `animal.feed()` behaves differently per animal type |
| **Association** | `Zoo` contains a list of `Animal` objects |
| **`super()`** | Used in subclasses to call the parent `__init__` and methods |

---

## 👨‍💻 Authors

Made by **Chaker** and **Aws**
