import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const { username, newPassword } = await request.json();

    if (!username || !newPassword) {
      return NextResponse.json(
        { error: 'Username and newPassword are required' },
        { status: 400 }
      );
    }

    // Update the password for the specified user
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE admin_users SET password = ?, date_updated = NOW() WHERE username = ?`,
      [newPassword, username]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: `User '${username}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password updated successfully for user '${username}'`,
      username: username
    });
  } catch (error: any) {
    console.error('Password Update Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update password',
        details: error.message
      },
      { status: 500 }
    );
  }
}
