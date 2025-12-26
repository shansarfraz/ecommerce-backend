# Ecommerce Admin Dashboard - Environment Variables

## Required Environment Variables

### API Configuration

**NEXT_PUBLIC_API_URL** - The backend API URL
```
NEXT_PUBLIC_API_URL=https://ecommerce.shansarfraz.com
```

For local development, you can use:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Setup Instructions

1. Create a `.env.local` file in the root directory
2. Add the following content:

```env
NEXT_PUBLIC_API_URL=https://ecommerce.shansarfraz.com
```

## Admin Login Credentials

**Email:** admin@ecommerce.com
**Password:** Admin@2024!

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will run on http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```

## Features

- Dashboard with metrics
- Products management
- Orders tracking
- Customers management
- Vendors oversight
- Settings configuration

## Tech Stack

- Next.js 16.1.1
- React 19
- TypeScript
- Tailwind CSS 3.4
- shadcn/ui components
- Lucide icons

## API Endpoints Used

The admin dashboard integrates with the following API endpoints:

### Authentication
- POST /auth/login
- POST /auth/logout
- GET /auth/me

### Dashboard
- GET /admin/dashboard/metrics
- GET /admin/reports/sales
- GET /admin/reports/products

### Products
- GET /admin/products
- GET /products/{id}
- PATCH /admin/products/{id}
- DELETE /admin/products/{id}

### Orders
- GET /admin/orders
- GET /admin/orders/{id}
- PATCH /admin/orders/{id}

### Users/Customers
- GET /admin/users
- GET /admin/users/{id}
- PATCH /admin/users/{id}
- DELETE /admin/users/{id}

### Vendors
- GET /admin/vendors
- GET /admin/vendors/{id}
- PATCH /admin/vendors/{id}/status
- PATCH /admin/vendors/{id}/commission

## Notes

- All admin endpoints require authentication with a valid JWT token
- The token is stored in localStorage
- Admin role is required to access admin endpoints
