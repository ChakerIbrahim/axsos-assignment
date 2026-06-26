# Coffee App ☕

A Java interactive terminal application that simulates a coffee shop kiosk. Users can view a menu, enter their name, pick items by number, and receive a printed order with a total.

---

## 📋 Assignment Overview

The owners of Cafe Java wanted to develop their codebase into a comprehensive interactive application with a retro terminal feel — similar to vintage computers like the Apple II or Commodore 64. Users interact with text prompts in a terminal and can press 'q' to exit.

---

## 📁 Project Structure

```
CoffeeApp
└── src
     └── com.axsos.coffeeapp
          ├── Item.java           # Blueprint for one menu item
          ├── Order.java          # Blueprint for one customer order
          ├── CoffeeKiosk.java    # The kiosk engine (menu + order logic)
          └── Main.java           # Entry point - starts the app
```

---

## 🏗️ How The Classes Work Together

```
Main.java
    ↓ creates
CoffeeKiosk
    ↓ manages
ArrayList<Item> menu        ← filled by addMenuItem()
ArrayList<Order> orders     ← filled by newOrder()
    ↓
addMenuItem() → creates Item objects → stores in menu
displayMenu() → reads Item objects  → prints them
newOrder()    → creates Order → adds Items → prints Order
```

---

## 🔧 Class Breakdown

### 1. Item.java
Represents **one single menu item**

| Variable | Type | Example |
|----------|------|---------|
| `name` | String | "coffee" |
| `price` | double | 1.50 |
| `index` | int | 1 |

```java
Item coffee = new Item("coffee", 1.50);
coffee.setIndex(1);
```

---

### 2. Order.java
Represents **one customer's order**

| Variable | Type | Example |
|----------|------|---------|
| `customerName` | String | "John" |
| `items` | ArrayList\<Item\> | [coffee, cappuccino] |

Key methods:
- `addItem(Item item)` → adds item to the order
- `printOrder()` → prints all items and total

```
Order for: John
  - coffee -- $1.5
  - cappuccino -- $3.0
Total: $4.5
```

---

### 3. CoffeeKiosk.java
The **main engine** — manages the menu and all orders

| Method | What it does |
|--------|-------------|
| `addMenuItem(name, price)` | Creates an Item and adds it to the menu |
| `displayMenu()` | Prints all items with index and price |
| `newOrder()` | Takes user input to build and print an order |

---

### 4. Main.java
The **entry point** — creates the kiosk, fills the menu, and starts taking orders

```java
CoffeeKiosk kiosk = new CoffeeKiosk();

kiosk.addMenuItem("banana", 2.00);
kiosk.addMenuItem("coffee", 1.50);
kiosk.addMenuItem("latte", 4.50);
kiosk.addMenuItem("cappuccino", 3.00);
kiosk.addMenuItem("muffin", 4.00);

kiosk.displayMenu();
kiosk.newOrder();
```

---

## 🚀 How to Run

### Prerequisites
- Java JDK 17+
- Eclipse IDE (or any Java IDE)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/coffee-app.git
cd coffee-app
```

2. **Open in Eclipse**
   - File → Open Projects from File System
   - Select the project folder
   - Click Finish

3. **Run the project**
   - Right-click `Main.java`
   - Click **Run As** → **Java Application**

---

## 📤 Expected Output

```
0 banana -- $2.0
1 coffee -- $1.5
2 latte -- $4.5
3 cappuccino -- $3.0
4 muffin -- $4.0

Please enter customer name for new order:
> John

Please enter a menu item index or q to quit:
> 1
Please enter a menu item index or q to quit:
> 3
Please enter a menu item index or q to quit:
> q

Order for: John
  - coffee -- $1.5
  - cappuccino -- $3.0
Total: $4.5
```

---

## 💡 Key Concepts Used

| Concept | Usage |
|---------|-------|
| Classes & Objects | Item, Order, CoffeeKiosk |
| `ArrayList<Item>` | Stores all menu items |
| `ArrayList<Order>` | Stores all customer orders |
| Getters & Setters | All 3 classes |
| Constructors | Item, Order, CoffeeKiosk |
| `while` loop | Keeps asking for items until user types "q" |
| `Integer.parseInt()` | Converts "1" (String) → 1 (int) |
| `.equals()` | Compares strings safely |
| `Scanner` | Reads user input from terminal |
| `menu.size()` | Assigns correct index to each new item |

---

## ⚠️ Important Notes

- Use `Scanner` instead of `System.console()` when running in Eclipse
- Each class must be in its **own separate file**
- All files must have the **same package name** at the top
- Use `.equals()` to compare strings, never `==`

---

## 🔗 Resources

- [Java ArrayList Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
- [Java Scanner Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html)
- [Java OOP Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/)
