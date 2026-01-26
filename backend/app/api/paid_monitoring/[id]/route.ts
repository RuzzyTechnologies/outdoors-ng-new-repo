import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pickAllowedColumns } from "@/lib/crud";
import type { TableName } from "@/lib/schema";

const TABLE: TableName = "paid_monitoring";
const PK = "id";

/**
 * GET /api/paid_monitoring/:id
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const [rows] = await db.query("SELECT * FROM `paid_monitoring` WHERE `id` = ? LIMIT 1", [params.id]);
  const row = (rows as any[])?.[0] ?? null;
  return NextResponse.json(row);
}

/**
 * PUT /api/paid_monitoring/:id
 * Body: JSON with columns to update (unknown keys are ignored).
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => ({}));
  const data = pickAllowedColumns(TABLE, body);

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid columns provided" }, { status: 400 });
  }

  const [result] = await db.query("UPDATE `paid_monitoring` SET ? WHERE `id` = ?", [data, params.id]);
  return NextResponse.json({ success: true, result });
}

/**
 * DELETE /api/paid_monitoring/:id
 */
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const [result] = await db.query("DELETE FROM `paid_monitoring` WHERE `id` = ?", [params.id]);
  return NextResponse.json({ success: true, result });
}
