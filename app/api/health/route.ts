import { HostingerApiError, hostingerGet } from "@/lib/server/hostingerApi"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const handleError = (error: unknown) => {
  if (error instanceof HostingerApiError) {
    console.error("[hostinger] /api/health error", {
      status: error.status,
      isTimeout: error.isTimeout,
      bodySnippet: error.bodySnippet,
    })
    const status = error.isTimeout ? 504 : error.status ?? 502
    return NextResponse.json({ ok: false, error: error.message }, { status })
  }

  const message = error instanceof Error ? error.message : "Upstream service error"
  return NextResponse.json({ ok: false, error: message }, { status: 502 })
}

export async function GET() {
  try {
    const data = await hostingerGet<Record<string, unknown>>("/health.php")
    return NextResponse.json(data ?? { ok: true })
  } catch (error) {
    return handleError(error)
  }
}
