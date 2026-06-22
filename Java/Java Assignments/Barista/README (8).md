# ☕ Barista Assignment — Java OOP

A Java program that simulates a coffee shop ordering system using Object-Oriented Programming concepts including constructors, getters, setters, ArrayLists, and encapsulated methods.

---

## 📋 Overview

This project implements an `Order` and `Items` class that models a real-world barista ordering system. Customers can have items added to their order, check the total price, get a status message, and display a full order summary.

---

## 🗂️ Project Structure

```
Barista/
├── Items.java      # Represents a menu item with a name and price
├── Order.java      # Represents a customer order with items and status
└── Test.java       # Test class to validate all functionality
```

---

## 🧱 Items.java

Represents a single menu item.

### Member Variables

| Variable | Type | Description |
|---|---|---|
| `name` | `private String` | Name of the item (e.g. "Drip Coffee") |
| `price` | `private double` | Price of the item (e.g. 1.50) |

### Constructor

```java
public Items(String name, double price)
```

### Methods

| Method | Description |
|---|---|
| `getName()` | Returns the item's name |
| `getPrice()` | Returns the item's price |
| `setName(String name)` | Sets the item's name |
| `setPrice(double price)` | Sets the item's price |

---

## 🧱 Order.java

Represents a customer's order containing multiple items.

### Member Variables

| Variable | Type | Description |
|---|---|---|
| `name` | `private String` | Customer's name |
| `ready` | `private boolean` | Whether the order is ready |
| `items` | `private ArrayList<Items>` | List of items in the order |

### Constructors

```java
public Order(String name)                    // ready defaults to false
public Order(String name, boolean ready)     // full constructor
```

### Methods

| Method | Description |
|---|---|
| `getName()` | Returns the customer's name |
| `getReady()` | Returns whether the order is ready |
| `getItems()` | Returns the list of items |
| `setName(String name)` | Sets the customer's name |
| `setReady(boolean ready)` | Marks the order as ready or not |
| `additem(Items item)` | Adds an item to the order |
| `getOrderTotal()` | Calculates and returns the total price of all items |
| `getStatusMessage()` | Returns a message based on the order's ready status |
| `display()` | Prints the full order summary to the console |

---

## 🧪 Test.java

Tests all methods with two orders:

```java
Items dripCoffee = new Items("Drip Coffee", 1.50);
Items cappuccino = new Items("Cappuccino", 3.50);

Order order1 = new Order("Guest");
Order order2 = new Order("Jalil");

order1.additem(dripCoffee);
order1.additem(cappuccino);

System.out.println(order1.getOrderTotal());    // 5.0
order1.setReady(true);
System.out.println(order1.getStatusMessage()); // Your order is ready!
order1.display();
```

### Expected Output

```
5.0
Your order is ready!
Customer Name: Guest
Drip Coffee - $1.50
Cappuccino - $3.50
Total: $5.00
```

---

## ✅ Assignment Requirements

- Implement `Order` and `Items` classes as described
- Create a test file to test each method
- Create two orders for guests whose names are unspecified (use `"Guest"`)
- Create three orders using the overloaded constructor, assigning a unique name to each
- Implement `additem`, `getStatusMessage`, `getOrderTotal`, and `display` within the `Order` class
- Use the `additem` method to add at least two items to each order

---

## 💡 Concepts Practiced

- Object-Oriented Programming (OOP)
- Encapsulation (private fields, getters & setters)
- Constructors and method overloading
- `ArrayList` for dynamic item storage
- Loops for iterating over items
- Conditional logic for status messages

---

## 🚀 How to Run

```bash
# Compile all files
javac Items.java Order.java Test.java

# Run the test class
java Test
```

---

## 📚 Course

**Java Stack** — Axsos Academy | OOP Advanced Module
