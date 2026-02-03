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
  console.log('[v0] Attempting login to:', `${API_BASE}/api/auth/login`);
  console.log('[v0] Credentials:', { usernameOrEmail: credentials.usernameOrEmail, password: '***' });
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    console.log('[v0] Login response status:', response.status);
    console.log('[v0] Login response OK?:', response.ok);
    console.log('[v0] Login response data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      const errorMsg = data.error || data.message || data.msg || `HTTP ${response.status}`;
      console.error('[v0] Backend error response:', errorMsg);
      throw new Error(errorMsg);
    }

    // API returns token and admin directly at root level
    if (!data.token) {
      console.error('[v0] No token in response');
      throw new Error('No token received from server');
    }

    console.log('[v0] Login successful!');
    return {
      token: data.token,
      admin: data.admin,
    };
  } catch (error) {
    console.error('[v0] Login error caught:', error);
    throw error instanceof Error ? error : new Error(String(error));
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
  
  console.log('[v0] crudRequest called:', { method, table, id, hasToken: !!token, tokenLength: token?.length });
  
  let url = `${API_BASE}/api/crud?table=${encodeURIComponent(table)}`;
  if (id) {
    url += `&id=${id}`;
  }
  
  const headers = getAuthHeader(token);
  console.log('[v0] Request headers:', { hasAuth: !!(headers as Record<string, string>)['Authorization'] });
  
  const fetchOptions: RequestInit = {
    method,
    headers,
  };
  
  if (data && (method === 'POST' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(data);
  }
  
  try {
    console.log('[v0] Fetching:', url);
    const response = await fetch(url, fetchOptions);
    console.log('[v0] Response status:', response.status);
    const responseData: ApiResponse<T> = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('[v0] 401 Unauthorized - token might be invalid or expired');
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
 * Category operations (legacy)
 */
export const categories = {
  getAll: (token: string | null) => getAll<CategoryLegacy>('category', token),
  getOne: (id: number, token: string | null) => getOne<CategoryLegacy>('category', id, token),
  create: (data: Omit<CategoryLegacy, 'category_id'>, token: string | null) =>
    create<CategoryLegacy>('category', data, token),
  update: (id: number, data: Partial<CategoryLegacy>, token: string | null) =>
    update<CategoryLegacy>('category', id, data, token),
  delete: (id: number, token: string | null) => remove('category', id, token),
};

interface CategoryLegacy {
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
 * State operations (legacy)
 */
export const states = {
  getAll: (token: string | null) => getAll<StateLegacy>('state', token),
  getOne: (id: number, token: string | null) => getOne<StateLegacy>('state', id, token),
  create: (data: Omit<StateLegacy, 'state_id'>, token: string | null) =>
    create<StateLegacy>('state', data, token),
  update: (id: number, data: Partial<StateLegacy>, token: string | null) =>
    update<StateLegacy>('state', id, data, token),
  delete: (id: number, token: string | null) => remove('state', id, token),
};

interface StateLegacy {
  state_id?: number;
  name: string;
  code?: string;
}

/**
 * State Area operations (legacy)
 */
export const stateAreas = {
  getAll: (token: string | null) => getAll<StateAreaLegacy>('state_area', token),
  getOne: (id: number, token: string | null) => getOne<StateAreaLegacy>('state_area', id, token),
  create: (data: Omit<StateAreaLegacy, 'area_id'>, token: string | null) =>
    create<StateAreaLegacy>('state_area', data, token),
  update: (id: number, data: Partial<StateAreaLegacy>, token: string | null) =>
    update<StateAreaLegacy>('state_area', id, data, token),
  delete: (id: number, token: string | null) => remove('state_area', id, token),
};

interface StateAreaLegacy {
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

// ============ Billboards (products from database) ============

export interface Billboard {
  product_id?: number;
  id?: number;
  name?: string;
  title?: string;
  url?: string;
  price?: number;
  category_id?: number;
  category_name?: string;
  category_url?: string;
  size?: string;
  gps_location?: string;
  address?: string;
  location?: string;
  state?: string;
  state_id?: number;
  state_name?: string;
  state_area?: string;
  area_name?: string;
  description?: string;
  long_desc?: string;
  short_desc?: string;
  status?: string;
  product_status?: string;
  image_url?: string;
  default_image?: string;
  images?: string[];
  all_images?: string;
  date_added?: string;
  date_updated?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Billboard operations - works with products table
 */
export async function getAllBillboards(token: string | null, categoryId?: number, stateId?: number): Promise<Billboard[]> {
  try {
    console.log('[v0] getAllBillboards called');

    let url = `${API_BASE}/api/billboards`;
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', categoryId.toString());
    if (stateId) params.append('state', stateId.toString());
    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch billboards');
    }

    const result = await response.json();
    console.log('[v0] Got billboards:', result.data?.length || 0);
    return result.data || [];
  } catch (error) {
    console.error('[v0] Error fetching billboards:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch billboards');
  }
}

export async function getBillboardById(id: number, token: string | null): Promise<Billboard | null> {
  try {
    console.log('[v0] getBillboardById called with ID:', id);

    const response = await fetch(`${API_BASE}/api/billboards?id=${id}`, {
      method: 'GET',
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch billboard');
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('[v0] Error fetching billboard:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch billboard');
  }
}

export async function createBillboard(data: Partial<Billboard>, token: string | null): Promise<Billboard | null> {
  try {
    const response = await fetch(`${API_BASE}/api/billboards`, {
      method: 'POST',
      headers: getAuthHeader(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create billboard');
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('[v0] Error creating billboard:', error);
    throw error instanceof Error ? error : new Error('Failed to create billboard');
  }
}

export async function updateBillboard(id: number, data: Partial<Billboard>, token: string | null): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/billboards?id=${id}`, {
      method: 'PUT',
      headers: getAuthHeader(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update billboard');
    }

    return true;
  } catch (error) {
    console.error('[v0] Error updating billboard:', error);
    throw error instanceof Error ? error : new Error('Failed to update billboard');
  }
}

export async function deleteBillboard(id: number, token: string | null): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/billboards?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete billboard');
    }

    return true;
  } catch (error) {
    console.error('[v0] Error deleting billboard:', error);
    throw error instanceof Error ? error : new Error('Failed to delete billboard');
  }
}

// Alias for backwards compatibility
export const addBillboard = createBillboard;

// ============ Categories (Billboard Types) ============

export interface Category {
  category_id: number;
  parent_id?: number;
  name: string;
  url: string;
  product_count?: number;
  date_added?: string;
  date_updated?: string;
}

export async function getAllCategories(token: string | null): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE}/api/categories`, {
      method: 'GET',
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('[v0] Error fetching categories:', error);
    return [];
  }
}

// ============ States & Areas ============

export interface State {
  state_id: number;
  state_name: string;
  areas?: StateArea[];
}

export interface StateArea {
  state_area_id: number;
  state_id: number;
  area_name: string;
}

export async function getAllStates(withAreas: boolean = false, token: string | null = null): Promise<State[]> {
  try {
    const url = withAreas ? `${API_BASE}/api/states?with_areas=1` : `${API_BASE}/api/states`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('[v0] Error fetching states:', error);
    return [];
  }
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
