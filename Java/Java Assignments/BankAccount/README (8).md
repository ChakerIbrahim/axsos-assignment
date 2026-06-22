# 🏦 BankAccount — Java OOP Assignment

A Java program that simulates common banking transactions using Object-Oriented Programming concepts including member variables, static fields, constructors, getters, and encapsulated methods.

---

## 📋 Overview

This project implements a `BankAccount` class that models real-world banking operations such as depositing and withdrawing funds across checking and savings accounts, while tracking global statistics like the total number of accounts and total money held across all accounts.

---

## 🗂️ Project Structure

```
BankAccount/
├── BankAccount.java   # Core class with member variables and methods
└── BankTest.java      # Test class to validate all functionality
```

---

## 🧱 BankAccount.java

### Member Variables

| Variable | Type | Description |
|---|---|---|
| `checkingBalance` | `private double` | Balance in the checking account |
| `savingsBalance` | `private double` | Balance in the savings account |
| `accounts` | `private static int` | Total number of BankAccount instances |
| `totalMoney` | `private static double` | Sum of all checking and savings balances across all accounts |

### Constructor

- Initializes a new `BankAccount` instance
- Increments the static `accounts` counter on each instantiation

### Getters

- `getCheckingBalance()` — returns the checking balance
- `getSavingsBalance()` — returns the savings balance
- `getAccounts()` — returns the total number of accounts
- `getTotalMoney()` — returns the total money across all accounts

### Methods

| Method | Description |
|---|---|
| `deposit(double amount, String accountType)` | Deposits money into checking or savings; updates `totalMoney` |
| `withdraw(double amount, String accountType)` | Withdraws money from checking or savings; blocks if insufficient funds; updates `totalMoney` |
| `getBalance()` | Displays the total balance (checking + savings) for this account |

---

## 🧪 BankTest.java

The test class runs through the following scenarios with **3 bank accounts**:

- **Deposit Test** — Deposits money into each account's checking or savings and displays the balance each time. Each deposit increases `totalMoney`.
- **Withdrawal Test** — Withdraws money from each account's checking or savings and displays the remaining balance. Each withdrawal decreases `totalMoney`. Insufficient funds are rejected.
- **Static Test** — Prints the total number of bank accounts and the current `totalMoney`.

---

## ✅ Requirements

- `BankAccount` class with correct member variables and methods
- Users **cannot** set attributes directly (no public setters — encapsulation enforced)
- `BankTest` class tests every `BankAccount` method

---

## 🥷 Ninja Bonuses

- **Ninja Bonus 1** — Add an `accountNumber` attribute (can be `String`, `Long`, or another type)
- **Ninja Bonus 2** — Create a private method that generates a random 10-digit account number
- **Ninja Bonus 3** — Call the private method from the constructor so each account gets a unique 10-digit number at creation

---

## 💡 Concepts Practiced

- Object-Oriented Programming (OOP)
- Instance vs. static variables and methods
- Encapsulation (private fields, no public setters)
- Constructor logic
- Conditional logic for insufficient fund checks

---

## 🚀 How to Run

```bash
# Compile both files
javac BankAccount.java BankTest.java

# Run the test class
java BankTest
```

---

## 📚 Course

**Java Stack** — Axsos Academy | OOP Advanced Module
