# 🥋 Belts - Belt Certifications ERD Assignment

## 📋 Overview

This assignment involves designing an **Entity Relationship Diagram (ERD)** for a Belt Certification tracking system. The wireframe shows a table of players and their earned belt levels — and the goal is to model the underlying database structure that supports this UI.

---

## 🖼️ Wireframe Reference

The wireframe displays a web page with a table of:

| Name | Belts |
|---|---|
| Andrew Lee | yellow, red, black |
| Jay Patel | yellow, red, black |
| Kobe | yellow |

Each player can hold multiple belt certifications, indicating a **one-to-many** relationship between players and belts.

---

## 🗃️ Database Schema

### Tables

#### `players`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `players_name` | VARCHAR(55) | Player's full name |
| `created_at` | DATETIME | Record creation timestamp |
| `updated_at` | DATETIME | Record update timestamp |
| *(+1 more)* | — | Additional column (hidden in diagram) |

#### `belts`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Primary key |
| `belt_type` | VARCHAR(75) | Belt level/color (e.g., yellow, red, black) |
| `created_at` | DATETIME | Record creation timestamp |
| `updated_at` | DATETIME | Record update timestamp |

---

## 🔗 Relationships

| Relationship | Type | Description |
|---|---|---|
| `players` → `belts` | One-to-Many | A player can earn many belt certifications |

---

## 🛠️ Tools Used

- **MySQL Workbench** — EER Diagram / ERD modeling
- **Axsos Academy** — Web Fundamentals course platform

---

## 📁 Files

| File | Description |
|---|---|
| `Belts.mwb` | MySQL Workbench model file containing the EER diagram |

---

## 🚀 How to Open the Model

1. Install [MySQL Workbench](https://www.mysql.com/products/workbench/)
2. Open MySQL Workbench
3. Go to **File → Open Model**
4. Select `Belts.mwb`
5. Navigate to the **EER Diagram** tab to view the entity relationships
