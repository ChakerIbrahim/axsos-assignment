# 👍 Likes Feature – MySQL Database Assignment

A database schema designed to support a **social media-style Likes system**, built as part of the **Web Fundamentals Onsite** course at [Axsos Academy](https://learn.axsos.academy).

---

## 📋 Assignment Overview

This assignment focuses on:
- Analyzing a wireframe to identify required database tables
- Setting up relationships between tables
- Renaming foreign keys to follow singular naming conventions

---

## 🗂️ Database Schema

The schema consists of **4 tables** modeled using MySQL Workbench:

### `users`
| Column | Type |
|---|---|
| id | INT (PK) |
| picture | VARCHAR(255) |
| user_name | VARCHAR(60) |
| created_at | DATETIME |
| updated_at | DATETIME |

### `posts`
| Column | Type |
|---|---|
| post | INT (PK) |
| text | TEXT |
| picture | VARCHAR(100) |
| user_id | VARCHAR(45) (FK → users) |

### `comments`
| Column | Type |
|---|---|
| id | INT (PK) |
| comments | VARCHAR(255) |
| created_at | DATETIME |
| updated_at | DATETIME |
| users_id | INT (FK → users) |
| posts_post | INT (FK → posts) |

### `likes`
| Column | Type |
|---|---|
| id | INT (PK) |
| likes_counter | INT |
| id_user | INT |
| user_id | INT (FK → users) |
| post_id | INT (FK → posts) |

---

## 🔗 Relationships

- A **user** can have many **posts** (one-to-many)
- A **user** can have many **comments** (one-to-many)
- A **post** can have many **comments** (one-to-many)
- A **post** can have many **likes** (one-to-many)
- A **user** can give many **likes** (one-to-many)

---

## 🛠️ Tools Used

- **MySQL Workbench** – EER Diagram / schema design
- **MySQL** – Database engine

---

## 🚀 How to Use

1. Open MySQL Workbench
2. Import the `Likes.mwb` model file
3. Use **Database → Forward Engineer** to generate and run the SQL schema
4. Alternatively, run the exported `.sql` file directly in your MySQL server:

```bash
mysql -u root -p your_database < likes_schema.sql
```

---

## 📚 Course

**Web Fundamentals Onsite** – Axsos Academy  
Module: **MySQL** (19/41 completed)

---

## 👤 Author

Built by a student at Axsos Academy as part of the MySQL module assignments.
