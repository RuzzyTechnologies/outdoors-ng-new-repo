export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withCors } from "@/lib/cors";

const ALLOWED_TABLES = new Set([
  "admin_users",
  "billboards",
  "category",
  "category_product",
  "deployment",
  "emails",
  "guest_users",
  "health",
  "installation",
  "monitoring",
  "paid_monitoring",
  "paid_quotes",
  "paid_quotes_chat",
  "print",
  "product",
  "product_images",
  "quotes",
  "quotes_chat",
  "state",
  "state_area",
  "users",
]);

const PRIMARY_KEYS: Record<string, string> = {
  admin_users: "admin_users_id",
  billboards: "id",
  category: "category_id",
  category_product: "category_product_id",
  deployment: "deployment_id",
  emails: "emails_id",
  guest_users: "guest_users_id",
  health: "health_id",
  installation: "installation_id",
  monitoring: "monitoring_id",
  paid_monitoring: "paid_monitoring_id",
  paid_quotes: "paid_quotes_id",
  paid_quotes_chat: "paid_quotes_chat_id",
  print: "print_id",
  product: "product_id",
  product_images: "product_images_id",
  quotes: "quotes_id",
  quotes_chat: "quotes_chat_id",
  state: "state_id",
  state_area: "state_area_id",
  users: "users_id",
};

function toJsonSafe(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_k, v) => (typeof v === "bigint" ? v.toString() : v))
  );
}

function ok(req: Request, data: any, status = 200) {
  return withCors(req, NextResponse.json(toJsonSafe(data), { status }));
}

function fail(req: Request, message: string, status = 500, details?: any) {
  return withCors(
    req,
    NextResponse.json(
      { error: message, details: details ? String(details) : undefined },
      { status }
    )
  );
}

function getTable(req: Request) {
  const url = new URL(req.url);
  const table = (url.searchParams.get("table") || "").trim();
  if (!table) throw new Error("Missing 'table' query parameter");
  if (!ALLOWED_TABLES.has(table)) throw new Error(`Table not allowed: ${table}`);
  return table;
}

// ✅ IMPORTANT: handle preflight
export async function OPTIONS(req: Request) {
  return withCors(req, new NextResponse(null, { status: 204 }));
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    // Optional health check
    if (url.searchParams.get("ping") === "1") {
      const [rows] = await db.query("SELECT 1 AS ok");
      return ok(req, { ok: true, rows });
    }

    const table = getTable(req);
    const pk = PRIMARY_KEYS[table];
    const id = url.searchParams.get("id");

    // fetch single
    if (id && pk) {
      const [rows]: any = await db.query(
        `SELECT * FROM \`${table}\` WHERE \`${pk}\` = ? LIMIT 1`,
        [id]
      );
      return ok(req, rows?.[0] ?? null);
    }

    // list
    const limit = Math.min(Number(url.searchParams.get("limit") || 100), 500);
    const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);

    const [rows] = await db.query(
      `SELECT * FROM \`${table}\` LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return ok(req, rows);
  } catch (e: any) {
    console.error("CRUD GET ERROR:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500, e?.code || e);
  }
}

export async function POST(req: Request) {
  try {
    const table = getTable(req);
    const body = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return fail(req, "Body must be a JSON object", 400);
    }

    const [result]: any = await db.query(`INSERT INTO \`${table}\` SET ?`, [body]);

    return ok(
      req,
      {
        success: true,
        insertId: result?.insertId ?? null,
        affectedRows: result?.affectedRows ?? null,
      },
      201
    );
  } catch (e: any) {
    console.error("CRUD POST ERROR:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500, e?.code || e);
  }
}

export async function PUT(req: Request) {
  try {
    const table = getTable(req);
    const pk = PRIMARY_KEYS[table];
    if (!pk) return fail(req, `No primary key configured for ${table}`, 400);

    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return fail(req, "Body must be a JSON object", 400);
    }

    const id = body[pk];
    if (id === undefined || id === null || id === "") {
      return fail(req, `Body must include primary key '${pk}'`, 400);
    }

    const { [pk]: _omit, ...updates } = body;
    if (Object.keys(updates).length === 0) {
      return fail(req, "No fields to update", 400);
    }

    const [result]: any = await db.query(
      `UPDATE \`${table}\` SET ? WHERE \`${pk}\` = ?`,
      [updates, id]
    );

    return ok(req, {
      success: true,
      affectedRows: result?.affectedRows ?? null,
      changedRows: result?.changedRows ?? null,
    });
  } catch (e: any) {
    console.error("CRUD PUT ERROR:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500, e?.code || e);
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const table = getTable(req);

    const pk = PRIMARY_KEYS[table];
    if (!pk) return fail(req, `No primary key configured for ${table}`, 400);

    const id = url.searchParams.get("id");
    if (!id) return fail(req, "Missing 'id' query parameter", 400);

    const [result]: any = await db.query(
      `DELETE FROM \`${table}\` WHERE \`${pk}\` = ?`,
      [id]
    );

    return ok(req, { success: true, affectedRows: result?.affectedRows ?? null });
  } catch (e: any) {
    console.error("CRUD DELETE ERROR:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500, e?.code || e);
  }
}
