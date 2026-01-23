# MySQL API Setup Instructions

## Step 1: Configure the PHP API

1. Open `api.php` and edit these lines at the top:

```php
$DB_HOST = 'localhost';           // Your MySQL host
$DB_USER = 'your_username';       // Your MySQL username
$DB_PASS = 'your_password';       // Your MySQL password
$DB_NAME = 'your_database';       // Your database name
$API_SECRET_KEY = 'your-secret-key-here';  // Create a secure random key
```

2. Edit the `$allowedTables` array to include your table names:

```php
$allowedTables = [
    'billboards',
    'categories',
    'locations',
    // Add your tables here
];
```

## Step 2: Upload to Your Server

1. Upload `api.php` to your server via FTP or cPanel File Manager
2. Recommended location: `https://yourserver.com/api/api.php`
3. Make sure the file has proper permissions (644)

## Step 3: Test the API

Visit in your browser:
```
https://yourserver.com/api/api.php?action=health
```

You should see:
```json
{"error": "Unauthorized"}
```

This is correct! The API requires the secret key.

## Step 4: Add Environment Variables to Vercel

In your Vercel project (or v0 sidebar), add these environment variables:

| Key | Value |
|-----|-------|
| `MYSQL_API_URL` | `https://yourserver.com/api/api.php` |
| `MYSQL_API_KEY` | Your `$API_SECRET_KEY` value from step 1 |

## Step 5: Usage in Your Next.js App

```typescript
import { billboards, categories, locations } from '@/lib/mysql-api';

// Get all billboards
const allBillboards = await billboards.getAll();

// Get featured billboards
const featured = await billboards.getFeatured();

// Get billboards by state
const lagosBillboards = await billboards.getByState('Lagos');

// Search billboards
const results = await billboards.search('LED');

// Create a new billboard
const newId = await billboards.create({
  title: 'New Billboard',
  location: 'Lekki, Lagos',
  price: 500000
});

// Update a billboard
await billboards.update(1, { price: 600000 });

// Delete a billboard
await billboards.delete(1);
```

## API Endpoints Reference

| Action | Description | Example |
|--------|-------------|---------|
| `getAll` | Get all records | `?action=getAll&table=billboards` |
| `getOne` | Get by ID | `?action=getOne&table=billboards&id=1` |
| `search` | Search by field | `?action=search&table=billboards&field=title&value=LED` |
| `getByField` | Get by exact value | `?action=getByField&table=billboards&field=state&value=Lagos` |
| `insert` | Create record | POST with JSON body |
| `update` | Update record | POST with `id` and JSON body |
| `delete` | Delete record | `?action=delete&table=billboards&id=1` |
| `tables` | List all tables | `?action=tables` |
| `health` | Check API status | `?action=health` |

## Security Notes

- The API uses prepared statements to prevent SQL injection
- Only whitelisted tables can be accessed
- Only SELECT queries are allowed for custom queries
- All requests require the API key in the `X-API-Key` header
- CORS is enabled for cross-origin requests
