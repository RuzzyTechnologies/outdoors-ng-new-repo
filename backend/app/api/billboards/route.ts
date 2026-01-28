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
 * GET /api/billboards
 * Returns all products (billboards) with their categories, images, and location data
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const category_id = url.searchParams.get("category_id");
    const state = url.searchParams.get("state");
    const limit = Math.min(Number(url.searchParams.get("limit") || 100), 500);
    const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);

    // Get single billboard by ID
    if (id) {
      const query = `
        SELECT
          p.*,
          c.name as category_name,
          c.url as category_url,
          s.state_name,
          sa.area_name,
          (SELECT pi.name FROM product_images pi
           WHERE pi.product_id = p.product_id AND pi.default = 1 LIMIT 1) as default_image,
          (SELECT GROUP_CONCAT(pi.name) FROM product_images pi
           WHERE pi.product_id = p.product_id) as all_images
        FROM product p
        LEFT JOIN category c ON p.category_id = c.category_id
        LEFT JOIN state s ON p.state = s.state_id
        LEFT JOIN state_area sa ON p.state_area = sa.state_area_id
        WHERE p.product_id = ?
        LIMIT 1
      `;

      const [rows]: any = await db.query(query, [id]);
      const billboard = rows?.[0] || null;

      if (billboard && billboard.all_images) {
        billboard.images = billboard.all_images.split(',');
      }

      return ok(req, { data: billboard });
    }

    // Build filters
    let whereClause = "WHERE p.status = 1"; // Only active products
    const params: any[] = [];

    if (category_id) {
      whereClause += " AND p.category_id = ?";
      params.push(category_id);
    }

    if (state) {
      whereClause += " AND p.state = ?";
      params.push(state);
    }

    // Get all billboards with joins
    const query = `
      SELECT
        p.product_id,
        p.name,
        p.url,
        p.price,
        p.category_id,
        p.size,
        p.gps_location,
        p.address,
        p.state,
        p.state_area,
        p.long_desc as description,
        p.short_desc,
        p.product_status as status,
        p.date_added,
        p.date_updated,
        c.name as category_name,
        c.url as category_url,
        s.state_name,
        sa.area_name,
        (SELECT pi.name FROM product_images pi
         WHERE pi.product_id = p.product_id AND pi.default = 1 LIMIT 1) as image_url
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN state s ON p.state = s.state_id
      LEFT JOIN state_area sa ON p.state_area = sa.state_area_id
      ${whereClause}
      ORDER BY p.date_added DESC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);
    const [rows]: any = await db.query(query, params);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM product p ${whereClause}`;
    const [countRows]: any = await db.query(countQuery, params.slice(0, -2));
    const total = countRows[0]?.total || 0;

    return ok(req, {
      data: rows || [],
      total,
      limit,
      offset
    });

  } catch (e: any) {
    console.error("Billboards API Error:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500);
  }
}

