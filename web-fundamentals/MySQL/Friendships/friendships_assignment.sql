-- ============================================================
-- Assignment: Friendships
-- Web Fundamentals Onsite | MySQL Section
-- Objectives:
--   1. Practice creating databases
--   2. Practice SQL queries and self joins
-- ============================================================


-- ============================================================
-- STEP 1: Forward engineer the friendships schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS friendships_db;
USE friendships_db;

CREATE TABLE IF NOT EXISTS users (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name  VARCHAR(45) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friendships (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    friend_id  INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);


-- ============================================================
-- STEP 2: Create 6 new users
-- (matching the expected result table:
--  Amy Giver, Eli Byers, Big Bird, Kermit The Frog, Marky Mark, user 6)
-- ============================================================

INSERT INTO users (first_name, last_name) VALUES
    ('Amy',    'Giver'),      -- user 1
    ('Eli',    'Byers'),      -- user 2
    ('Big',    'Bird'),       -- user 3
    ('Kermit', 'The Frog'),   -- user 4
    ('Marky',  'Mark'),       -- user 5
    ('Extra',  'User');       -- user 6


-- ============================================================
-- STEP 3: Create friendships
-- ============================================================

-- User 1 (Amy) is friends with users 2, 4, and 6
INSERT INTO friendships (user_id, friend_id) VALUES
    (1, 2),
    (1, 4),
    (1, 6);

-- User 2 (Eli) is friends with users 1, 3, and 5
INSERT INTO friendships (user_id, friend_id) VALUES
    (2, 1),
    (2, 3),
    (2, 5);

-- User 3 (Big) is friends with users 2 and 5
INSERT INTO friendships (user_id, friend_id) VALUES
    (3, 2),
    (3, 5);

-- User 4 (Kermit) is friends with user 3
INSERT INTO friendships (user_id, friend_id) VALUES
    (4, 3);

-- User 5 (Marky) is friends with users 1 and 6
INSERT INTO friendships (user_id, friend_id) VALUES
    (5, 1),
    (5, 6);

-- User 6 is friends with users 2 and 3
INSERT INTO friendships (user_id, friend_id) VALUES
    (6, 2),
    (6, 3);


-- ============================================================
-- STEP 4: Display the relationships (self join)
-- Returns: first_name, last_name, friend_first_name, friend_last_name
-- ============================================================

SELECT
    u1.first_name            AS first_name,
    u1.last_name             AS last_name,
    u2.first_name            AS friend_first_name,
    u2.last_name             AS friend_last_name
FROM users u1
JOIN friendships f  ON u1.id = f.user_id
JOIN users u2       ON f.friend_id = u2.id;


-- ============================================================
-- NINJA QUERY 1: Return all users who are friends with user 1,
-- and make sure their names are displayed in the results
-- ============================================================

SELECT
    u2.first_name AS friend_first_name,
    u2.last_name  AS friend_last_name
FROM friendships f
JOIN users u2 ON f.friend_id = u2.id
WHERE f.user_id = 1;


-- ============================================================
-- NINJA QUERY 2: Return the count of all friendships
-- ============================================================

SELECT COUNT(*) AS total_friendships
FROM friendships;


-- ============================================================
-- NINJA QUERY 3: Find who has the most friends
-- and return the count of their friends
-- ============================================================

SELECT
    u.first_name,
    u.last_name,
    COUNT(f.friend_id) AS friend_count
FROM users u
JOIN friendships f ON u.id = f.user_id
GROUP BY u.id
ORDER BY friend_count DESC
LIMIT 1;


-- ============================================================
-- NINJA QUERY 4: Return the friends of user 3 in alphabetical order
-- ============================================================

SELECT
    u2.first_name AS friend_first_name,
    u2.last_name  AS friend_last_name
FROM friendships f
JOIN users u2 ON f.friend_id = u2.id
WHERE f.user_id = 3
ORDER BY u2.first_name ASC, u2.last_name ASC;
