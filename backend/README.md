# Outdoors Next.js CRUD API (auto-generated)

This project exposes CRUD endpoints for **all tables** found in the provided SQL dump.

## 1) Requirements
- Node.js 18+
- MySQL/MariaDB running locally (XAMPP is fine)
- Import the provided SQL dump into a local database

## 2) Import the database
Create a database named `u821909870_outdo` (or any name you prefer) and import the dump.

Example (CLI):
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS u821909870_outdo;"
mysql -u root -p u821909870_outdo < "u821909870_outdo.sql"
```

## 3) Configure env
Copy `.env.example` to `.env.local` and set your credentials:
```bash
cp .env.example .env.local
```

## 4) Install & run
```bash
npm install
npm run dev
```

Health check:
- GET http://localhost:3000/api/health

## 5) Auth (for write operations)
Write operations (POST/PUT/DELETE) require a JWT.

Login:
- POST http://localhost:3000/api/auth/login
Body:
```json
{ "usernameOrEmail": "admin", "password": "YOUR_PASSWORD" }
```

Response includes `token`.

Use it:
```
Authorization: Bearer <token>
```

### Read vs Write
- GET/HEAD/OPTIONS: allowed without auth (so your v0 frontend can fetch public data)
- POST/PUT/DELETE: require `Authorization: Bearer <token>`

## 6) Endpoints
For each table:
- GET  /api/<table>                (list)
- POST /api/<table>                (create)   [auth required]
If the table has a single-column primary key:
- GET    /api/<table>/<id>         (read one)
- PUT    /api/<table>/<id>         (update)   [auth required]
- DELETE /api/<table>/<id>         (delete)   [auth required]

Tables detected: admin_users, category, category_product, deployment, emails, guest_users, installation, monitoring, paid_monitoring, paid_quotes, paid_quotes_chat, print, product, product_images, quotes, quotes_chat, state, state_area, users

## 7) Using from v0 (frontend)
In your v0/Next.js UI, fetch data like:
```ts
const res = await fetch("/api/category");
const categories = await res.json();
```

For admin write actions:
```ts
await fetch("/api/category", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ name: "New", url: "new", parent_id: 0, category: 0 })
});
```

## Notes
- Some tables may require specific NOT NULL columns. If MySQL rejects an insert, include the required fields in your JSON.
- This is a baseline scaffold. For production, add pagination, validation, and role checks per table.
