# 🥋 MathDojo

> A Python OOP assignment practicing **class creation**, **method chaining**, and **flexible variadic functions** using `*args`.

---

## 📚 About

This project is part of the **Python Stack Onsite** course by AXSOS Academy.  
The goal is to build a `MathDojo` class with a `result` attribute and two methods — `add` and `subtract` — that each accept a variable number of arguments and support **method chaining**.

---

## 🎯 Objectives

- Practice creating a class and instantiating objects
- Practice chaining methods (each method returns `self`)
- Practice writing flexible functions using `*args`

---

## 🗂️ Project Structure

```
mathdojo/
│
├── mathdojo.py     # MathDojo class
├── main.py         # Tests and demo
└── README.md
```

---

## 🧱 Class: `MathDojo`

| Attribute / Method | Description |
|---|---|
| `result` | Running total, starts at `0` |
| `add(num, *nums)` | Adds one or more numbers to `result`, returns `self` |
| `subtract(num, *nums)` | Subtracts one or more numbers from `result`, returns `self` |

---

## 💻 Code

```python
class MathDojo:
    def __init__(self):
        self.result = 0

    def add(self, num, *nums):
        self.result += num
        for n in nums:
            self.result += n
        return self  # enables method chaining

    def subtract(self, num, *nums):
        self.result -= num
        for n in nums:
            self.result -= n
        return self  # enables method chaining
```

---

## ▶️ Usage

### Basic Usage

```python
md = MathDojo()

md.add(10)
print(md.result)        # 10

md.subtract(3)
print(md.result)        # 7
```

### Variable Number of Arguments

```python
md2 = MathDojo()

md2.add(1, 2, 3, 4)        # adds 1+2+3+4
print(md2.result)           # 10

md2.subtract(2, 3)          # subtracts 2 and 3
print(md2.result)           # 5
```

### ⛓️ Method Chaining

```python
md = MathDojo()

x = md.add(2).add(2, 5, 1).subtract(3, 2).result
print(x)    # 5
```

**How it works step by step:**

| Step | Operation | Result |
|------|-----------|--------|
| Start | — | `0` |
| `.add(2)` | 0 + 2 | `2` |
| `.add(2, 5, 1)` | 2 + 2 + 5 + 1 | `10` |
| `.subtract(3, 2)` | 10 - 3 - 2 | `5` |

---

## 🧪 Tests

```python
# Test add — 3 different argument counts
md = MathDojo()
md.add(10);          print(md.result)   # 10
md.add(5, 3);        print(md.result)   # 18
md.add(1, 2, 3, 4);  print(md.result)   # 28

# Test subtract — 3 different argument counts
md2 = MathDojo()
md2.subtract(5);           print(md2.result)   # -5
md2.subtract(2, 3);        print(md2.result)   # -10
md2.subtract(1, 1, 1, 1);  print(md2.result)   # -14

# Test chaining
md3 = MathDojo()
x = md3.add(2).add(2, 5, 1).subtract(3, 2).result
print(x)   # 5 ✅
```

---

## 🧠 Key Concepts

### `*args` — Variable Arguments

`*nums` collects any extra positional arguments into a tuple, so the method can accept **one or many** values:

```python
def add(self, num, *nums):
    # num  = first argument (required)
    # nums = tuple of remaining arguments (optional)
```

### Method Chaining with `return self`

Returning `self` at the end of each method allows calls to be **chained together** in a single expression:

```python
md.add(5).subtract(2).add(10)  # each call returns the same object
```

---

## 🛠️ Requirements

- Python 3.6+
- No external libraries needed

---

## 👨‍💻 Author

Made with ❤️ as part of the AXSOS Academy — Python Stack Onsite course.
