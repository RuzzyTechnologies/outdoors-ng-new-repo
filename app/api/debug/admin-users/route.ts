import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    // Check table structure
    const [columns] = await db.query<RowDataPacket[]>(
      `DESCRIBE admin_users`
    );

    // Get all admin users (without passwords for security)
    const [users] = await db.query<RowDataPacket[]>(
      `SELECT user_id, username, email, firstname, lastname, user_level, user_status, date_created, last_login
       FROM admin_users`
    );

    return NextResponse.json({
      success: true,
      table_structure: columns,
      users: users,
      user_count: users.length
    });
  } catch (error: any) {
    console.error('Debug Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to query admin_users table',
        details: error.message,
        sqlMessage: error.sqlMessage
      },
      { status: 500 }
    );
  }
}
