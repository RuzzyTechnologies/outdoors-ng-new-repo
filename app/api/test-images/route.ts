import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // Get table structure
    const [columns] = await db.query<RowDataPacket[]>('DESCRIBE product_images');

    // Get sample data
    const [samples] = await db.query<RowDataPacket[]>('SELECT * FROM product_images LIMIT 3');

    return NextResponse.json({
      success: true,
      columns: columns.map(c => c.Field),
      samples: samples,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
