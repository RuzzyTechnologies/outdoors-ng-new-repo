import { NextResponse } from "next/server";

function parseOrigins() {
  return (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function withCors(req: Request, res: NextResponse) {
  const allowed = parseOrigins();
  const origin = req.headers.get("origin") || "";

  // Always vary on Origin (important when behind caches/CDNs)
  res.headers.set("Vary", "Origin");

  // If it's a browser request with an Origin, only allow if whitelisted
  if (origin) {
    if (!allowed.includes(origin)) {
      return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
    }
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return res;
}
