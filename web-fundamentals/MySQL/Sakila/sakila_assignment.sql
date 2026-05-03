-- ============================================================
-- Assignment: Sakila
-- Web Fundamentals Onsite | MySQL Section
-- Objective: Practice SQL queries using the Sakila database
-- ============================================================


-- Query 1: Get all customers inside city_id = 312
-- Returns: first_name, last_name, email, address
SELECT cu.first_name, cu.last_name, cu.email, a.address
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
WHERE a.city_id = 312;


-- Query 2: Get all comedy films
-- Returns: title, description, release_year, rating, special_features, genre (category)
SELECT f.title, f.description, f.release_year, f.rating, f.special_features, c.name AS genre
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Comedy';


-- Query 3: Get all films joined by actor_id = 5
-- Returns: actor_id, actor_name, title, description, release_year
SELECT a.actor_id, CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
       f.title, f.description, f.release_year
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON fa.film_id = f.film_id
WHERE a.actor_id = 5;


-- Query 4: Get all customers in store_id = 1 and inside cities (1, 42, 312, 459)
-- Returns: first_name, last_name, email, address
SELECT cu.first_name, cu.last_name, cu.email, a.address
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
WHERE cu.store_id = 1
  AND a.city_id IN (1, 42, 312, 459);


-- Query 5: Get all films with rating = 'G' and special_feature 'Behind the Scenes', joined by actor_id = 15
-- Returns: title, description, release_year, rating, special_features
-- Hint: uses LIKE to match 'Behind the Scenes'
SELECT f.title, f.description, f.release_year, f.rating, f.special_features
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
WHERE f.rating = 'G'
  AND f.special_features LIKE '%Behind the Scenes%'
  AND fa.actor_id = 15;


-- Query 6: Get all actors joining film_id = 369
-- Returns: film_id, title, actor_id, actor_name
SELECT fa.film_id, f.title, a.actor_id,
       CONCAT(a.first_name, ' ', a.last_name) AS actor_name
FROM film_actor fa
JOIN film f ON fa.film_id = f.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE fa.film_id = 369;


-- Query 7: Get all drama films with a rental rate of 2.99
-- Returns: title, description, release_year, rating, special_features, genre (category)
SELECT f.title, f.description, f.release_year, f.rating, f.special_features, c.name AS genre
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Drama'
  AND f.rental_rate = 2.99;


-- Query 8: Get all action films joined by SANDRA KILMER
-- Returns: title, description, release_year, rating, special_features, genre, first_name, last_name
SELECT f.title, f.description, f.release_year, f.rating, f.special_features,
       c.name AS genre, a.first_name, a.last_name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE c.name = 'Action'
  AND a.first_name = 'SANDRA'
  AND a.last_name = 'KILMER';
