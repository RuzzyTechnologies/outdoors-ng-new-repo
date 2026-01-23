/**
 * MySQL API Client
 * Connects to your external MySQL database via the PHP API
 */

const API_URL = process.env.MYSQL_API_URL || '';
const API_KEY = process.env.MYSQL_API_KEY || '';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  id?: number;
  affected?: number;
}

async function apiRequest<T = any>(
  action: string,
  params: Record<string, string | number> = {},
  body?: Record<string, any>,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
): Promise<ApiResponse<T>> {
  if (!API_URL) {
    throw new Error('MYSQL_API_URL environment variable is not set');
  }

  const queryParams = new URLSearchParams({
    action,
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  });

  const url = `${API_URL}?${queryParams.toString()}`;

  const options: RequestInit = {
    method: body ? 'POST' : method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    cache: 'no-store',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// ============ CRUD Operations ============

/**
 * Get all records from a table
 */
export async function getAll<T = any>(
  table: string,
  options: { limit?: number; offset?: number } = {}
): Promise<T[]> {
  const response = await apiRequest<T[]>('getAll', {
    table,
    limit: options.limit || 100,
    offset: options.offset || 0,
  });
  return response.data || [];
}

/**
 * Get a single record by ID
 */
export async function getOne<T = any>(
  table: string,
  id: number
): Promise<T | null> {
  try {
    const response = await apiRequest<T>('getOne', { table, id });
    return response.data || null;
  } catch {
    return null;
  }
}

/**
 * Search records by field (LIKE search)
 */
export async function search<T = any>(
  table: string,
  field: string,
  value: string
): Promise<T[]> {
  const response = await apiRequest<T[]>('search', { table, field, value });
  return response.data || [];
}

/**
 * Get records by exact field value
 */
export async function getByField<T = any>(
  table: string,
  field: string,
  value: string | number
): Promise<T[]> {
  const response = await apiRequest<T[]>('getByField', {
    table,
    field,
    value: String(value),
  });
  return response.data || [];
}

/**
 * Insert a new record
 */
export async function insert(
  table: string,
  data: Record<string, any>
): Promise<number> {
  const response = await apiRequest('insert', { table }, data);
  return response.id || 0;
}

/**
 * Update an existing record
 */
export async function update(
  table: string,
  id: number,
  data: Record<string, any>
): Promise<boolean> {
  const response = await apiRequest('update', { table, id }, data);
  return response.success || false;
}

/**
 * Delete a record
 */
export async function remove(table: string, id: number): Promise<boolean> {
  const response = await apiRequest('delete', { table, id }, undefined, 'DELETE');
  return response.success || false;
}

/**
 * Run a custom SELECT query
 */
export async function query<T = any>(sql: string): Promise<T[]> {
  const response = await apiRequest<T[]>('query', {}, { query: sql });
  return response.data || [];
}

/**
 * List all tables in the database
 */
export async function listTables(): Promise<string[]> {
  const response = await apiRequest<{ tables: string[] }>('tables');
  return (response as any).tables || [];
}

/**
 * Check API health
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await apiRequest('health');
    return response.success || false;
  } catch {
    return false;
  }
}

// ============ Billboards-specific functions ============

export interface Billboard {
  id: number;
  title: string;
  description?: string;
  location: string;
  state?: string;
  area?: string;
  category?: string;
  type?: string;
  size?: string;
  price?: number;
  image_url?: string;
  status?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const billboards = {
  getAll: (options?: { limit?: number; offset?: number }) =>
    getAll<Billboard>('billboards', options),
  
  getOne: (id: number) => getOne<Billboard>('billboards', id),
  
  getByState: (state: string) =>
    getByField<Billboard>('billboards', 'state', state),
  
  getByCategory: (category: string) =>
    getByField<Billboard>('billboards', 'category', category),
  
  getFeatured: () =>
    getByField<Billboard>('billboards', 'featured', '1'),
  
  search: (searchTerm: string) =>
    search<Billboard>('billboards', 'title', searchTerm),
  
  create: (data: Omit<Billboard, 'id'>) => insert('billboards', data),
  
  update: (id: number, data: Partial<Billboard>) =>
    update('billboards', id, data),
  
  delete: (id: number) => remove('billboards', id),
};

// ============ Categories functions ============

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
}

export const categories = {
  getAll: () => getAll<Category>('categories'),
  getOne: (id: number) => getOne<Category>('categories', id),
  create: (data: Omit<Category, 'id'>) => insert('categories', data),
  update: (id: number, data: Partial<Category>) => update('categories', id, data),
  delete: (id: number) => remove('categories', id),
};

// ============ Locations functions ============

export interface Location {
  id: number;
  state: string;
  area?: string;
  slug?: string;
}

export const locations = {
  getAll: () => getAll<Location>('locations'),
  getByState: (state: string) => getByField<Location>('locations', 'state', state),
  create: (data: Omit<Location, 'id'>) => insert('locations', data),
  update: (id: number, data: Partial<Location>) => update('locations', id, data),
  delete: (id: number) => remove('locations', id),
};
