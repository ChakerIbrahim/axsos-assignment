# 🍽️ Yelp - Food Reviews ERD Assignment

## 📋 Overview

This assignment involves designing an **Entity Relationship Diagram (ERD)** for a Yelp-like food review platform. The wireframe shows a list of restaurants with ratings, review counts, and user review snippets — and the goal is to model the underlying database structure that supports this UI.

---

## 🖼️ Wireframe Reference

The wireframe displays:
- A **Restaurants** section listing ranked restaurants
- Each restaurant shows: name, star rating, review count, a user avatar, and a review snippet

---

## 🗃️ Database Schema

### Tables

#### `restaurants`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `name` | VARCHAR(90) | Restaurant name |
| `created_at` | DATETIME | Record creation timestamp |
| `updated_at` | DATETIME | Record update timestamp |
| `reviews` | VARCHAR(255) | Review text content |
| `review_stars` | INT | Star rating (1–5) |

#### `foods`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `menu` | VARCHAR(100) | Menu item name |
| `created_at` | DATETIME | Record creation timestamp |
| `updated_at` | DATETIME | Record update timestamp |

#### `restaurants_has_foods` *(Join Table)*
| Column | Type | Description |
|---|---|---|
| `restaurants_id` | INT (FK) | References `restaurants.id` |
| `foods_id` | INT (FK) | References `foods.id` |

---

## 🔗 Relationships

- A **restaurant** can have many **foods** (menu items)
- A **food** can belong to many **restaurants**
- This is a **many-to-many** relationship handled via the `restaurants_has_foods` join table

---

## 🛠️ Tools Used

- **MySQL Workbench** — EER Diagram / ERD modeling
- **Axsos Academy** — Web Fundamentals course platform

---

## 📁 Files

| File | Description |
|---|---|
| `Yelp.mwb` | MySQL Workbench model file containing the EER diagram |

---

## 🚀 How to Open the Model

1. Install [MySQL Workbench](https://www.mysql.com/products/workbench/)
2. Open MySQL Workbench
3. Go to **File → Open Model**
4. Select `Yelp.mwb`
5. Navigate to the **EER Diagram** tab to view the entity relationships
