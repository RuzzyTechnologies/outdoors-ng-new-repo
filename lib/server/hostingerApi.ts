import "server-only"

export class HostingerApiError extends Error {
  status?: number
  bodySnippet?: string
  isTimeout: boolean

  constructor(
    message: string,
    options?: { status?: number; bodySnippet?: string; isTimeout?: boolean }
  ) {
    super(message)
    this.name = "HostingerApiError"
    this.status = options?.status
    this.bodySnippet = options?.bodySnippet
    this.isTimeout = options?.isTimeout ?? false
  }
}

type QueryParams = Record<string, string | number | boolean>

const DEFAULT_TIMEOUT_MS = 15000
const DEFAULT_USER_AGENT = "OutdoorsNextProxy/1.0"

const getTimeoutMs = () => {
  const parsed = Number(process.env.API_TIMEOUT_MS)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS
}

const getBaseUrl = () => {
  const baseUrl = process.env.HOSTINGER_API_BASE_URL
  if (!baseUrl) {
    throw new HostingerApiError("HOSTINGER_API_BASE_URL is not configured", {
      status: 500,
    })
  }
  return baseUrl.replace(/\/+$/, "")
}

const getPublicOrigin = () => {
  const origin = process.env.NEXT_PUBLIC_APP_URL
  return origin ? origin.replace(/\/+$/, "") : null
}

const getAuthHeader = () => {
  const apiKey = process.env.HOSTINGER_API_KEY
  if (!apiKey) return null

  const headerName = (process.env.HOSTINGER_API_KEY_HEADER || "Authorization").trim()
  const prefix = (process.env.HOSTINGER_API_KEY_PREFIX ?? "Bearer").trim()
  const value = prefix ? `${prefix} ${apiKey}` : apiKey

  return { headerName, value }
}

const getApiKeyQueryParam = () => {
  const apiKey = process.env.HOSTINGER_API_KEY
  const paramName = process.env.HOSTINGER_API_KEY_QUERY_PARAM
  if (!apiKey || !paramName) return null
  return { paramName: paramName.trim(), value: apiKey }
}

const buildUrl = (path: string, params?: QueryParams) => {
  const baseUrl = getBaseUrl()
  const cleanedPath = path.replace(/^\//, "")
  const url = new URL(`${baseUrl}/${cleanedPath}`)
  const apiKeyParam = getApiKeyQueryParam()

  if (apiKeyParam?.paramName) {
    url.searchParams.set(apiKeyParam.paramName, apiKeyParam.value)
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      url.searchParams.set(key, String(value))
    })
  }

  return url.toString()
}

const request = async <T>(
  method: "GET" | "POST",
  path: string,
  options?: {
    params?: QueryParams
    body?: unknown
  }
): Promise<T> => {
  const url = buildUrl(path, options?.params)
  const timeoutMs = getTimeoutMs()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  const publicOrigin = getPublicOrigin()
  const authHeader = getAuthHeader()

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "User-Agent": DEFAULT_USER_AGENT,
        "X-Requested-With": "XMLHttpRequest",
        ...(publicOrigin ? { Origin: publicOrigin, Referer: `${publicOrigin}/` } : {}),
        ...(authHeader ? { [authHeader.headerName]: authHeader.value } : {}),
        ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
      },
      body: method === "POST" ? JSON.stringify(options?.body ?? {}) : undefined,
      cache: "no-store",
      signal: controller.signal,
    })

    const text = await response.text()
    const bodySnippet = text.slice(0, 300)

    let parsed: T | null = null
    if (text) {
      try {
        parsed = JSON.parse(text) as T
      } catch {
        throw new HostingerApiError("Hostinger API returned invalid JSON", {
          status: response.status,
          bodySnippet,
        })
      }
    }

    if (!response.ok) {
      throw new HostingerApiError(`Hostinger API error (${response.status})`, {
        status: response.status,
        bodySnippet,
      })
    }

    return parsed as T
  } catch (error) {
    if (error instanceof HostingerApiError) {
      throw error
    }

    if ((error as Error).name === "AbortError") {
      throw new HostingerApiError("Hostinger API request timed out", {
        status: 504,
        isTimeout: true,
      })
    }

    throw new HostingerApiError("Failed to reach Hostinger API", {
      status: 502,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

export const hostingerGet = <T>(path: string, params?: QueryParams) =>
  request<T>("GET", path, { params })

export const hostingerPost = <T>(path: string, body: unknown) =>
  request<T>("POST", path, { body })
