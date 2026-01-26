import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /api/crud
  if (!pathname.startsWith("/api/crud")) {
    return NextResponse.next();
  }

  // (Optional) allow ping health check without auth
  if (request.nextUrl.searchParams.get("ping") === "1") {
    return NextResponse.next();
  }

  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  try {
    const payload = verifyToken(token);

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid/expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/crud/protected/:path*"]
};