/**
 * POST /api/billboards
 * Create a new billboard (product)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return fail(req, "Body must be a JSON object", 400);
    }

    // Map billboard data to product table structure
    const productData: any = {
      name: body.title || body.name,
      url: body.url || (body.title || body.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: body.price || 0,
      category_id: body.category_id || 1,
      shop_id: 0,
      quantity: 1,
      viewed: 0,
      sku: '',
      exp_date: '',
      weight: '',
      status: 1,
      product_status: body.status || 'available',
      size: body.size || '',
      gps_location: body.gps_location || '',
      address: body.address || body.location || '',
      state: body.state || '1',
      state_area: body.state_area || '1',
      long_desc: body.description || body.long_desc || '',
      short_desc: body.short_desc || body.description?.substring(0, 200) || '',
      meta_title: body.meta_title || body.title || body.name,
      meta_description: body.meta_description || '',
      meta_keyword: body.meta_keyword || '',
      date_added: new Date(),
      date_updated: new Date(),
      special: 0,
      product_related_id: 0,
      profit: 0
    };

    const [result]: any = await db.query("INSERT INTO product SET ?", [productData]);

    // Handle multiple images if provided
    if (result.insertId) {
      const images = body.images || (body.image_url ? [body.image_url] : []);

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imageData = {
            product_id: result.insertId,
            name: images[i],
            default: i === 0 ? 1 : 0, // First image is default
            date_created: new Date(),
            date_updated: new Date()
          };
          await db.query("INSERT INTO product_images SET ?", [imageData]);
        }
      }
    }

    return ok(req, {
      success: true,
      data: {
        product_id: result.insertId,
        ...productData
      }
    }, 201);

  } catch (e: any) {
    console.error("Billboards POST Error:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500);
  }
}

/**
 * PUT /api/billboards?id=X
 * Update a billboard (product)
 */
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return fail(req, "Missing 'id' query parameter", 400);
    }

    const body = await req.json();
    if (!body || typeof body !== "object") {
      return fail(req, "Body must be a JSON object", 400);
    }

    // Map billboard updates to product table
    const updates: any = {};

    if (body.title || body.name) updates.name = body.title || body.name;
    if (body.price !== undefined) updates.price = body.price;
    if (body.category_id) updates.category_id = body.category_id;
    if (body.size) updates.size = body.size;
    if (body.location || body.address) updates.address = body.location || body.address;
    if (body.state) updates.state = body.state;
    if (body.state_area) updates.state_area = body.state_area;
    if (body.gps_location) updates.gps_location = body.gps_location;
    if (body.description) {
      updates.long_desc = body.description;
      updates.short_desc = body.description.substring(0, 200);
    }
    if (body.status) updates.product_status = body.status;
    updates.date_updated = new Date();

    if (Object.keys(updates).length === 0) {
      return fail(req, "No fields to update", 400);
    }

    const [result]: any = await db.query(
      "UPDATE product SET ? WHERE product_id = ?",
      [updates, id]
    );

    // Update images if provided
    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      // Delete existing images
      await db.query("DELETE FROM product_images WHERE product_id = ?", [id]);

      // Insert new images
      for (let i = 0; i < body.images.length; i++) {
        const imageData = {
          product_id: id,
          name: body.images[i],
          default: i === 0 ? 1 : 0, // First image is default
          date_created: new Date(),
          date_updated: new Date()
        };
        await db.query("INSERT INTO product_images SET ?", [imageData]);
      }
    } else if (body.image_url) {
      // Single image update (backward compatibility)
      const [existingImages]: any = await db.query(
        "SELECT image_id FROM product_images WHERE product_id = ? AND `default` = 1",
        [id]
      );

      if (existingImages.length > 0) {
        await db.query(
          "UPDATE product_images SET name = ?, date_updated = ? WHERE product_id = ? AND `default` = 1",
          [body.image_url, new Date(), id]
        );
      } else {
        const imageData = {
          product_id: id,
          name: body.image_url,
          default: 1,
          date_created: new Date(),
          date_updated: new Date()
        };
        await db.query("INSERT INTO product_images SET ?", [imageData]);
      }
    }

    return ok(req, {
      success: true,
      affectedRows: result.affectedRows
    });

  } catch (e: any) {
    console.error("Billboards PUT Error:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500);
  }
}

/**
 * DELETE /api/billboards?id=X
 * Delete a billboard (product)
 */
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return fail(req, "Missing 'id' query parameter", 400);
    }

    // Delete images first
    await db.query("DELETE FROM product_images WHERE product_id = ?", [id]);

    // Delete product
    const [result]: any = await db.query("DELETE FROM product WHERE product_id = ?", [id]);

    return ok(req, {
      success: true,
      affectedRows: result.affectedRows
    });

  } catch (e: any) {
    console.error("Billboards DELETE Error:", e);
    return fail(req, e?.sqlMessage || e?.message || "Server error", 500);
  }
}
