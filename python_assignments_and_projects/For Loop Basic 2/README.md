# For Loop Basic II 🔁

A Python exercise from the **Python Stack Onsite** curriculum focused on writing functions using loops, lists, and other data types — without relying on Python built-ins.

## 📋 Assignment Overview

Practice writing functions from scratch using only basic Python building blocks.

---

## 🎯 Objectives

- Get comfortable writing functions using only basic building blocks of Python (i.e. using your own skills rather than relying on built-ins)
- Get comfortable using for loops, functions, lists, and other data types

---

## 🧩 Tasks

### 1. Biggie Size
Given a list, write a function that changes all positive numbers in the list to `"big"`.

```
biggie_size([-1, 3, 5, -5]) → [-1, "big", "big", -5]
```

---

### 2. Count Positives
Given a list of numbers, create a function to replace the last value with the count of positive values. *(Note: zero is not considered a positive number.)*

```
count_positives([-1, 1, 1, 1])        → [-1, 1, 1, 3]
count_positives([1, 6, -4, -2, -7, -2]) → [1, 6, -4, -2, -7, 2]
```

---

### 3. Sum Total
Create a function that takes a list and returns the sum of all the values in the list.

```
sum_total([1, 2, 3, 4]) → 10
sum_total([6, 3, -2])   → 7
```

---

### 4. Average
Create a function that takes a list and returns the average of all the values.

```
average([1, 2, 3, 4]) → 2.5
```

---

### 5. Length
Create a function that takes a list and returns the length of the list.

```
length([37, 2, 1, -9]) → 4
length([])              → 0
```

---

### 6. Minimum
Create a function that takes a list of numbers and returns the minimum value. If the list is empty, return `False`.

```
minimum([37, 2, 1, -9]) → -9
minimum([])             → False
```

---

### 7. Maximum
Create a function that takes a list of numbers and returns the maximum value. If the list is empty, return `False`.

```
maximum([37, 2, 1, -9]) → 37
maximum([])             → False
```

---

### 8. Ultimate Analysis
Create a function that takes a list and returns a dictionary containing the `sumTotal`, `average`, `minimum`, `maximum`, and `length` of the list.

```
ultimate_analysis([37, 2, 1, -9]) → {'sumTotal': 31, 'average': 7.75, 'minimum': -9, 'maximum': 37, 'length': 4}
```

---

### 9. Reverse List ⭐
Create a function that takes a list and returns that list with values reversed — **without creating a second list**. *(This challenge is known to appear in basic technical interviews.)*

```
reverse_list([37, 2, 1, -9]) → [-9, 1, 2, 37]
```

---

## 🚀 Getting Started

```bash
# Run the file
python for_loop_basic2.py
```

---

## 📁 File Structure

```
for_loop_basic2.py   # Main assignment file
README.md            # This file
```
