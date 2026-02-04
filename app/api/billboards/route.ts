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
      // Get single billboard with joined data
      const query = `
        SELECT
          p.*,
          c.name as category_name,
          c.url as category_url,
          s.state_name,
          sa.area_name
        FROM product p
        LEFT JOIN category c ON p.category_id = c.category_id
        LEFT JOIN state s ON p.state_id = s.state_id
        LEFT JOIN state_area sa ON p.area_id = sa.area_id
        WHERE p.product_id = ?
        LIMIT 1
      `;

      const [rows] = await db.query<RowDataPacket[]>(query, [id]);

      return NextResponse.json({
        success: true,
        data: rows[0] || null,
      });
    }

    // Get all billboards with filters
    let query = `
      SELECT
        p.*,
        c.name as category_name,
        c.url as category_url,
        s.state_name,
        sa.area_name
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN state s ON p.state_id = s.state_id
      LEFT JOIN state_area sa ON p.area_id = sa.area_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (categoryId) {
      query += ` AND p.category_id = ?`;
      params.push(categoryId);
    }

    if (stateId) {
      query += ` AND p.state_id = ?`;
      params.push(stateId);
    }

    query += ` ORDER BY p.product_id DESC`;

    const [rows] = await db.query<RowDataPacket[]>(query, params);

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

    const query = `
      INSERT INTO product (
        category_id, name, short_desc, long_desc, file_path,
        state_id, area_id, address, size, price, status, date_added
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const params = [
      data.category_id || null,
      data.name || '',
      data.short_desc || '',
      data.long_desc || '',
      data.file_path || '',
      data.state_id || null,
      data.area_id || null,
      data.address || '',
      data.size || '',
      data.price || 0,
      data.status || 'available',
    ];

    const [result] = await db.query<ResultSetHeader>(query, params);

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

    const updates: string[] = [];
    const params: any[] = [];

    if (data.name !== undefined) { updates.push('name = ?'); params.push(data.name); }
    if (data.short_desc !== undefined) { updates.push('short_desc = ?'); params.push(data.short_desc); }
    if (data.long_desc !== undefined) { updates.push('long_desc = ?'); params.push(data.long_desc); }
    if (data.category_id !== undefined) { updates.push('category_id = ?'); params.push(data.category_id); }
    if (data.state_id !== undefined) { updates.push('state_id = ?'); params.push(data.state_id); }
    if (data.area_id !== undefined) { updates.push('area_id = ?'); params.push(data.area_id); }
    if (data.address !== undefined) { updates.push('address = ?'); params.push(data.address); }
    if (data.size !== undefined) { updates.push('size = ?'); params.push(data.size); }
    if (data.price !== undefined) { updates.push('price = ?'); params.push(data.price); }
    if (data.status !== undefined) { updates.push('status = ?'); params.push(data.status); }

    updates.push('date_updated = NOW()');

    const query = `UPDATE product SET ${updates.join(', ')} WHERE product_id = ?`;
    params.push(id);

    await db.query(query, params);

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
