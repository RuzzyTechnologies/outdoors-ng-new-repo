import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // Get table structure first
    const [columns] = await db.query<RowDataPacket[]>('DESCRIBE admin_users');

    return NextResponse.json({
      success: true,
      columns: columns,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
