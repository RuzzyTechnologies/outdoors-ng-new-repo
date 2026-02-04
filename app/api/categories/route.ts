import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT
        category_id,
        parent_id,
        name,
        url,
        date_added,
        date_updated,
        (SELECT COUNT(*) FROM product WHERE category_id = category.category_id) as product_count
      FROM category
      ORDER BY name ASC
    `;

    const [rows] = await db.query<RowDataPacket[]>(query);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error('Categories GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
