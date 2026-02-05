import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // Get table structure
    const [columns] = await db.query<RowDataPacket[]>('DESCRIBE admin_users');

    // Count admins
    const [count] = await db.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM admin_users');

    // Get sample (without passwords)
    const [samples] = await db.query<RowDataPacket[]>('SELECT user_id, username, email FROM admin_users LIMIT 3');

    return NextResponse.json({
      success: true,
      columns: columns.map(c => ({ field: c.Field, type: c.Type })),
      total_admins: count[0].total,
      sample_admins: samples,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
