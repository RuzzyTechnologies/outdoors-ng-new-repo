import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // Get product_images table structure
    const [columns] = await db.query<RowDataPacket[]>('DESCRIBE product_images');

    // Get a sample row
    const [sample] = await db.query<RowDataPacket[]>('SELECT * FROM product_images LIMIT 5');

    return NextResponse.json({
      success: true,
      columns: columns.map(c => ({ field: c.Field, type: c.Type })),
      sample: sample,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
