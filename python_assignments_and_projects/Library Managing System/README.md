# 📚 Library Management System

A Python implementation of a Library Management System built with two core **Object-Oriented Programming (OOP)** principles: **Inheritance** and **Polymorphism**. The system manages three types of library items — Books, Magazines, and DVDs — and supports borrowing, returning, availability checking, overdue notification, and late fee calculation.

---

## 🗂️ Table of Contents

- [Features](#features)
- [Class Diagram (UML)](#class-diagram-uml)
- [OOP Principles Applied](#oop-principles-applied)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage Example](#usage-example)
- [Late Fee Policy](#late-fee-policy)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Borrow Items** | Users can borrow any available item |
| **Return Items** | Borrowed items can be returned |
| **Check Availability** | See whether an item is available or who has it |
| **Overdue Notification** | System alerts when an item is past its due date |
| **Late Fee Calculation** | Each item type has its own fee policy (Polymorphism) |
| **Library Catalogue** | Central `Library` class manages the full collection |

---

## 🗺️ Class Diagram (UML)

```
                    ┌──────────────────────────────────┐
                    │          LibraryItem             │  ← Base Class
                    ├──────────────────────────────────┤
                    │  item_id: str                    │
                    │  title: str                      │
                    │  borrow_period_days: int         │
                    │  is_borrowed: bool               │
                    │  borrower_name: str | None       │
                    │  due_date: date | None           │
                    ├──────────────────────────────────┤
                    │  borrow(borrower_name) → str     │
                    │  return_item() → str             │
                    │  check_availability() → str      │
                    │  notify_if_overdue() → str       │
                    │  calculate_late_fee() → float    │  ← overridden by subclasses
                    └──────────────┬───────────────────┘
                                   │  inherits
               ┌───────────────────┼───────────────────┐
               │                   │                   │
   ┌───────────▼──────┐  ┌─────────▼────────┐  ┌──────▼──────────┐
   │      Book        │  │    Magazine       │  │      DVD        │
   ├──────────────────┤  ├──────────────────┤  ├─────────────────┤
   │  author: str     │  │  issue_number:int │  │  director: str  │
   │  genre: str      │  ├──────────────────┤  │  duration: int  │
   ├──────────────────┤  │  FEE: $0.50/day  │  ├─────────────────┤
   │  FEE: $0.25/day  │  │  PERIOD: 7 days  │  │  FEE: $1+$1/day │
   │  PERIOD: 14 days │  └──────────────────┘  │  PERIOD: 3 days │
   └──────────────────┘                         └─────────────────┘

   ┌──────────────────────────────────────────┐
   │                Library                   │
   ├──────────────────────────────────────────┤
   │  name: str                               │
   │  items: dict[str, LibraryItem]           │
   ├──────────────────────────────────────────┤
   │  add_item(item)                          │
   │  get_item(item_id) → LibraryItem | None  │
   │  list_all()                              │
   └──────────────────────────────────────────┘
```

---

## 🧱 OOP Principles Applied

### 1. 🔷 Inheritance

`Book`, `Magazine`, and `DVD` all **inherit** common attributes and behaviour from the `LibraryItem` base class. This means none of the subclasses need to rewrite the shared logic — they simply extend it.

**What is inherited:**
- `borrow()` — identical logic for all item types
- `return_item()` — identical logic for all item types
- `check_availability()` — identical logic for all item types
- `notify_if_overdue()` — identical logic for all item types

Each subclass calls `super().__init__()` to reuse the parent's setup, then adds only what's unique to that type:

```python
class Book(LibraryItem):
    def __init__(self, item_id, title, author, genre):
        super().__init__(item_id, title, borrow_period_days=14)  # reuse parent
        self.author = author   # Book-specific
        self.genre  = genre    # Book-specific

class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title, borrow_period_days=7)   # reuse parent
        self.issue_number = issue_number  # Magazine-specific

class DVD(LibraryItem):
    def __init__(self, item_id, title, director, duration_minutes):
        super().__init__(item_id, title, borrow_period_days=3)   # reuse parent
        self.director          = director          # DVD-specific
        self.duration_minutes  = duration_minutes  # DVD-specific
```

---

### 2. 🎭 Polymorphism

`calculate_late_fee()` is defined in the base class but **overridden** in each subclass with a different fee policy. The same method name produces a different result depending on which object type you call it on.

```python
# Base class – default (never really used)
class LibraryItem:
    def calculate_late_fee(self, days_overdue):
        return 0.0

# Book – $0.25 per day
class Book(LibraryItem):
    def calculate_late_fee(self, days_overdue):
        return round(days_overdue * 0.25, 2)

# Magazine – $0.50 per day
class Magazine(LibraryItem):
    def calculate_late_fee(self, days_overdue):
        return round(days_overdue * 0.50, 2)

# DVD – $1.00 flat + $1.00 per day
class DVD(LibraryItem):
    def calculate_late_fee(self, days_overdue):
        return round(1.00 + days_overdue * 1.00, 2)
```

**Polymorphism in action** — the same loop works across all types:

```python
for item in [book, magazine, dvd]:
    fee = item.calculate_late_fee(5)   # each calls its own version
    print(f"{type(item).__name__}: ${fee:.2f}")

# Output:
# Book:     $1.25
# Magazine: $2.50
# DVD:      $6.00
```

---

## 📁 Project Structure

```
library-management-system/
│
├── library_management_system.py   # All classes + demo main()
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.6 or higher

### Run the demo

```bash
python library_management_system.py
```

### Expected output

```
=======================================================
   Library Management System – Demo
=======================================================
Added: Book(id='B001', title='Clean Code', author='Robert C. Martin')
Added: Magazine(id='M001', title='National Geographic', issue=245)
Added: DVD(id='D001', title='Inception', director='Christopher Nolan')

───────────────────────────────────────────────────────
  City Public Library – 3 item(s)
───────────────────────────────────────────────────────
  'Clean Code' is available.
  'National Geographic' is available.
  'Inception' is available.
───────────────────────────────────────────────────────

'Clean Code' borrowed by Alice. Due: 2026-05-26
'National Geographic' borrowed by Bob. Due: 2026-05-19
'Inception' borrowed by Charlie. Due: 2026-05-15

'Clean Code' is already borrowed by Alice.

Late fees after 5 days overdue:
  Book       'Clean Code': $1.25
  Magazine   'National Geographic': $2.50
  DVD        'Inception': $6.00

'Clean Code' returned successfully.
'Clean Code' is available.
```

---

## 💰 Late Fee Policy

| Item Type | Borrow Period | Fee Structure |
|---|---|---|
| **Book** | 14 days | $0.25 per day overdue |
| **Magazine** | 7 days | $0.50 per day overdue |
| **DVD** | 3 days | $1.00 flat + $1.00 per day overdue |

---

## 📝 License

This project is for educational purposes.
