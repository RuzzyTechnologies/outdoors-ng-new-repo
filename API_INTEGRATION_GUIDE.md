# Outdoors API Integration Guide

## Setup Instructions

### 1. Environment Variables

Add this to your `.env.local` file in the v0 project:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
# For production, use your backend URL:
# NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.vercel.app
```

### 2. Backend Requirements

Make sure your backend API is running and:
- Has the `/api/auth/login` endpoint for authentication
- Has the `/api/crud` endpoint for CRUD operations
- Has CORS configured to allow requests from your frontend

### 3. Usage Examples

#### Login

```typescript
import { login } from '@/lib/outdoors-api';
import { storeToken } from '@/lib/auth-storage';

const handleLogin = async () => {
  try {
    const response = await login({
      usernameOrEmail: 'admin@example.com',
      password: 'password',
    });
    storeToken(response.token, response.admin);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

#### Get All Categories

```typescript
import { categories } from '@/lib/outdoors-api';
import { getToken } from '@/lib/auth-storage';

const token = getToken();
const categoryList = await categories.getAll(token);
```

#### Create a Category

```typescript
import { categories } from '@/lib/outdoors-api';

const newCategory = await categories.create(
  {
    name: 'Billboards',
    url: 'billboards',
    parent_id: 0,
  },
  token
);
```

#### Update a Category

```typescript
const updated = await categories.update(
  103, // ID
  { name: 'Updated Name' },
  token
);
```

#### Delete a Category

```typescript
const success = await categories.delete(103, token);
```

### 4. Using the useAuth Hook

```typescript
import { useAuth } from '@/hooks/use-auth';

export function MyComponent() {
  const { token, admin, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {admin?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 5. Available API Methods

#### Categories
- `categories.getAll(token)` - Get all categories
- `categories.getOne(id, token)` - Get single category
- `categories.create(data, token)` - Create new category
- `categories.update(id, data, token)` - Update category
- `categories.delete(id, token)` - Delete category

#### Products
- `products.getAll(token)` - Get all products
- `products.getOne(id, token)` - Get single product
- `products.create(data, token)` - Create new product
- `products.update(id, data, token)` - Update product
- `products.delete(id, token)` - Delete product

#### States
- `states.getAll(token)` - Get all states
- `states.getOne(id, token)` - Get single state
- `states.create(data, token)` - Create new state
- `states.update(id, data, token)` - Update state
- `states.delete(id, token)` - Delete state

#### State Areas
- `stateAreas.getAll(token)` - Get all areas
- `stateAreas.getOne(id, token)` - Get single area
- `stateAreas.create(data, token)` - Create new area
- `stateAreas.update(id, data, token)` - Update area
- `stateAreas.delete(id, token)` - Delete area

#### Admin Users
- `adminUsers.getAll(token)` - Get all admins
- `adminUsers.create(data, token)` - Create new admin
- `adminUsers.update(id, data, token)` - Update admin
- `adminUsers.delete(id, token)` - Delete admin

#### Category Products (Junction)
- `categoryProducts.getAll(token)` - Get all relationships
- `categoryProducts.create(data, token)` - Create relationship
- `categoryProducts.delete(id, token)` - Delete relationship

### 6. Error Handling

```typescript
try {
  const categories = await categories.getAll(token);
} catch (error) {
  if (error.message === 'Unauthorized - Please login again') {
    // Redirect to login
    router.push('/admin-dash1234/login');
  } else if (error.message === 'Forbidden - Admin access required') {
    // Show access denied message
  } else {
    // Show generic error
    console.error('Error:', error.message);
  }
}
```

### 7. Example Component

See `/components/category-manager.tsx` for a complete example of:
- Fetching data
- Creating records
- Updating records
- Deleting records
- Error handling
- Loading states

## Files Created

1. `/lib/outdoors-api.ts` - Main API client with all CRUD operations
2. `/lib/auth-storage.ts` - JWT token storage and validation
3. `/hooks/use-auth.ts` - Custom hook for auth state management
4. `/components/category-manager.tsx` - Example CRUD component
5. Updated `/app/admin-dash1234/login/page.tsx` - Real API login

## API Endpoints Reference

All requests to the following endpoints are handled:

- `POST /api/auth/login` - User login
- `GET /api/crud?table=:tableName` - Read all records
- `GET /api/crud?table=:tableName&id=:id` - Read single record
- `POST /api/crud?table=:tableName` - Create record
- `PUT /api/crud?table=:tableName` - Update record
- `DELETE /api/crud?table=:tableName&id=:id` - Delete record

All CRUD requests require:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## Troubleshooting

**Login fails with "API error: 401"**
- Check your credentials
- Verify the backend is running
- Check if NEXT_PUBLIC_API_BASE_URL is correct

**CORS error when making requests**
- Verify CORS_ORIGINS environment variable on backend includes your frontend URL
- Check backend CORS configuration

**Token not persisting**
- Check if localStorage is available (not in SSR context)
- Verify useAuth hook is used in client components only

**"Unauthorized" error on CRUD operations**
- Token may have expired
- User session was cleared
- Try logging in again

## Next Steps

1. Configure backend API URL in `.env.local`
2. Update admin dashboard pages to use the API components
3. Integrate category manager and other CRUD pages
4. Add authentication guards to protected routes
5. Deploy to production with proper environment variables
