-- FIRST

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description TEXT,
  price INTEGER
);

CREATE TABLE IF NOT EXISTS stocks(
  product_id uuid,
  count INTEGER DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (title, description, price) VALUES
('Blue', 'Blue color', 10),
('Yellow', 'Yellow color', 100),
('Black', 'Black color', 4),
('Red', 'Red color', 10),
('Brown', 'Brown color', 12),
('Green', 'Green color', 9),
('Pink', 'Pink color', 17);

-- SECOND

INSERT INTO stocks (product_id, count) VALUES
('6c6f518f-6399-489b-8f6a-3465fbfeba53', 15),
('81625810-bdda-4e19-b9ba-816f9307c3dd', 15),
('a85baa7b-7131-469d-b43d-95ed39331fb1', 15),
('b103d4c8-4a85-4215-99b5-bd642597fba2', 15),
('c9915cbd-6f17-4185-8a24-747e57872c2f', 15),
('e122a5ab-61dc-41ad-a7c3-c3f65a3d5bdb', 15),
('e9cc921c-7f08-4279-bc91-f073a9946fb9', 15);
