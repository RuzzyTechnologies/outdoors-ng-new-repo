import { query, queryOne, insert, execute } from './tidb';

export interface Billboard {
  id: number;
  title: string;
  description: string;
  location: string;
  state: string;
  area: string;
  category: string;
  price: number;
  size: string;
  image_url: string;
  latitude: number | null;
  longitude: number | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: Date;
}

export interface State {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
}

export interface Area {
  id: number;
  name: string;
  slug: string;
  state_id: number;
  state_name?: string;
  created_at: Date;
}

// Billboard CRUD operations
export async function getAllBillboards(): Promise<Billboard[]> {
  return query<Billboard>('SELECT * FROM billboards ORDER BY created_at DESC');
}

export async function getBillboardById(id: number): Promise<Billboard | null> {
  return queryOne<Billboard>('SELECT * FROM billboards WHERE id = ?', [id]);
}

export async function getFeaturedBillboards(): Promise<Billboard[]> {
  return query<Billboard>(
    'SELECT * FROM billboards WHERE is_featured = true AND is_available = true ORDER BY created_at DESC LIMIT 6'
  );
}

export async function getBillboardsByState(state: string): Promise<Billboard[]> {
  return query<Billboard>(
    'SELECT * FROM billboards WHERE state = ? AND is_available = true ORDER BY created_at DESC',
    [state]
  );
}

export async function getBillboardsByCategory(category: string): Promise<Billboard[]> {
  return query<Billboard>(
    'SELECT * FROM billboards WHERE category = ? AND is_available = true ORDER BY created_at DESC',
    [category]
  );
}

export async function searchBillboards(
  searchTerm?: string,
  state?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<Billboard[]> {
  let sql = 'SELECT * FROM billboards WHERE is_available = true';
  const params: any[] = [];

  if (searchTerm) {
    sql += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
    const term = `%${searchTerm}%`;
    params.push(term, term, term);
  }

  if (state) {
    sql += ' AND state = ?';
    params.push(state);
  }

  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }

  if (minPrice !== undefined) {
    sql += ' AND price >= ?';
    params.push(minPrice);
  }

  if (maxPrice !== undefined) {
    sql += ' AND price <= ?';
    params.push(maxPrice);
  }

  sql += ' ORDER BY created_at DESC';

  return query<Billboard>(sql, params);
}

export async function createBillboard(data: Omit<Billboard, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const sql = `
    INSERT INTO billboards (title, description, location, state, area, category, price, size, image_url, latitude, longitude, is_available, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  return insert(sql, [
    data.title,
    data.description,
    data.location,
    data.state,
    data.area,
    data.category,
    data.price,
    data.size,
    data.image_url,
    data.latitude,
    data.longitude,
    data.is_available,
    data.is_featured,
  ]);
}

export async function updateBillboard(id: number, data: Partial<Billboard>): Promise<number> {
  const fields: string[] = [];
  const params: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'created_at') {
      fields.push(`${key} = ?`);
      params.push(value);
    }
  });

  if (fields.length === 0) return 0;

  params.push(id);
  const sql = `UPDATE billboards SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`;
  return execute(sql, params);
}

export async function deleteBillboard(id: number): Promise<number> {
  return execute('DELETE FROM billboards WHERE id = ?', [id]);
}

// Category operations
export async function getAllCategories(): Promise<Category[]> {
  return query<Category>('SELECT * FROM categories ORDER BY name ASC');
}

export async function createCategory(name: string, slug: string, description: string): Promise<number> {
  return insert(
    'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
    [name, slug, description]
  );
}

export async function deleteCategory(id: number): Promise<number> {
  return execute('DELETE FROM categories WHERE id = ?', [id]);
}

// State operations
export async function getAllStates(): Promise<State[]> {
  return query<State>('SELECT * FROM states ORDER BY name ASC');
}

export async function createState(name: string, slug: string): Promise<number> {
  return insert('INSERT INTO states (name, slug) VALUES (?, ?)', [name, slug]);
}

export async function deleteState(id: number): Promise<number> {
  return execute('DELETE FROM states WHERE id = ?', [id]);
}

// Area operations
export async function getAllAreas(): Promise<Area[]> {
  return query<Area>(`
    SELECT a.*, s.name as state_name 
    FROM areas a 
    LEFT JOIN states s ON a.state_id = s.id 
    ORDER BY s.name ASC, a.name ASC
  `);
}

export async function getAreasByState(stateId: number): Promise<Area[]> {
  return query<Area>('SELECT * FROM areas WHERE state_id = ? ORDER BY name ASC', [stateId]);
}

export async function createArea(name: string, slug: string, stateId: number): Promise<number> {
  return insert('INSERT INTO areas (name, slug, state_id) VALUES (?, ?, ?)', [name, slug, stateId]);
}

export async function deleteArea(id: number): Promise<number> {
  return execute('DELETE FROM areas WHERE id = ?', [id]);
}
