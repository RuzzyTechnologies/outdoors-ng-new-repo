-- Create billboards table
CREATE TABLE IF NOT EXISTS billboards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  state VARCHAR(100),
  city VARCHAR(100),
  area VARCHAR(100),
  address TEXT,
  price DECIMAL(10, 2),
  size VARCHAR(100),
  width DECIMAL(8, 2),
  height DECIMAL(8, 2),
  type VARCHAR(100),
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'available',
  image_url TEXT,
  images JSONB,
  featured BOOLEAN DEFAULT false,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  visibility VARCHAR(100),
  traffic_count INTEGER,
  illuminated BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_billboards_state ON billboards(state);
CREATE INDEX IF NOT EXISTS idx_billboards_city ON billboards(city);
CREATE INDEX IF NOT EXISTS idx_billboards_status ON billboards(status);
CREATE INDEX IF NOT EXISTS idx_billboards_featured ON billboards(featured);
CREATE INDEX IF NOT EXISTS idx_billboards_type ON billboards(type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_billboards_updated_at BEFORE UPDATE ON billboards
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
