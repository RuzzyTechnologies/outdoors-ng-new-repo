import { NextResponse } from 'next/server';
import { testConnection, query } from '@/lib/tidb';

export async function GET() {
  try {
    const connected = await testConnection();
    
    if (!connected) {
      return NextResponse.json(
        { success: false, error: 'Failed to connect to TiDB' },
        { status: 500 }
      );
    }

    // Try to get table count
    let tableInfo = null;
    try {
      const tables = await query<{ TABLE_NAME: string }>(
        "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = ?",
        [process.env.TIDB_DATABASE]
      );
      tableInfo = {
        tableCount: tables.length,
        tables: tables.map(t => t.TABLE_NAME)
      };
    } catch (e) {
      tableInfo = { message: 'Tables not yet created' };
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to TiDB Cloud!',
      database: process.env.TIDB_DATABASE,
      host: process.env.TIDB_HOST,
      ...tableInfo
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
