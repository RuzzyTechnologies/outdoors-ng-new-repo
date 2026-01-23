import mysql from 'mysql2/promise';

// TiDB Cloud connection configuration
const connectionConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USERNAME,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
  connectTimeout: 10000,
};

// Create connection pool for better performance
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      ...connectionConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

// Execute a query with parameters
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

// Execute a single query and return first result
export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results[0] || null;
}

// Execute an insert and return the inserted ID
export async function insert(
  sql: string,
  params?: any[]
): Promise<number> {
  const pool = getPool();
  const [result] = await pool.execute(sql, params);
  return (result as any).insertId;
}

// Execute an update/delete and return affected rows
export async function execute(
  sql: string,
  params?: any[]
): Promise<number> {
  const pool = getPool();
  const [result] = await pool.execute(sql, params);
  return (result as any).affectedRows;
}

// Test connection
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('TiDB connection error:', error);
    return false;
  }
}
