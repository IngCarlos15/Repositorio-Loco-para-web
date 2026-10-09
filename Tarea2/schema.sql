
CREATE DATABASE IF NOT EXISTS shop_db;
USE shop_db;


CREATE TABLE IF NOT EXISTS products 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  description TEXT NOT NULL,
  brand VARCHAR(100) NULL,
  img TEXT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);


INSERT INTO products (name, price, stock, description, brand) 
VALUES 
  ('Super laptop gamer with 2 GB RAM', 16000, 10, 'Laptop to play and development', 'little ducky'),
  ('Cheap Mouse from Walmart', 200, 30, 'Mouse', 'Walmart ducky'),
  ('Cellphone', 500, 15, 'Cellphone with 1 GB RAM', 'OXXO');