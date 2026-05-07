# 🔗 Method Chaining — Python OOP Project

An extension of the `Users` banking class that implements **method chaining**, allowing multiple operations to be called sequentially in a single line by returning `self` from each method.

---

## 📋 Table of Contents

- [Overview](#overview)
- [What is Method Chaining?](#what-is-method-chaining)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Class Structure](#class-structure)
- [Example Output](#example-output)

---

## Overview

This project builds on the `Users` banking class by adding `return self` to each method, enabling **method chaining** — a pattern where multiple method calls are linked together on a single object in one expression.

---

## 🔗 What is Method Chaining?

Method chaining allows you to call multiple methods on the same object in a single line:

```python
# Without chaining (3 lines)
ramez.make_withdrow(500)
ramez.make_withdrow(500)
ramez.make_withdrow(500)

# With chaining (1 line)
ramez.make_withdrow(500).make_withdrow(500).make_withdrow(500)
```

This works because each method ends with `return self`, passing the object back so the next method can be called on it immediately.

---

## ✨ Features

- All methods support chaining via `return self`
- Withdraw money — chainable
- Deposit money — chainable
- Transfer money between accounts — chainable
- Display user balance — chainable

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x

### Installation

```bash
git clone https://github.com/your-username/chaining-methods.git
cd chaining-methods
```

### Run

```bash
python "Chaining Methods.py"
```

---

## 📖 Usage

```python
# Create users
ramez  = Users("Ramez",  "Ramez@gmail.com",  25, 123456789,  50000)
chaker = Users("Chaker", "Chaker@gmail.com", 29, 123456799, 100000)

# Chain withdrawals
ramez.make_withdrow(500).make_withdrow(500).make_withdrow(500)

# Chain transfers
ramez.transfer_money(chaker, 10000).transfer_money(chaker, 10000)

# Display balances
ramez.display_user_balance()
chaker.display_user_balance()

# Chain deposits
ramez.deposit(1000).deposit(1000).deposit(1000).deposit(1000).deposit(1000)
```

---

## 🏗️ Class Structure

```python
class Users:
    def __init__(self, name, email, age, phone_number, balance)
    def make_withdrow(self, amount)              → returns self
    def display_user_balance(self)               → returns self
    def deposit(self, amount)                    → returns self
    def transfer_money(self, other_user, amount) → returns self
```

| Method | Description | Returns |
|---|---|---|
| `__init__` | Initializes a new user | — |
| `make_withdrow(amount)` | Decreases balance by amount | `self` |
| `deposit(amount)` | Increases balance by amount | `self` |
| `display_user_balance()` | Prints name and current balance | `self` |
| `transfer_money(other_user, amount)` | Moves amount to another user | `self` |

---

## 🖥️ Example Output

```
withdrow 500 your balance is 49500
withdrow 500 your balance is 49000
withdrow 500 your balance is 48500
transfer 10000 to Chaker your balance is 38500
transfer 10000 to Chaker your balance is 28500
User: Ramez, Balance: 28500
User: Chaker, Balance: 120000
deposit 1000 your balance is 29500
deposit 1000 your balance is 30500
deposit 1000 your balance is 31500
deposit 1000 your balance is 32500
deposit 1000 your balance is 33500
```

---

## 💡 Key Concept

The only change from the base `Users` class is adding `return self` at the end of each method:

```python
def deposit(self, amount):
    self.balance += amount
    print(f"deposit {amount} your balance is {self.balance}")
    return self  # ← This enables chaining
```

---

## 👤 Author

**Ramez** — Python Stack Onsite Student

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
