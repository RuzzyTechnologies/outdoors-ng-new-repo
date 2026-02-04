import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const categoryId = searchParams.get('category_id');
  const stateId = searchParams.get('state');

  try {
    if (id) {
      // Get single billboard
      const [productRows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM product WHERE product_id = ? LIMIT 1',
        [id]
      );

      if (productRows.length === 0) {
        return NextResponse.json({ success: true, data: null });
      }

      const product = productRows[0];

      // Try to get images
      try {
        const [imageRows] = await db.query<RowDataPacket[]>(
          'SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order ASC LIMIT 1',
          [id]
        );
        if (imageRows.length > 0) {
          product.image_url = imageRows[0].image || imageRows[0].path || imageRows[0].url || null;
        }
      } catch {
        // Images not available
      }

      return NextResponse.json({
        success: true,
        data: product,
      });
    }

    // Get all billboards
    let query = 'SELECT * FROM product WHERE 1=1';
    const params: any[] = [];

    if (categoryId) {
      query += ' AND category_id = ?';
      params.push(categoryId);
    }

    if (stateId) {
      query += ' AND state = ?';
      params.push(stateId);
    }

    query += ' ORDER BY product_id DESC LIMIT 100';

    const [rows] = await db.query<RowDataPacket[]>(query, params);

    // Try to add images to each product
    for (const product of rows) {
      try {
        const [imageRows] = await db.query<RowDataPacket[]>(
          'SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order ASC LIMIT 1',
          [product.product_id]
        );
        if (imageRows.length > 0) {
          const img = imageRows[0];
          product.image_url = img.image || img.path || img.url || img.file_path || null;
        }
      } catch {
        // Images not available for this product
      }
    }

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error('Billboards GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const fields = Object.keys(data).filter(k => k !== 'product_id');
    const values = fields.map(f => data[f]);
    const placeholders = fields.map(() => '?').join(', ');

    const query = `INSERT INTO product (${fields.join(', ')}) VALUES (${placeholders})`;
    const [result] = await db.query<ResultSetHeader>(query, values);

    return NextResponse.json({
      success: true,
      id: result.insertId,
      data: { product_id: result.insertId, ...data },
    });
  } catch (error: any) {
    console.error('Billboards POST Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
  }

  try {
    const data = await request.json();
    const fields = Object.keys(data).filter(k => k !== 'product_id');
    const updates = fields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => data[f]);

    const query = `UPDATE product SET ${updates} WHERE product_id = ?`;
    await db.query(query, [...values, id]);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('Billboards PUT Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
  }

  try {
    const query = `DELETE FROM product WHERE product_id = ?`;
    await db.query(query, [id]);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('Billboards DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
