# 🏦 User Banking Class — Python OOP Project

A Python OOP exercise building a simple `Users` class that simulates basic banking operations such as deposits, withdrawals, balance display, and money transfers between users.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Class Structure](#class-structure)
- [Example Output](#example-output)
- [Learning Objectives](#learning-objectives)

---

## Overview

This project was built as part of the **Python Stack Onsite** course (Python OOP module). It demonstrates how to create a class, instantiate objects from it, and use methods to interact with object state.

---

## ✨ Features

- Create user accounts with name, email, age, phone number, and balance
- Withdraw money from a user's balance
- Deposit money into a user's balance
- Display a user's name and current balance
- Transfer money between two user accounts

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x

### Installation

```bash
git clone https://github.com/your-username/user-banking-class.git
cd user-banking-class
```

### Run

```bash
python user.py
```

---

## 📖 Usage

```python
# Create users
ramez = Users("Ramez", "Ramez@gmail.com", 25, 123456789, 50000)
chaker = Users("Chaker", "Chaker@gmail.com", 29, 123456799, 100000)

# Withdraw
ramez.make_withdrow(500)

# Transfer money
ramez.transfer_money(chaker, 10000)

# Display balances
ramez.display_user_balance()
chaker.display_user_balance()

# Deposit
ramez.deposit(1000)
```

---

## 🏗️ Class Structure

```python
class Users:
    def __init__(self, name, email, age, phone_number, balance)
    def make_withdrow(self, amount)
    def display_user_balance(self)
    def deposit(self, amount)
    def transfer_money(self, other_user, amount)
```

| Method | Description |
|---|---|
| `__init__` | Initializes a new user with their details and starting balance |
| `make_withdrow(amount)` | Decreases the user's balance by the specified amount |
| `deposit(amount)` | Increases the user's balance by the specified amount |
| `display_user_balance()` | Prints the user's name and current balance |
| `transfer_money(other_user, amount)` | Transfers an amount from this user to another user |

---

## 🖥️ Example Output

```
withdrow 500 your balance is 49500
transfer 10000 to Chaker your balance is 39500
User: Ramez, Balance: 39500
User: Chaker, Balance: 110000
deposit 1000 your balance is 40500
```

---

## 🎯 Learning Objectives

- Practice creating a class and making instances from it
- Practice accessing the methods and attributes of different instances
- Understand how object state changes through method calls

---

## 👤 Author

**Ramez** — Python Stack Onsite Student

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
