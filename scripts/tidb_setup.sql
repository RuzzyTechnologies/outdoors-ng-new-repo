-- TiDB Cloud Database Setup Script for Outdoors Billboard Platform
-- Run this script in TiDB Cloud SQL Editor

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create states table
CREATE TABLE IF NOT EXISTS states (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create areas table
CREATE TABLE IF NOT EXISTS areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  state_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
);

-- Create billboards table
CREATE TABLE IF NOT EXISTS billboards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(500) NOT NULL,
  state VARCHAR(255) NOT NULL,
  area VARCHAR(255),
  category VARCHAR(255) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  size VARCHAR(100),
  image_url VARCHAR(1000),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  billboard_id INT NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  company_name VARCHAR(255),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (billboard_id) REFERENCES billboards(id) ON DELETE CASCADE
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Unipole', 'unipole', 'Large single-pole billboards visible from highways'),
('LED Screen', 'led-screen', 'Digital LED display screens for dynamic content'),
('Gantry', 'gantry', 'Bridge-style billboards spanning over roads'),
('Wall Drape', 'wall-drape', 'Building-mounted large format advertising'),
('BRT', 'brt', 'Bus Rapid Transit advertising spaces'),
('48 Sheet', '48-sheet', 'Standard 48-sheet billboard format'),
('Portrait', 'portrait', 'Vertical format billboard displays'),
('Rooftop', 'rooftop', 'Billboard mounted on building rooftops')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert Nigerian states
INSERT INTO states (name, slug) VALUES
('Lagos', 'lagos'),
('Abuja', 'abuja'),
('Kano', 'kano'),
('Rivers', 'rivers'),
('Oyo', 'oyo'),
('Kaduna', 'kaduna'),
('Edo', 'edo'),
('Delta', 'delta'),
('Anambra', 'anambra'),
('Cross River', 'cross-river'),
('Enugu', 'enugu'),
('Ogun', 'ogun')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample areas for Lagos
INSERT INTO areas (name, slug, state_id) VALUES
('Lekki', 'lekki', (SELECT id FROM states WHERE slug = 'lagos')),
('Victoria Island', 'victoria-island', (SELECT id FROM states WHERE slug = 'lagos')),
('Ikeja', 'ikeja', (SELECT id FROM states WHERE slug = 'lagos')),
('Ikoyi', 'ikoyi', (SELECT id FROM states WHERE slug = 'lagos')),
('Surulere', 'surulere', (SELECT id FROM states WHERE slug = 'lagos')),
('Yaba', 'yaba', (SELECT id FROM states WHERE slug = 'lagos')),
('Apapa', 'apapa', (SELECT id FROM states WHERE slug = 'lagos')),
('Maryland', 'maryland', (SELECT id FROM states WHERE slug = 'lagos'))
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample areas for Abuja
INSERT INTO areas (name, slug, state_id) VALUES
('Wuse', 'wuse', (SELECT id FROM states WHERE slug = 'abuja')),
('Garki', 'garki', (SELECT id FROM states WHERE slug = 'abuja')),
('Maitama', 'maitama', (SELECT id FROM states WHERE slug = 'abuja')),
('Asokoro', 'asokoro', (SELECT id FROM states WHERE slug = 'abuja')),
('Central Area', 'central-area', (SELECT id FROM states WHERE slug = 'abuja'))
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample billboards
INSERT INTO billboards (title, description, location, state, area, category, price, size, image_url, is_available, is_featured) VALUES
('Premium Lekki-Epe Expressway Unipole', 'High visibility unipole billboard on the busy Lekki-Epe Expressway with excellent traffic exposure.', 'Lekki-Epe Expressway, Before Chevron', 'Lagos', 'Lekki', 'Unipole', 2500000.00, '48ft x 24ft', '/large-unipole-billboard-on-highway-in-nigeria-with.jpg', true, true),
('Victoria Island LED Screen', 'Premium digital LED billboard in the heart of Victoria Island business district.', 'Adeola Odeku Street, Victoria Island', 'Lagos', 'Victoria Island', 'LED Screen', 5000000.00, '20ft x 10ft', '/digital-led-billboard-screen-displaying-colorful-a.jpg', true, true),
('Ikeja Along Gantry Billboard', 'Strategic gantry billboard on the busy Ikeja Along road with massive daily impressions.', 'Ikeja Along, Allen Avenue Junction', 'Lagos', 'Ikeja', 'Gantry', 3500000.00, '60ft x 20ft', '/large-gantry-billboard-structure-over-highway-with.jpg', true, true),
('Wuse Zone 5 Billboard', 'Prime billboard location in Wuse Zone 5, Abuja with high foot and vehicle traffic.', 'Wuse Zone 5, Herbert Macaulay Way', 'Abuja', 'Wuse', 'Unipole', 2000000.00, '40ft x 20ft', '/billboard-advertising-cityscape-lagos-nigeria.jpg', true, false),
('Garki Area 11 LED Display', 'Modern LED display screen in the commercial hub of Garki Area 11.', 'Garki Area 11, FCT', 'Abuja', 'Garki', 'LED Screen', 4500000.00, '16ft x 9ft', '/modern-led-billboard-at-night-in-lagos-nigeria-wit.jpg', true, true),
('Surulere Stadium Billboard', 'High-impact billboard near the National Stadium Surulere with sports event visibility.', 'Western Avenue, Near National Stadium', 'Lagos', 'Surulere', 'Wall Drape', 1800000.00, '30ft x 40ft', '/multiple-billboards-showcasing-brand-advertising-a.jpg', true, false)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Create indexes for better performance
CREATE INDEX idx_billboards_state ON billboards(state);
CREATE INDEX idx_billboards_category ON billboards(category);
CREATE INDEX idx_billboards_available ON billboards(is_available);
CREATE INDEX idx_billboards_featured ON billboards(is_featured);
CREATE INDEX idx_areas_state_id ON areas(state_id);
