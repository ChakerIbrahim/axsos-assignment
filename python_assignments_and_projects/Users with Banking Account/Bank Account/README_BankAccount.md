# 🏦 BankAccount — Python OOP Project

A Python OOP assignment implementing a `BankAccount` class with deposit, withdrawal, interest, and method chaining functionality.

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

This project models a real-world banking concept: in a proper banking application, **accounts** are separate from **users**. A user can have an account, but the account itself holds the balance and interest logic. This assignment focuses on building the `BankAccount` class independently before connecting it to the `Users` class in a later lesson.

---

## ✨ Features

- Create a bank account with a name, starting balance (default `$0`), and interest rate (default `0`)
- Deposit money into the account
- Withdraw money — with an **insufficient funds** guard that charges a `$5` fee
- Display account info to the terminal
- Yield interest based on current balance × interest rate
- All methods support **method chaining** via `return self`

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x

### Installation

```bash
git clone https://github.com/your-username/bank-account.git
cd bank-account
```

### Run

```bash
python BankAccount.py
```

---

## 📖 Usage

```python
# Create accounts
chaker = BankAccount("Chaker", 500, 0.05)
jalil  = BankAccount("Jalil", 10000, 0.20)
aws    = BankAccount("AWS", 2, 0.2)

# Account 1: 3 deposits, 1 withdrawal, yield interest, display — all chained
chaker.deposit(5000).deposit(1000).deposit(50000).withdraw(15000).yield_interest().display_account_info()

# Account 2: 2 deposits, 4 withdrawals, yield interest, display — all chained
jalil.deposit(7000).deposit(9000).withdraw(100).withdraw(100).withdraw(100).withdraw(100).yield_interest().display_account_info()

# Insufficient funds example
aws.withdraw(5).display_account_info()
```

---

## 🏗️ Class Structure

```python
class BankAccount:
    def __init__(self, name, balance=0, int_rate=0)
    def deposit(self, amount)           → returns self
    def withdraw(self, amount)          → returns self
    def display_account_info(self)      → returns self
    def yield_interest(self)            → returns self
```

| Method | Description | Returns |
|---|---|---|
| `__init__` | Creates account with name, balance (default `0`), and interest rate (default `0`) | — |
| `deposit(amount)` | Increases balance by the given amount | `self` |
| `withdraw(amount)` | Decreases balance if sufficient funds; otherwise prints fee message and deducts `$5` | `self` |
| `display_account_info()` | Prints account name and current balance | `self` |
| `yield_interest()` | Increases balance by `balance × interest_rate` (only if balance is positive) | `self` |

---

## ⚠️ Insufficient Funds Behavior

If a withdrawal is attempted with insufficient funds, the method prints a warning and charges a `$5` fee instead:

```
Insufficient Funds: Charging a $5 fee
```

```python
aws = BankAccount("AWS", 2, 0.2)
aws.withdraw(5)
# Balance was $2, can't withdraw $5 → balance becomes -$3
```

---

## 🖥️ Example Output

```
Name: Chaker  BALANCE: 41925.0
Name: Jalil   BALANCE: 19584.0
Insufficient Funds: Charging a $5 fee
Name: AWS     BALANCE: -3
```

---

## 🎯 Learning Objectives

- Practice writing classes in Python
- Understand how to use default parameter values in `__init__`
- Implement guard clauses inside methods (`if/else` for balance check)
- Apply method chaining with `return self`
- Model real-world separation of concerns (accounts vs. users)

---

## 👤 Author

**Ramez** — Python Stack Onsite Student

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
