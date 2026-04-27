# 🛒 Amazon - Product Categories ERD Assignment

## 📋 Overview

This assignment involves designing an **Entity Relationship Diagram (ERD)** for an Amazon-like product catalog. The wireframe shows products browsable by **Brand**, **Category**, and **Character** — and the goal is to model the underlying database structure that supports this UI.

---

## 🖼️ Wireframe Reference

The wireframe displays:
- A **Browse Products By** navigation bar with tabs: `Brand`, `Category`, `Character`
- An **Action Figures** category listing subcategories such as:
  - All Action Figures, Collectibles, Police/Fire/Rescue Figures, Science Fiction & Fantasy Figures
  - Accessories, Military Figures, Political Figures, Sports Figures
  - Animals, Playsets, Robots, Statues, Maquettes & Busts

---

## 🗃️ Database Schema

### Tables

#### `products`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `name` | VARCHAR(45) | Product name |
| `characters_id` | INT (FK) | References `characters.id` |
| `categories_id` | INT (FK) | References `categories.id` |

#### `brands`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `name` | VARCHAR(60) | Brand name |
| `products_id` | INT (FK) | References `products.id` |

#### `characters`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `name` | VARCHAR(60) | Character name |

#### `categories`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `name` | VARCHAR(45) | Category name (e.g., Action Figures, Accessories) |

---

## 🔗 Relationships

| Relationship | Type | Description |
|---|---|---|
| `brands` → `products` | One-to-Many | A brand can have many products |
| `products` → `categories` | Many-to-One | Many products belong to one category |
| `products` → `characters` | Many-to-One | Many products belong to one character |

---

## 🛠️ Tools Used

- **MySQL Workbench** — EER Diagram / ERD modeling
- **Axsos Academy** — Web Fundamentals course platform

---

## 📁 Files

| File | Description |
|---|---|
| `Amazon.mwb` | MySQL Workbench model file containing the EER diagram |

---

## 🚀 How to Open the Model

1. Install [MySQL Workbench](https://www.mysql.com/products/workbench/)
2. Open MySQL Workbench
3. Go to **File → Open Model**
4. Select `Amazon.mwb`
5. Navigate to the **EER Diagram** tab to view the entity relationships
