-- Create category_product junction table for Supabase (PostgreSQL)
CREATE TABLE IF NOT EXISTS category_product (
  category_product_id INTEGER PRIMARY KEY,
  category_id INTEGER DEFAULT NULL,
  product_id INTEGER NOT NULL,
  date_created TIMESTAMPTZ NOT NULL,
  date_updated TIMESTAMPTZ NOT NULL
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_category_product_category_id ON category_product(category_id);
CREATE INDEX IF NOT EXISTS idx_category_product_product_id ON category_product(product_id);
