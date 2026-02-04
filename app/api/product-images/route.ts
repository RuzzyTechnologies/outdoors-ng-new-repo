import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('product_id');

  if (!productId) {
    return NextResponse.json({ error: 'product_id required' }, { status: 400 });
  }

  try {
    const query = `
      SELECT * FROM product_images
      WHERE product_id = ?
      ORDER BY sort_order ASC
    `;

    const [rows] = await db.query<RowDataPacket[]>(query, [productId]);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error('Product Images Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
