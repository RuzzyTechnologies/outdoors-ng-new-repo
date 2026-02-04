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
      // Get single billboard with images
      const productQuery = `SELECT * FROM product WHERE product_id = ? LIMIT 1`;
      const [productRows] = await db.query<RowDataPacket[]>(productQuery, [id]);

      if (productRows.length === 0) {
        return NextResponse.json({ success: true, data: null });
      }

      const product = productRows[0];

      // Get images for this product
      const imagesQuery = `
        SELECT image_id, file_path, sort_order
        FROM product_images
        WHERE product_id = ?
        ORDER BY sort_order ASC
      `;
      const [imageRows] = await db.query<RowDataPacket[]>(imagesQuery, [id]);

      // Get category name
      if (product.category_id) {
        const [catRows] = await db.query<RowDataPacket[]>(
          'SELECT name, url FROM category WHERE category_id = ?',
          [product.category_id]
        );
        if (catRows.length > 0) {
          product.category_name = catRows[0].name;
          product.category_url = catRows[0].url;
        }
      }

      // Get state name
      if (product.state) {
        const [stateRows] = await db.query<RowDataPacket[]>(
          'SELECT state_name FROM state WHERE state_id = ?',
          [product.state]
        );
        if (stateRows.length > 0) {
          product.state_name = stateRows[0].state_name;
        }
      }

      // Get area name
      if (product.state_area) {
        const [areaRows] = await db.query<RowDataPacket[]>(
          'SELECT area_name FROM state_area WHERE area_id = ?',
          [product.state_area]
        );
        if (areaRows.length > 0) {
          product.area_name = areaRows[0].area_name;
        }
      }

      // Add images to product
      product.images = imageRows;
      product.image_url = imageRows.length > 0 ? imageRows[0].file_path : null;

      return NextResponse.json({
        success: true,
        data: product,
      });
    }

    // Get all billboards
    let query = `
      SELECT
        p.*,
        (SELECT file_path FROM product_images WHERE product_id = p.product_id ORDER BY sort_order ASC LIMIT 1) as image_url
      FROM product p
      WHERE 1=1
    `;
    const params: any[] = [];

    if (categoryId) {
      query += ` AND p.category_id = ?`;
      params.push(categoryId);
    }

    if (stateId) {
      query += ` AND p.state = ?`;
      params.push(stateId);
    }

    query += ` ORDER BY p.product_id DESC LIMIT 100`;

    const [rows] = await db.query<RowDataPacket[]>(query, params);

    // Enrich with category, state, and area names
    for (const product of rows) {
      // Get category name
      if (product.category_id) {
        const [catRows] = await db.query<RowDataPacket[]>(
          'SELECT name, url FROM category WHERE category_id = ?',
          [product.category_id]
        );
        if (catRows.length > 0) {
          product.category_name = catRows[0].name;
          product.category_url = catRows[0].url;
        }
      }

      // Get state name
      if (product.state) {
        const [stateRows] = await db.query<RowDataPacket[]>(
          'SELECT state_name FROM state WHERE state_id = ?',
          [product.state]
        );
        if (stateRows.length > 0) {
          product.state_name = stateRows[0].state_name;
        }
      }

      // Get area name
      if (product.state_area) {
        const [areaRows] = await db.query<RowDataPacket[]>(
          'SELECT area_name FROM state_area WHERE area_id = ?',
          [product.state_area]
        );
        if (areaRows.length > 0) {
          product.area_name = areaRows[0].area_name;
        }
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
