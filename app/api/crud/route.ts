import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const table = searchParams.get('table');
  const id = searchParams.get('id');

  if (!table) {
    return NextResponse.json({ error: 'Table parameter required' }, { status: 400 });
  }

  try {
    let query: string;
    let params: any[] = [];

    if (id) {
      // Get single record by ID
      query = `SELECT * FROM ?? WHERE id = ?`;
      params = [table, id];
    } else {
      // Get all records with optional filters
      const categoryId = searchParams.get('category_id');
      const stateId = searchParams.get('state_id');

      if (table === 'product' && (categoryId || stateId)) {
        query = `SELECT * FROM ?? WHERE 1=1`;
        params = [table];

        if (categoryId) {
          query += ` AND category_id = ?`;
          params.push(categoryId);
        }
        if (stateId) {
          query += ` AND state_id = ?`;
          params.push(stateId);
        }
      } else {
        query = `SELECT * FROM ??`;
        params = [table];
      }

      query += ` ORDER BY id DESC`;
    }

    const [rows] = await db.query<RowDataPacket[]>(query, params);

    return NextResponse.json({
      success: true,
      data: id ? (rows[0] || null) : rows,
    });
  } catch (error: any) {
    console.error('CRUD GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const table = searchParams.get('table');

  if (!table) {
    return NextResponse.json({ error: 'Table parameter required' }, { status: 400 });
  }

  try {
    const data = await request.json();
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => '?').join(', ');

    const query = `INSERT INTO ?? (${fields.map(f => '??').join(', ')}) VALUES (${placeholders})`;
    const params = [table, ...fields, ...values];

    const [result] = await db.query<ResultSetHeader>(query, params);

    return NextResponse.json({
      success: true,
      id: result.insertId,
    });
  } catch (error: any) {
    console.error('CRUD POST Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const table = searchParams.get('table');
  const id = searchParams.get('id');

  if (!table || !id) {
    return NextResponse.json({ error: 'Table and id parameters required' }, { status: 400 });
  }

  try {
    const data = await request.json();
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map(f => '?? = ?').join(', ');

    const query = `UPDATE ?? SET ${setClause} WHERE id = ?`;
    const params: any[] = [table];
    fields.forEach((field, i) => {
      params.push(field, values[i]);
    });
    params.push(id);

    await db.query(query, params);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('CRUD PUT Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const table = searchParams.get('table');
  const id = searchParams.get('id');

  if (!table || !id) {
    return NextResponse.json({ error: 'Table and id parameters required' }, { status: 400 });
  }

  try {
    const query = `DELETE FROM ?? WHERE id = ?`;
    await db.query(query, [table, id]);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('CRUD DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
