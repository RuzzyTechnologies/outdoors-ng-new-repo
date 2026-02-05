import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const { usernameOrEmail, password } = await request.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { error: 'Username/email and password required' },
        { status: 400 }
      );
    }

    // Query admin_users table with correct column names
    const query = `
      SELECT user_id, username, email, password
      FROM admin_users
      WHERE username = ? OR email = ?
      LIMIT 1
    `;

    const [rows] = await db.query<RowDataPacket[]>(query, [usernameOrEmail, usernameOrEmail]);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const admin = rows[0];

    // Simple password check (you should use bcrypt in production)
    if (admin.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate a simple token (use JWT in production)
    const token = Buffer.from(`${admin.user_id}:${admin.username}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin.user_id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error.message },
      { status: 500 }
    );
  }
}
