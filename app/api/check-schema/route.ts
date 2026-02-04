import { NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // Get product_images table schema
    const [columns] = await db.query<RowDataPacket[]>('DESCRIBE product_images');

    // Get a sample row
    const [sample] = await db.query<RowDataPacket[]>('SELECT * FROM product_images LIMIT 1');

    // Get product table schema
    const [productCols] = await db.query<RowDataPacket[]>('DESCRIBE product');

    return NextResponse.json({
      success: true,
      product_images_columns: columns,
      product_images_sample: sample[0] || null,
      product_columns: productCols,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
