# 🏦 Users with Bank Accounts

> A Python OOP assignment practicing **class associations** (composition) — a `User` that *has a* `BankAccount`.

---

## 📚 About

This project is part of the **Python Stack Onsite** course by AXSOS Academy.  
The goal is to update a `User` class so that instead of storing a raw `account_balance` attribute, it holds an **instance of a `BankAccount` class** — practicing object-oriented design through composition.

---

## 🎯 Objectives

- Practice writing classes with associations
- Understand the difference between storing a primitive value vs. storing an object instance
- Delegate behavior to the associated class

---

## 🗂️ Project Structure

```
users-with-bank-accounts/
│
├── bank_account.py       # BankAccount class
├── user.py               # User class (with BankAccount association)
├── main.py               # Test / demo script
└── README.md
```

---

## 🧱 Classes

### `BankAccount`

| Attribute / Method | Description |
|---|---|
| `balance` | Current account balance (starts at `0`) |
| `deposit(amount)` | Adds amount to balance |
| `withdraw(amount)` | Subtracts amount from balance |

### `User`

| Attribute / Method | Description |
|---|---|
| `username` | The user's name |
| `email` | The user's email |
| `password` | The user's password |
| `account` | A `BankAccount` instance (association) |
| `make_deposit(amount)` | Calls `self.account.deposit(amount)` |
| `make_withdrawal(amount)` | Calls `self.account.withdraw(amount)` |
| `display_user_balance()` | Prints the current account balance |

---

## 💻 Code

### `bank_account.py`

```python
class BankAccount:
    def __init__(self):
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount
```

### `user.py`

```python
class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.account = BankAccount()  # Association with BankAccount

    def make_deposit(self, amount):
        self.account.deposit(amount)

    def make_withdrawal(self, amount):
        self.account.withdraw(amount)

    def display_user_balance(self):
        print(f"{self.username}'s balance: ${self.account.balance}")
```

---

## ▶️ Usage

```python
user1 = User("Alice", "alice@email.com", "pass123")

user1.make_deposit(500)
user1.make_withdrawal(200)
user1.display_user_balance()
# Output: Alice's balance: $300
```

---

## ⭐ SENSEI BONUS — Multiple Accounts

Allow a user to hold **multiple bank accounts**, specifying which account to deposit/withdraw from.

```python
class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.accounts = {}  # dict of account_name -> BankAccount

    def add_account(self, account_name):
        self.accounts[account_name] = BankAccount()

    def make_deposit(self, amount, account_name):
        self.accounts[account_name].deposit(amount)

    def make_withdrawal(self, amount, account_name):
        self.accounts[account_name].withdraw(amount)

    def display_user_balance(self, account_name):
        print(f"{self.username}'s '{account_name}' balance: ${self.accounts[account_name].balance}")
```

```python
user1 = User("Alice", "alice@email.com", "pass123")
user1.add_account("savings")
user1.add_account("checking")

user1.make_deposit(1000, "savings")
user1.make_deposit(500, "checking")
user1.make_withdrawal(200, "savings")

user1.display_user_balance("savings")   # Alice's 'savings' balance: $800
user1.display_user_balance("checking")  # Alice's 'checking' balance: $500
```

---

## 🧠 Key Concept: Composition

> A `User` **has a** `BankAccount` — this is **composition**.

Instead of the `User` class managing balance logic itself, it **delegates** that responsibility to the `BankAccount` class. This keeps each class focused on a single responsibility and makes the code easier to maintain and extend.

```
User
 └── account: BankAccount
                └── balance: int
                └── deposit()
                └── withdraw()
```

---

## 🛠️ Requirements

- Python 3.6+
- No external libraries needed

---

## 👨‍💻 Author

Made with ❤️ as part of the AXSOS Academy — Python Stack Onsite course.
