import { HostingerApiError, hostingerGet } from "@/lib/server/hostingerApi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await hostingerGet<{ data?: unknown[] }>("/products/list.php")
    return NextResponse.json({ ok: true, data: data?.data ?? data ?? [] })
  } catch (error) {
    if (error instanceof HostingerApiError && error.status === 404) {
      return NextResponse.json(
        { ok: false, error: "Products endpoint not available yet." },
        { status: 501 }
      )
    }

    if (error instanceof HostingerApiError) {
      console.error("[hostinger] /api/products error", {
        status: error.status,
        isTimeout: error.isTimeout,
        bodySnippet: error.bodySnippet,
      })
      const status = error.isTimeout ? 504 : error.status ?? 502
      return NextResponse.json({ ok: false, error: error.message }, { status })
    }

    const message = error instanceof Error ? error.message : "Failed to fetch products"
    return NextResponse.json({ ok: false, error: message }, { status: 502 })
  }
}
