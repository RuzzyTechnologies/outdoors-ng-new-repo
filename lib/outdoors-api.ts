/**
 * Outdoors API Client
 * Connects to the secured admin-only CRUD API with JWT authentication
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  token?: string;
  admin?: {
    id: string;
    email: string;
    username: string;
  };
  error?: string;
}

// ============ Authentication ============

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  admin: AdminUser;
}

/**
 * Login with credentials and get JWT token
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse<AuthResponse> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Login failed');
    }

    if (!data.data || !data.data.token) {
      throw new Error('No token received from server');
    }

    return data.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Login request failed');
  }
}

/**
 * Get authorization header with token
 */
function getAuthHeader(token: string | null): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// ============ CRUD Operations ============

export interface CrudOptions {
  token: string | null;
  table: string;
  id?: number;
  data?: Record<string, any>;
}

/**
 * Generic CRUD request handler
 */
async function crudRequest<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  options: CrudOptions
): Promise<T> {
  const { token, table, id, data } = options;
  
  let url = `${API_BASE}/api/crud?table=${encodeURIComponent(table)}`;
  if (id) {
    url += `&id=${id}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: getAuthHeader(token),
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const responseData: ApiResponse<T> = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      if (response.status === 403) {
        throw new Error('Forbidden - Admin access required');
      }
      throw new Error(responseData.error || `API error: ${response.status}`);
    }

    return responseData.data as T;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'CRUD request failed');
  }
}

/**
 * Read - Get all records from a table
 */
export async function getAll<T = any>(
  table: string,
  token: string | null
): Promise<T[]> {
  try {
    const result = await crudRequest<T[]>('GET', {
      token,
      table,
    });
    return result || [];
  } catch {
    return [];
  }
}

/**
 * Read - Get a single record by ID
 */
export async function getOne<T = any>(
  table: string,
  id: number,
  token: string | null
): Promise<T | null> {
  try {
    const result = await crudRequest<T>('GET', {
      token,
      table,
      id,
    });
    return result || null;
  } catch {
    return null;
  }
}

/**
 * Create - Insert a new record
 */
export async function create<T = any>(
  table: string,
  data: Record<string, any>,
  token: string | null
): Promise<T | null> {
  try {
    const result = await crudRequest<T>('POST', {
      token,
      table,
      data,
    });
    return result || null;
  } catch (error) {
    throw error;
  }
}

/**
 * Update - Modify an existing record
 */
export async function update<T = any>(
  table: string,
  id: number,
  data: Record<string, any>,
  token: string | null
): Promise<T | null> {
  try {
    const result = await crudRequest<T>('PUT', {
      token,
      table,
      id,
      data: { ...data, [getPrimaryKeyForTable(table)]: id },
    });
    return result || null;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete - Remove a record
 */
export async function remove(
  table: string,
  id: number,
  token: string | null
): Promise<boolean> {
  try {
    await crudRequest('DELETE', {
      token,
      table,
      id,
    });
    return true;
  } catch {
    return false;
  }
}

// ============ Helper Functions ============

/**
 * Get primary key column name for a table
 */
function getPrimaryKeyForTable(table: string): string {
  const keyMap: Record<string, string> = {
    admin_users: 'admin_id',
    category: 'category_id',
    category_product: 'category_product_id',
    product: 'product_id',
    state: 'state_id',
    state_area: 'area_id',
    deployment: 'deployment_id',
    installation: 'installation_id',
    monitoring: 'monitoring_id',
    paid_monitoring: 'paid_monitoring_id',
    paid_quotes: 'paid_quotes_id',
    print: 'print_id',
    product_images: 'image_id',
    quotes: 'quote_id',
    users: 'user_id',
  };
  return keyMap[table] || 'id';
}

// ============ Domain-Specific Functions ============

/**
 * Category operations
 */
export const categories = {
  getAll: (token: string | null) => getAll<Category>('category', token),
  getOne: (id: number, token: string | null) => getOne<Category>('category', id, token),
  create: (data: Omit<Category, 'category_id'>, token: string | null) =>
    create<Category>('category', data, token),
  update: (id: number, data: Partial<Category>, token: string | null) =>
    update<Category>('category', id, data, token),
  delete: (id: number, token: string | null) => remove('category', id, token),
};

export interface Category {
  category_id?: number;
  parent_id?: number | null;
  name: string;
  url: string;
  date_added?: string;
  date_updated?: string;
  category?: number;
}

/**
 * Product operations
 */
export const products = {
  getAll: (token: string | null) => getAll<Product>('product', token),
  getOne: (id: number, token: string | null) => getOne<Product>('product', id, token),
  create: (data: Omit<Product, 'product_id'>, token: string | null) =>
    create<Product>('product', data, token),
  update: (id: number, data: Partial<Product>, token: string | null) =>
    update<Product>('product', id, data, token),
  delete: (id: number, token: string | null) => remove('product', id, token),
};

export interface Product {
  product_id?: number;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * State operations
 */
export const states = {
  getAll: (token: string | null) => getAll<State>('state', token),
  getOne: (id: number, token: string | null) => getOne<State>('state', id, token),
  create: (data: Omit<State, 'state_id'>, token: string | null) =>
    create<State>('state', data, token),
  update: (id: number, data: Partial<State>, token: string | null) =>
    update<State>('state', id, data, token),
  delete: (id: number, token: string | null) => remove('state', id, token),
};

export interface State {
  state_id?: number;
  name: string;
  code?: string;
}

/**
 * State Area operations
 */
export const stateAreas = {
  getAll: (token: string | null) => getAll<StateArea>('state_area', token),
  getOne: (id: number, token: string | null) => getOne<StateArea>('state_area', id, token),
  create: (data: Omit<StateArea, 'area_id'>, token: string | null) =>
    create<StateArea>('state_area', data, token),
  update: (id: number, data: Partial<StateArea>, token: string | null) =>
    update<StateArea>('state_area', id, data, token),
  delete: (id: number, token: string | null) => remove('state_area', id, token),
};

export interface StateArea {
  area_id?: number;
  state_id: number;
  name: string;
  description?: string;
}

/**
 * Admin Users operations
 */
export const adminUsers = {
  getAll: (token: string | null) => getAll<AdminUserRecord>('admin_users', token),
  getOne: (id: string, token: string | null) => getOne<AdminUserRecord>('admin_users', parseInt(id), token),
  create: (data: Omit<AdminUserRecord, 'admin_id'>, token: string | null) =>
    create<AdminUserRecord>('admin_users', data, token),
  update: (id: string, data: Partial<AdminUserRecord>, token: string | null) =>
    update<AdminUserRecord>('admin_users', parseInt(id), data, token),
  delete: (id: string, token: string | null) => remove('admin_users', parseInt(id), token),
};

export interface AdminUserRecord {
  admin_id?: string;
  username: string;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Category-Product junction operations
 */
export const categoryProducts = {
  getAll: (token: string | null) => getAll<CategoryProduct>('category_product', token),
  getOne: (id: number, token: string | null) => getOne<CategoryProduct>('category_product', id, token),
  create: (data: Omit<CategoryProduct, 'category_product_id'>, token: string | null) =>
    create<CategoryProduct>('category_product', data, token),
  delete: (id: number, token: string | null) => remove('category_product', id, token),
};

export interface CategoryProduct {
  category_product_id?: number;
  category_id: number;
  product_id: number;
  date_created?: string;
  date_updated?: string;
}

/**
 * Health check - verify API is accessible
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/crud?ping=1`);
    return response.ok;
  } catch {
    return false;
  }
}
