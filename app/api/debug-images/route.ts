import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // Get table structure
    const [columns] = await db.query<RowDataPacket[]>('DESCRIBE product_images');

    // Count total images
    const [count] = await db.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM product_images');

    // Get sample images
    const [samples] = await db.query<RowDataPacket[]>('SELECT * FROM product_images LIMIT 5');

    // Check if images exist for product 3246
    const [specific] = await db.query<RowDataPacket[]>('SELECT * FROM product_images WHERE product_id = 3246');

    return NextResponse.json({
      success: true,
      columns: columns.map(c => ({ field: c.Field, type: c.Type })),
      total_images: count[0].total,
      sample_images: samples,
      product_3246_images: specific,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
