-- Drop existing category table if it exists
DROP TABLE IF EXISTS category;

-- Create category table for Supabase (PostgreSQL)
CREATE TABLE IF NOT EXISTS category (
  category_id INTEGER PRIMARY KEY,
  parent_id INTEGER DEFAULT NULL,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  date_added TIMESTAMPTZ NOT NULL,
  date_updated TIMESTAMPTZ NOT NULL,
  category INTEGER NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_category_parent ON category(parent_id);
CREATE INDEX IF NOT EXISTS idx_category_url ON category(url);
