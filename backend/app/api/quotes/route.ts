import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pickAllowedColumns } from "@/lib/crud";
import type { TableName } from "@/lib/schema";

const TABLE: TableName = "quotes";

/**
 * GET /api/quotes
 * Returns all rows (add your own pagination/filtering as needed).
 */
export async function GET() {
  const [rows] = await db.query("SELECT * FROM `quotes`");
  return NextResponse.json(rows);
}

/**
 * POST /api/quotes
 * Body: JSON with any columns (unknown keys are ignored).
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const data = pickAllowedColumns(TABLE, body);

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid columns provided" }, { status: 400 });
  }

  const [result] = await db.query("INSERT INTO `quotes` SET ?", [data]);
  return NextResponse.json({ success: true, result });
}
