import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signAdminToken } from "@/lib/jwt";
import { verifyLegacyPassword } from "@/lib/password";
import { withCors } from "@/lib/cors";

export async function OPTIONS(req: Request) {
  return withCors(req, new NextResponse(null, { status: 204 }));
}

export async function POST(req: Request) {
  try {
    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return withCors(req, NextResponse.json({ error: "Missing credentials" }, { status: 400 }));
    }

    const [rows]: any = await db.query(
      "SELECT * FROM `admin_users` WHERE `email` = ? OR `username` = ? LIMIT 1",
      [usernameOrEmail, usernameOrEmail]
    );

    const user = rows?.[0];
    if (!user) {
      return withCors(req, NextResponse.json({ error: "Invalid credentials" }, { status: 401 }));
    }

    const stored = user.password ?? user.pass ?? user.user_password;
    if (!stored) {
      return withCors(
        req,
        NextResponse.json({ error: "Password column not found on user record" }, { status: 500 })
      );
    }

    const ok = await verifyLegacyPassword(password, String(stored));
    if (!ok) {
      return withCors(req, NextResponse.json({ error: "Invalid credentials" }, { status: 401 }));
    }

    const id = user.admin_users_id ?? user.id ?? user.user_id;
    const token = signAdminToken(String(id));

    return withCors(
      req,
      NextResponse.json({
        token,
        admin: {
          id,
          email: user.email,
          username: user.username,
        },
      })
    );
  } catch (e: any) {
    console.error("LOGIN ERROR:", e);
    return withCors(req, NextResponse.json({ error: "Server error" }, { status: 500 }));
  }
}
