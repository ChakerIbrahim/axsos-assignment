# Orders and Items

A simple Java console application demonstrating basic object-oriented programming concepts: class design, object instantiation, field access, and working with collections (`ArrayList`).

## Overview

This project simulates a small cafe ordering system. It models menu **items** (like coffee drinks) and customer **orders**, then exercises both through a test/driver class.

## Project Structure

```
OrdersandItems/
└── src/
    └── ordersanditems/
        ├── Item.java        # Represents a single menu item
        ├── Order.java       # Represents a customer's order
        └── TestOrder.java   # Driver class that creates and manipulates objects
```

## Classes

### `Item`
A simple data class representing a menu item.

| Field   | Type     | Description          |
|---------|----------|-----------------------|
| `name`  | `String` | Name of the item      |
| `price` | `double` | Price of the item     |

### `Order`
Represents a customer's order, which can contain multiple items.

| Field   | Type             | Description                          |
|---------|------------------|----------------------------------------|
| `name`  | `String`         | Customer's name                      |
| `total` | `double`         | Running total cost of the order      |
| `ready` | `boolean`        | Whether the order is ready for pickup|
| `items` | `ArrayList<Item>`| List of items in the order           |

### `TestOrder`
The driver class containing `main`. It:
1. Creates four menu items (mocha, latte, drip coffee, cappuccino)
2. Creates four orders (for Rami, Jimmy, Noah, and Sam)
3. Adds items to orders and updates running totals
4. Marks orders as ready
5. Prints out order details using `System.out.printf`

## How to Run

### Using Eclipse / an IDE
1. Import the project into Eclipse.
2. Right-click `TestOrder.java` → **Run As → Java Application**.

### Using the command line
```bash
cd src
javac ordersanditems/Item.java ordersanditems/Order.java ordersanditems/TestOrder.java
java ordersanditems.TestOrder
```

## Sample Output

```
ordersanditems.Order@1b6d3586
0.0
Name: Rami
Total: 0.0
Ready: true
Jimmy total: 3.5
Jimmy ready: true
Noah total: 4.5
Sam total: 12.0
```

> Note: The first printed line shows Java's default `Object.toString()` output (class name + memory hash), since `Order` does not override `toString()`.

## Concepts Practiced

- Defining classes with instance fields
- Creating objects with `new`
- Accessing and modifying object fields with dot notation
- Using `ArrayList` to store objects within another object
- Default values for uninitialized fields (`0.0` for `double`, `false` for `boolean`)
- Formatted output with `printf`
