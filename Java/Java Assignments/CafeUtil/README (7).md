# ☕ Java Cafe — CafeUtil Library

A Java utility library built as part of the **Axsos Academy Java Stack** course. This project simulates a café management system by implementing reusable methods for calculating streak goals, order totals, displaying menus, and managing customers.

---

## 📁 Project Structure

```
JavaAssignments/
├── CafeUtil/
│   └── src/
│       └── CafeUtil/
│           ├── CafeUtil.java      # All utility methods
│           └── TestCafe.java      # Test file
```

---

## 🛠️ Methods

### `int getStreakGoal()`
Calculates the total number of purchases needed after 10 weeks by summing every consecutive integer from 1 to 10.

**Returns:** `55`

```java
public int getStreakGoal() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    return sum;
}
```

---

### `double getOrderTotal(double[] prices)`
Calculates the total cost of an order by summing all item prices in a given array.

**Example:**
```java
double[] items = {3.5, 1.5, 4.0, 4.5};
getOrderTotal(items); // returns 13.5
```

---

### `void displayMenu(ArrayList<String> menuItems)`
Prints each menu item alongside its index number.

**Example output:**
```
0 drip coffee
1 cappuccino
2 latte
3 mocha
```

---

### `void addCustomer(ArrayList<String> customers)`
Interactively adds a new customer to the waiting list. Prompts for their name, greets them, and shows how many people are ahead of them.

**Example output:**
```
Enter your name please
Hello, John!
There are 2 people in front of you
[Alice, Bob, John]
```

---

## 🧪 How to Test

The `TestCafe.java` file contains test cases for all 4 methods.

1. Open the project in **Eclipse IDE**
2. Right-click `TestCafe.java`
3. Select **Run As → Java Application**
4. Enter your name when prompted during the Add Customer test

**Expected output:**
```
----- Streak Goal Test -----
Purchases needed by week 10: 55

----- Order Total Test -----
Order total: 13.5

----- Display Menu Test -----
0 drip coffee
1 cappuccino
2 latte
3 mocha

----- Add Customer Test -----
Enter your name please
```

---

## 💡 Concepts Practiced

| Concept | Where Used |
|---|---|
| For loops | `getStreakGoal`, `getOrderTotal`, `displayMenu` |
| Arrays | `getOrderTotal` |
| ArrayLists | `displayMenu`, `addCustomer` |
| Return types (`int`, `double`, `void`) | All methods |
| User input (Scanner) | `addCustomer` |
| Class instantiation | `TestCafe.java` |

---

## ⚙️ Setup

**Requirements:**
- Java JDK 21+
- Eclipse IDE

**Clone the repo:**
```bash
git clone https://github.com/your-username/java-cafe.git
```

---

## 📚 Course

**Axsos Academy — Java Stack**  
Module: Java Fundamentals  
Assignment: Java Cafe (CafeUtil Library)
