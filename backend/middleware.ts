import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get allowed origins from environment variable
  const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000").split(",").map(o => o.trim());
  const origin = request.headers.get("origin") || "";
  
  console.log('[v0] Middleware - Origin:', origin);
  console.log('[v0] Middleware - Allowed Origins:', allowedOrigins);

  // Handle preflight requests (OPTIONS)
  if (request.method === "OPTIONS") {
    if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }
    return new NextResponse(null, { status: 403 });
  }

  // Add CORS headers to all responses
  const response = NextResponse.next();
  
  if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  // Only protect /api/crud routes with JWT
  if (!pathname.startsWith("/api/crud")) {
    return response;
  }

  // (Optional) allow ping health check without auth
  if (request.nextUrl.searchParams.get("ping") === "1") {
    return response;
  }

  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401, headers: { "Access-Control-Allow-Origin": origin } });
  }

  try {
    const payload = verifyToken(token);

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403, headers: { "Access-Control-Allow-Origin": origin } });
    }

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid/expired token" },
      { status: 401, headers: { "Access-Control-Allow-Origin": origin } }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};