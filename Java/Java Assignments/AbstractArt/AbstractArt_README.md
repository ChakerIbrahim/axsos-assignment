# Abstract Art Assignment

## Overview

This project practices **abstract classes** and **inheritance** in Java through an art museum simulation. We create an abstract `Art` class and derive two concrete classes (`Painting` and `Sculpture`) from it, then store them together in a Museum.

---

## Project Structure

```
abstractart/
├── Art.java        # Abstract base class
├── Painting.java   # Extends Art, adds paintType
├── Sculpture.java  # Extends Art, adds material
└── Museum.java     # Main class — creates and displays art
```

---

## Class Diagram

```
         Art  (abstract)
        /    \
Painting    Sculpture
```

- `Art` is the **parent** (abstract)
- `Painting` and `Sculpture` are the **children** (concrete)
- Both children **inherit** title, author, description from Art
- Each child adds its own unique field

---

## Step-by-Step Implementation

### Step 1 — Create the Abstract Class `Art`

```java
public abstract class Art {
    private String title;
    private String author;
    private String description;

    public Art(String title, String author, String description) {
        this.title = title;
        this.author = author;
        this.description = description;
    }

    public abstract void viewArt();

    // Getters and Setters...
}
```

**Why abstract?**
- `Art` on its own is too generic — you'd never just create a plain "Art" object
- Making it abstract prevents `new Art()` and forces subclasses to implement `viewArt()`
- `viewArt()` is abstract because Painting and Sculpture display different information

---

### Step 2 — Create `Painting` class

```java
public class Painting extends Art {
    private String paintType; // Oil, Watercolor, Acrylic, etc.

    public Painting(String title, String author, String description, String paintType) {
        super(title, author, description); // call Art's constructor
        this.paintType = paintType;
    }

    @Override
    public void viewArt() {
        System.out.println("=== PAINTING ===");
        System.out.println("Title: " + getTitle());
        System.out.println("Author: " + getAuthor());
        System.out.println("Description: " + getDescription());
        System.out.println("Paint Type: " + paintType);
        System.out.println("================");
    }
}
```

**Key points:**
- `extends Art` → Painting inherits title, author, description
- `super(...)` → passes shared fields up to Art's constructor
- `paintType` is Painting's own unique field
- `@Override viewArt()` → Painting's specific way to display itself

---

### Step 3 — Create `Sculpture` class

```java
public class Sculpture extends Art {
    private String material; // Marble, Bronze, Porcelain, etc.

    public Sculpture(String title, String author, String description, String material) {
        super(title, author, description);
        this.material = material;
    }

    @Override
    public void viewArt() {
        System.out.println("=== SCULPTURE ===");
        System.out.println("Title: " + getTitle());
        System.out.println("Author: " + getAuthor());
        System.out.println("Description: " + getDescription());
        System.out.println("Material: " + material);
        System.out.println("=================");
    }
}
```

**Key points:**
- Same structure as Painting but with `material` instead of `paintType`
- `viewArt()` shows "SCULPTURE" and displays material

---

### Step 4 — Create `Museum` with 3 Paintings and 2 Sculptures

```java
public class Museum {
    public static void main(String[] args) {

        ArrayList<Art> museum = new ArrayList<Art>();

        // 3 Paintings
        museum.add(new Painting("Starry Night", "Van Gogh", "Swirling night sky", "Oil"));
        museum.add(new Painting("Mona Lisa", "Da Vinci", "Mysterious smile", "Oil"));
        museum.add(new Painting("Water Lilies", "Monet", "Pond reflections", "Watercolor"));

        // 2 Sculptures
        museum.add(new Sculpture("David", "Michelangelo", "Biblical hero", "Marble"));
        museum.add(new Sculpture("The Thinker", "Rodin", "Man in thought", "Bronze"));

        // Display all
        for (Art art : museum) {
            art.viewArt();
            System.out.println();
        }
    }
}
```

**Key points:**
- `ArrayList<Art>` can hold BOTH Paintings and Sculptures because both extend Art
- The for loop calls `viewArt()` on each — Java automatically calls the right version
- This is **polymorphism** in action

---

## Key Concepts Explained

### Abstract Class vs Regular Class

| Regular Class | Abstract Class |
|---|---|
| Can be instantiated (`new Art()`) | Cannot be instantiated |
| Methods all have bodies | Can have methods without bodies |
| Child classes choose what to override | Child classes MUST implement abstract methods |

---

### Why use `super()` in constructors?

```java
public Painting(String title, String author, String description, String paintType) {
    super(title, author, description); // ← sends these to Art's constructor
    this.paintType = paintType;        // ← Painting handles its own field
}
```

Without `super()`, the parent's fields (title, author, description) would never be set. `super()` must always be the **first line** in the child constructor.

---

### Polymorphism with ArrayList

```java
ArrayList<Art> museum = new ArrayList<Art>();
// Both work because Painting IS-A Art, Sculpture IS-A Art
museum.add(new Painting(...));
museum.add(new Sculpture(...));

for (Art art : museum) {
    art.viewArt(); // calls Painting's or Sculpture's version automatically
}
```

Java figures out at runtime which `viewArt()` to call. This is called **dynamic dispatch**.

---

## Expected Output

```
=== PAINTING ===
Title: Starry Night
Author: Vincent van Gogh
Description: A swirling night sky over a village
Paint Type: Oil
================

=== PAINTING ===
Title: Mona Lisa
Author: Leonardo da Vinci
Description: Portrait of a woman with a mysterious smile
Paint Type: Oil
================

=== PAINTING ===
Title: Water Lilies
Author: Claude Monet
Description: Reflections of water lilies in a pond
Paint Type: Watercolor
================

=== SCULPTURE ===
Title: David
Author: Michelangelo
Description: A marble statue of the biblical hero David
Material: Marble
=================

=== SCULPTURE ===
Title: The Thinker
Author: Auguste Rodin
Description: A man in deep thought sitting on a rock
Material: Bronze
=================
```

---

## How to Run

1. Create a new Java project in Eclipse
2. Create a package called `abstractart`
3. Create the four files: `Art.java`, `Painting.java`, `Sculpture.java`, `Museum.java`
4. Right-click `Museum.java` → Run As → Java Application

---

## Summary of OOP Concepts Used

| Concept | Where Used |
|---|---|
| **Abstract class** | `Art` — cannot be instantiated directly |
| **Abstract method** | `viewArt()` — defined in Art, implemented in subclasses |
| **Inheritance** | Painting and Sculpture both `extend Art` |
| **super()** | Child constructors pass shared fields to Art |
| **@Override** | Subclasses implement their own `viewArt()` |
| **Polymorphism** | `ArrayList<Art>` holds both Paintings and Sculptures |
| **Dynamic dispatch** | Loop calls correct `viewArt()` at runtime |

---

## Author
Chaker  
AXSOS Academy — Java Stack
