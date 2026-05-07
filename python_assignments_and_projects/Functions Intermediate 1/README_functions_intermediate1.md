# Functions Intermediate I

## Assignment Overview

This assignment is part of the **Python Stack Onsite** course on Axsos Academy. The goal is to write a single function `randInt()` that mimics Python's built-in `random.randint()` using default parameters and `random.random()`.

> ⚠️ **Note:** Do NOT use `random.randint()` — the point is to build that functionality yourself!

## Objectives

- Practice using default parameter values
- Practice passing in named arguments
- Become familiar with Python's `random` module

---

## The Task: `randInt()`

Write a single function `randInt()` that accepts up to 2 arguments: `min` and `max`.

| Call | Behavior |
|------|----------|
| `randInt()` | Returns a random integer between **0 and 100** |
| `randInt(max=50)` | Returns a random integer between **0 and 50** |
| `randInt(min=50)` | Returns a random integer between **50 and 100** |
| `randInt(min=50, max=500)` | Returns a random integer between **50 and 500** |

---

## Helpful `random` Module Notes

| Expression | Result |
|------------|--------|
| `random.random()` | Random float between `0.000` and `1.000` |
| `random.random() * 50` | Random float between `0.000` and `50.000` |
| `random.random() * 25 + 10` | Random float between `10.000` and `35.000` |
| `round(num)` | Rounds a float to the nearest integer |

---

## Starter Code

```python
import random

def randInt(min=0, max=100):
    num = random.random()
    return num
```

---

## Solution

```python
import random

def randInt(min=0, max=100):
    num = random.random() * (max - min) + min
    return round(num)

# Test cases
print(randInt())              # random integer between 0 and 100
print(randInt(max=50))        # random integer between 0 and 50
print(randInt(min=50))        # random integer between 50 and 100
print(randInt(min=50, max=500))  # random integer between 50 and 500
```

---

## BONUS: Edge Case Handling

Account for invalid inputs such as `min > max` or `max < 0`:

```python
import random

def randInt(min=0, max=100):
    if max < 0 or min > max:
        print("Invalid range provided.")
        return None
    num = random.random() * (max - min) + min
    return round(num)
```

---

## Key Concepts Practiced

- **Default parameters** — `min=0, max=100` allows the function to work with 0, 1, or 2 arguments
- **Named arguments** — calling `randInt(min=50)` skips `max` and uses its default
- **`random.random()`** — generates a float in `[0.0, 1.0)` which we scale and shift
- **`round()`** — converts the float result to an integer
- **Edge case handling** — validating inputs before performing operations

## File Structure

```
functions_intermediate1.py   # Python file with randInt() implementation
README.md                    # This file
```
