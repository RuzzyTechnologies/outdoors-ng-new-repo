import { HostingerApiError, hostingerGet } from "@/lib/server/hostingerApi"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const isValidId = (value: string) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0
}

const handleError = (error: unknown) => {
  if (error instanceof HostingerApiError) {
    console.error("[hostinger] /api/billboards/[id] error", {
      status: error.status,
      isTimeout: error.isTimeout,
      bodySnippet: error.bodySnippet,
    })
    const status = error.isTimeout || error.status === 504 ? 504 : error.status ?? 502
    return NextResponse.json({ ok: false, error: error.message }, { status })
  }

  const message = error instanceof Error ? error.message : "Failed to fetch billboard"
  return NextResponse.json({ ok: false, error: message }, { status: 502 })
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  if (!isValidId(id)) {
    return NextResponse.json({ ok: false, error: "Invalid billboard id" }, { status: 400 })
  }

  try {
    const data = await hostingerGet<unknown>("/billboards/get.php", { id })
    const payload: any = data ?? {}
    const record =
      payload?.data ??
      payload?.billboard ??
      payload?.product ??
      (payload && !Array.isArray(payload) ? payload : null)

    return NextResponse.json({ ok: true, data: record ?? null })
  } catch (error) {
    return handleError(error)
  }
}
