import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const withAreas = searchParams.get('with_areas') === '1';

  try {
    if (withAreas) {
      // Get states with their areas
      const statesQuery = `SELECT state_id, state_name FROM state ORDER BY state_name ASC`;
      const [states] = await db.query<RowDataPacket[]>(statesQuery);

      // Get all areas
      const areasQuery = `SELECT state_area_id, state_id, area_name FROM state_area ORDER BY area_name ASC`;
      const [areas] = await db.query<RowDataPacket[]>(areasQuery);

      // Group areas by state
      const statesWithAreas = states.map(state => ({
        ...state,
        areas: areas.filter(area => area.state_id === state.state_id),
      }));

      return NextResponse.json({
        success: true,
        data: statesWithAreas,
      });
    } else {
      // Get states only
      const query = `SELECT state_id, state_name FROM state ORDER BY state_name ASC`;
      const [rows] = await db.query<RowDataPacket[]>(query);

      return NextResponse.json({
        success: true,
        data: rows,
      });
    }
  } catch (error: any) {
    console.error('States GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
