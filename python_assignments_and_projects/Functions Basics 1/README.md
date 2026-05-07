# Functions Basic I

## Assignment Overview

This assignment is part of the **Python Stack Onsite** course on Axsos Academy. The goal is to practice predicting the output of Python code snippets involving functions, using T-diagrams to reason through execution.

## Objectives

- Avoid common mistakes when using functions
- Use T-diagrams to correctly predict and debug code output

## Instructions

1. Create a text file or copy the code snippets into a Python file
2. For each of the 15 snippets below, **predict the output** before running it
3. Run the code to check your prediction
4. Submit the text/Python file with your predictions

## Code Snippets & Predicted Outputs

### #1
```python
def a():
    return 5
print(a())
```
**Predicted Output:** `5`

---

### #2
```python
def a():
    return 5
print(a()+a())
```
**Predicted Output:** `10`

---

### #3
```python
def a():
    return 5
    return 10
print(a())
```
**Predicted Output:** `5`

---

### #4
```python
def a():
    return 5
    print(10)
print(a())
```
**Predicted Output:** `5`

---

### #5
```python
def a():
    print(5)
x = a()
print(x)
```
**Predicted Output:**
```
5
None
```

---

### #6
```python
def a(b,c):
    print(b+c)
print(a(1,2) + a(2,3))
```
**Predicted Output:**
```
3
5
TypeError: unsupported operand type(s) for +: 'NoneType' and 'NoneType'
```

---

### #7
```python
def a(b,c):
    return str(b)+str(c)
print(a(2,5))
```
**Predicted Output:** `25`

---

### #8
```python
def a():
    b = 100
    print(b)
    if b < 10:
        return 5
    else:
        return 10
    return 7
print(a())
```
**Predicted Output:**
```
100
10
```

---

### #9
```python
def a(b,c):
    if b<c:
        return 7
    else:
        return 14
    return 3
print(a(2,3))
print(a(5,3))
print(a(2,3) + a(5,3))
```
**Predicted Output:**
```
7
14
21
```

---

### #10
```python
def a(b,c):
    return b+c
    return 10
print(a(3,5))
```
**Predicted Output:** `8`

---

### #11
```python
b = 500
print(b)
def a():
    b = 300
    print(b)
a()
print(b)
```
**Predicted Output:**
```
500
300
500
```

---

### #12
```python
b = 500
print(b)
def a():
    b = 300
    print(b)
    return b
print(b)
a()
print(b)
```
**Predicted Output:**
```
500
500
300
500
```

---

### #13
```python
b = 500
print(b)
def a():
    b = 300
    print(b)
    return b
print(b)
b=a()
print(b)
```
**Predicted Output:**
```
500
500
300
300
```

---

### #14
```python
def a():
    print(1)
    b()
    print(2)
def b():
    print(3)
a()
```
**Predicted Output:**
```
1
3
2
```

---

### #15
```python
def a():
    print(1)
    x = b()
    print(x)
    return 10
def b():
    print(3)
    return 5
y = a()
print(y)
```
**Predicted Output:**
```
1
3
5
10
```

---

## Key Concepts Practiced

- **Return values vs. None** — a function with no `return` returns `None`
- **Early return** — once a `return` is hit, the rest of the function is skipped
- **Local scope** — variables defined inside a function don't affect the global scope
- **Function calls as expressions** — return values can be used in arithmetic and assignments
- **Nested function calls** — one function calling another follows the call stack

## File Structure

```
functions_basics1.txt   # Submitted predictions file
README.md               # This file
```
