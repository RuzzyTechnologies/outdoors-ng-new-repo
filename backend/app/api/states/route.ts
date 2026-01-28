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
 * GET /api/states
 * Returns all states and optionally areas
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const state_id = url.searchParams.get("state_id");
    const with_areas = url.searchParams.get("with_areas");

    if (state_id) {
      // Get specific state
      const [stateRows]: any = await db.query(
        "SELECT * FROM state WHERE state_id = ? LIMIT 1",
        [state_id]
      );

      if (!stateRows || stateRows.length === 0) {
        return fail(req, "State not found", 404);
      }

      const state = stateRows[0];

      // Get areas for this state
      if (with_areas === '1') {
        const [areaRows]: any = await db.query(
          "SELECT * FROM state_area WHERE state_id = ? ORDER BY area_name ASC",
          [state_id]
        );
        state.areas = areaRows || [];
      }

      return ok(req, { data: state });
    }

    // Get all states
    const [stateRows]: any = await db.query(
      "SELECT * FROM state ORDER BY state_name ASC"
    );

    // If with_areas requested, get areas for each state
    if (with_areas === '1') {
      const [areaRows]: any = await db.query(
        "SELECT * FROM state_area ORDER BY state_id, area_name ASC"
      );

      // Group areas by state_id
      const areasByState: any = {};
      (areaRows || []).forEach((area: any) => {
        if (!areasByState[area.state_id]) {
          areasByState[area.state_id] = [];
        }
        areasByState[area.state_id].push(area);
      });

      // Add areas to each state
      (stateRows || []).forEach((state: any) => {
        state.areas = areasByState[state.state_id] || [];
      });
    }

    return ok(req, {
      data: stateRows || []
    });

  } catch (e: any) {
    console.error("States API Error:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500);
  }
}
