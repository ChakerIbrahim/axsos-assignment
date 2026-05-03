-- MySQL Workbench Setup Assignment
-- Connect to database
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

-- Create table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    email VARCHAR(100)
);

-- INSERT (Create)
INSERT INTO students (name, age, email) VALUES
('Ali Ahmad', 20, 'ali@example.com'),
('Sara Khaled', 22, 'sara@example.com'),
('Omar Youssef', 19, 'omar@example.com');

-- SELECT (Read)
SELECT * FROM students;

-- UPDATE
UPDATE students
SET age = 21
WHERE name = 'Ali Ahmad';

-- DELETE
DELETE FROM students
WHERE name = 'Omar Youssef';

-- Final SELECT to confirm changes
SELECT * FROM students;
