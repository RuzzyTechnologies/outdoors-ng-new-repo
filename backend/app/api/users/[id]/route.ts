import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pickAllowedColumns } from "@/lib/crud";
import type { TableName } from "@/lib/schema";

const TABLE: TableName = "users";
const PK = "user_id";

/**
 * GET /api/users/:id
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const [rows] = await db.query("SELECT * FROM `users` WHERE `user_id` = ? LIMIT 1", [params.id]);
  const row = (rows as any[])?.[0] ?? null;
  return NextResponse.json(row);
}

/**
 * PUT /api/users/:id
 * Body: JSON with columns to update (unknown keys are ignored).
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json().catch(() => ({}));
  const data = pickAllowedColumns(TABLE, body);

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid columns provided" }, { status: 400 });
  }

  const [result] = await db.query("UPDATE `users` SET ? WHERE `user_id` = ?", [data, params.id]);
  return NextResponse.json({ success: true, result });
}

/**
 * DELETE /api/users/:id
 */
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const [result] = await db.query("DELETE FROM `users` WHERE `user_id` = ?", [params.id]);
  return NextResponse.json({ success: true, result });
}
