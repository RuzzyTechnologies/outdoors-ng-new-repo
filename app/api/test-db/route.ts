import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';

export async function GET() {
  try {
    // Test the database connection
    const connection = await db.getConnection();

    // Run a simple query to verify it works
    const [rows] = await connection.query('SELECT 1 as test');

    // Get database info
    const [dbInfo] = await connection.query('SELECT DATABASE() as db_name');

    // List tables
    const [tables] = await connection.query('SHOW TABLES');

    connection.release();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      database: dbInfo,
      tables: tables,
      testQuery: rows,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.code || 'Unknown error',
    }, { status: 500 });
  }
}
