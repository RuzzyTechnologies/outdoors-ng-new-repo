# API Proxy Layer (Hostinger Bridge)

This project uses a server-only proxy layer in Next.js to call the Hostinger PHP API over HTTPS. **Client code should only call Next.js API routes** and never connect directly to MySQL or external DB bridges.

## Required Environment Variables

Set these in `.env.local` (local) and Vercel (production):

```bash
HOSTINGER_API_BASE_URL="https://api.outdoors.com.ng"
NEXT_PUBLIC_APP_URL="https://outdoors.com.ng"
JWT_SECRET="your-actual-jwt-secret-here"
API_TIMEOUT_MS="15000"
```

> `HOSTINGER_API_BASE_URL` is server-only and **must not** be exposed to the client.

Optional upstream auth (only if Hostinger requires it):

```bash
HOSTINGER_API_KEY="your-hostinger-api-key"
HOSTINGER_API_KEY_HEADER="Authorization"
HOSTINGER_API_KEY_PREFIX="Bearer"
HOSTINGER_API_KEY_QUERY_PARAM="api_key"
```

If you set `HOSTINGER_API_KEY`, the proxy will send that header on every request.
If `HOSTINGER_API_KEY_QUERY_PARAM` is set, the key is also appended as a query param.

## Proxy Endpoints

All endpoints are served from the Next.js App Router (`app/api/**`).

### Health
- **GET** `/api/health`
  - Proxies to `HOSTINGER_API_BASE_URL/health.php`

### Billboards
- **GET** `/api/billboards`
  - Proxies to `HOSTINGER_API_BASE_URL/billboards/list.php`
  - Supports query parameters (e.g. `?limit=10&page=2`).
- **GET** `/api/billboards/:id`
  - Proxies to `HOSTINGER_API_BASE_URL/billboards/get.php?id=<id>`
  - Validates `id` as a positive integer.

### States
- **GET** `/api/states`
  - Proxies to `HOSTINGER_API_BASE_URL/states/list.php`
  - Supports query parameters (e.g. `?with_areas=1&state_id=1`).

### Optional (Scaffolded)
- **GET** `/api/categories` -> returns 501 until the Hostinger endpoint exists.
- **GET** `/api/products` -> returns 501 until the Hostinger endpoint exists.

## Local Testing

```bash
npm run dev
```

Then open:
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/billboards`

## Vercel Notes

- Configure all required env vars in Vercel project settings.
- These routes are server-only and safe for secrets.
- Requests use timeouts and return `502/504` for upstream issues.
- The proxy sends `Origin` and `Referer` headers using `NEXT_PUBLIC_APP_URL` to satisfy upstream allowlists.

