export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withCors } from "@/lib/cors";

function toJsonSafe(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_k, v) => (typeof v === "bigint" ? v.toString() : v))
  );
}

function ok(req: Request, data: any, status = 200) {
  return withCors(req, NextResponse.json(toJsonSafe(data), { status }));
}

function fail(req: Request, message: string, status = 500) {
  return withCors(req, NextResponse.json({ error: message }, { status }));
}

// Handle preflight
export async function OPTIONS(req: Request) {
  return withCors(req, new NextResponse(null, { status: 204 }));
}

/**
 * GET /api/categories
 * Returns all billboard categories/types
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Get single category
      const [rows]: any = await db.query(
        "SELECT * FROM category WHERE category_id = ? LIMIT 1",
        [id]
      );
      return ok(req, { data: rows?.[0] || null });
    }

    // Get all categories with product count
    const query = `
      SELECT
        c.*,
        COUNT(p.product_id) as product_count
      FROM category c
      LEFT JOIN product p ON c.category_id = p.category_id AND p.status = 1
      WHERE c.category_id > 1
      GROUP BY c.category_id
      ORDER BY c.name ASC
    `;

    const [rows]: any = await db.query(query);

    return ok(req, {
      data: rows || []
    });

  } catch (e: any) {
    console.error("Categories API Error:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500);
  }
}
