# Functions Basic II

## Assignment Overview

This assignment is part of the **Python Stack Onsite** course on Axsos Academy. It focuses on writing Python functions that work with lists, return values, and handle expressions.

## Objectives

- Learn how to create basic functions in Python
- Get comfortable using lists
- Get comfortable having functions return an expression/value

## Problems

### 1. Countdown
Create a function that accepts a number as an input. Return a new list that counts down by one, from the number (as the 0th element) down to 0 (as the last element).

**Example:**
```python
countdown(5)  # should return [5, 4, 3, 2, 1, 0]
```

**Solution:**
```python
def countdown(num):
    result = []
    for i in range(num, -1, -1):
        result.append(i)
    return result
```

---

### 2. Print and Return
Create a function that receives a list with two numbers. Print the first value and return the second.

**Example:**
```python
print_and_return([1, 2])  # should print 1 and return 2
```

**Solution:**
```python
def print_and_return(lst):
    print(lst[0])
    return lst[1]
```

---

### 3. First Plus Length
Create a function that accepts a list and returns the sum of the first value in the list plus the list's length.

**Example:**
```python
first_plus_length([1, 2, 3, 4])  # should return 1 + 4 = 5
```

**Solution:**
```python
def first_plus_length(lst):
    return lst[0] + len(lst)
```

---

### 4. Values Greater than Second
Write a function that accepts a list and creates a new list containing only the values from the original list that are greater than its 2nd value. Print how many values this is, then return the new list. If the list has fewer than 2 elements, return `False`.

**Examples:**
```python
values_greater_than_second([5, 2, 3, 2, 1, 4])  # prints 3 and returns [5, 3, 4]
values_greater_than_second([3])                  # returns False
```

**Solution:**
```python
def values_greater_than_second(lst):
    if len(lst) < 2:
        return False
    second = lst[1]
    result = [x for x in lst if x > second]
    print(len(result))
    return result
```

---

### 5. This Length, That Value
Write a function that accepts two integers — `size` and `value`. Create and return a list whose length equals `size` and whose every element is `value`.

**Examples:**
```python
length_and_value(4, 7)  # should return [7, 7, 7, 7]
length_and_value(6, 2)  # should return [2, 2, 2, 2, 2, 2]
```

**Solution:**
```python
def length_and_value(size, value):
    return [value] * size
```

---

## Key Concepts Practiced

- **List building** — appending to lists and using list comprehensions
- **Indexing** — accessing elements by position (`lst[0]`, `lst[1]`)
- **`len()`** — getting the length of a list
- **`range()`** — generating sequences for loops
- **Conditional returns** — returning `False` when input doesn't meet requirements
- **Print vs Return** — understanding the difference between side effects and return values

## File Structure

```
functions_basic2.py   # Python file with all 5 function implementations
README.md             # This file
```
