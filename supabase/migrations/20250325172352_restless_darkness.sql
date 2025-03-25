/*
  # Initial Schema Setup for Grocery Comparison App

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `logo_url` (text)
      - `created_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image_url` (text)
      - `category` (text)
      - `created_at` (timestamp)
    
    - `prices`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `store_id` (uuid, foreign key)
      - `price` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Add policies for admin users to manage data
*/

-- Create stores table
CREATE TABLE stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create prices table
CREATE TABLE prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  price decimal NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

-- Create policies for stores
CREATE POLICY "Allow public read access to stores"
  ON stores
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage stores"
  ON stores
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@example.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@example.com');

-- Create policies for products
CREATE POLICY "Allow public read access to products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage products"
  ON products
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@example.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@example.com');

-- Create policies for prices
CREATE POLICY "Allow public read access to prices"
  ON prices
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage prices"
  ON prices
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@example.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@example.com');

-- Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_prices_product_id ON prices(product_id);
CREATE INDEX idx_prices_store_id ON prices(store_id);