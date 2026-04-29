# 📝 Blogger Platform – MySQL ERD

A database design project for a blogging platform similar to [Blogspot](https://blogspot.com), built using **MySQL Workbench**. This ERD models a full-featured blog system where users can create blogs, write posts, manage co-administrators, leave comments, and track visitor activity.

---

## 📌 Project Overview

This project was completed as part of a **Web Fundamentals** course assignment. The goal was to design an Entity-Relationship Diagram (ERD) that accurately represents the data model for a multi-user blogging platform.

---

## ✅ Features Modeled

- **User Registration** – Users have a unique ID, first name, last name, email, and timestamps.
- **Blog Creation** – Users can create and own multiple blogs.
- **Co-Administrators** – Blog owners can invite other users as co-admins.
- **Posts** – Blog administrators can add and edit posts.
- **Comments** – Users can add and edit comments on posts.
- **File Uploads** – Files can be attached to blog posts.
- **Page Visit Tracking** – Logs page visited, visit time, duration, IP address, and user info.

---

## 🗂️ Tables

| Table | Description |
|---|---|
| `users` | Stores user account information |
| `blogs` | Represents individual blog spaces |
| `blog_admins` | Junction table linking users to blogs as co-admins |
| `posts` | Blog posts authored by admins |
| `comments` | Comments made on posts |
| `post_files` | Files/attachments associated with posts |
| `page_visits` | Tracks logged-in user activity and page views |
| `category` | Categories for organizing posts |

---

## 🛠️ Tools Used

- [MySQL Workbench](https://www.mysql.com/products/workbench/) – ERD design and modeling
- Schema name: `users_schema`

---

## 📁 File Structure

```
├── MySQL Model (users.mwb)   # MySQL Workbench model file
├── ERD Diagram.png           # Screenshot of the ERD
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

1. Open **MySQL Workbench**.
2. Go to **File → Open Model** and select `users.mwb`.
3. Navigate to the **EER Diagram** tab to view the full entity-relationship diagram.

---

## 📸 ERD Preview

> *(Add a screenshot of your final ERD diagram here)*

---

## 📚 Course

**Web Fundamentals Onsite** – MySQL Module  
Assignment: *Blogs ERD*
