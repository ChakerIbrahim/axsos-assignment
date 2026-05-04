# Hello World - Python Assignment

A beginner Python assignment exploring how to print text, use variables, and combine strings and numbers using the `print()` function.

---

## 📋 Assignment Tasks

1. Print `"Hello World"`
2. Print `"Hello Noelle!"` using a string variable
3. Print `"Hello 42!"` using an integer variable
4. Print `"I love to eat sushi and pizza."` using food variables

---

## 📂 File Structure

```
Hello World/
└── hello_world.py
```

---

## 💡 Concepts Covered

- **`print()` function** — outputting text to the console
- **Variables** — storing strings and integers
- **String concatenation** — joining strings with `+`
- **Comma-separated print** — using commas in `print()` to combine values of different types
- **Type errors** — understanding why you can't use `+` to join a string and an integer directly

---

## ⚠️ Common Error & Fix

When trying to concatenate a string with an integer using `+`, Python throws a `TypeError`:

```python
name = 42
print("Hello " + name)  # ❌ TypeError: can only concatenate str (not "int") to str
```

**Fix options:**

```python
# Option 1 - Convert to string
print("Hello " + str(name))   # ✅ Hello 42

# Option 2 - Use a comma
print("Hello", name)           # ✅ Hello 42

# Option 3 - Use an f-string
print(f"Hello {name}!")        # ✅ Hello 42!
```

---

## ▶️ How to Run

Make sure Python is installed, then run:

```bash
python hello_world.py
```

---

## 🛠️ Requirements

- Python 3.x

---

## 👤 Author

*Axsos Academy — Python Course*
