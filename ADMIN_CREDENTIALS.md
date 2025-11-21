# Admin Credentials

## Default Admin User

**Email:** admin@fabrica.com  
**Password:** Admin@123456

## System URLs

- **Application:** http://localhost:8080
- **Admin Dashboard:** http://localhost:8080/admin
- **Login:** http://localhost:8080/login

## Database

**MongoDB Atlas:**
- Connection String: mongodb+srv://Vercel-Admin-Fabrica:vZuKkoTDoqtqqPd3@fabrica.moapaow.mongodb.net/fabrica
- Database: fabrica

## Features

### Admin Dashboard
- User Management (CRM)
- Product Management (ERP)
- Order Management
- Inventory Control
- Category Management
- Coupon System
- Analytics & Reports
- Site Settings

### Authentication
- JWT-based authentication
- Role-based access control (CUSTOMER, SELLER, ADMIN)
- Refresh token mechanism
- Secure password hashing with bcrypt

### API Endpoints

#### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login
- POST /api/auth/refresh-token - Refresh access token
- GET /api/auth/me - Get current user
- POST /api/auth/logout - Logout

#### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product details
- POST /api/products - Create product (Seller/Admin)
- PUT /api/products/:id - Update product (Seller/Admin)

#### Orders
- GET /api/orders - Get user orders
- GET /api/orders/:id - Get order details
- POST /api/orders - Create order
- PUT /api/orders/:id/status - Update order status (Seller/Admin)

## Development

```bash
# Install dependencies
npm install

# Push database schema
npx prisma db push

# Create admin user
npx tsx scripts/create-admin.ts

# Start development server
npm run dev
```

## Production

```bash
# Build application
npm run build

# Start production server
npm start
```

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS
- **Backend:** Express.js + Node.js
- **Database:** MongoDB with Prisma ORM
- **Authentication:** JWT + bcrypt
- **UI:** shadcn/ui components + Radix UI

## Notes

- Admin dashboard requires ADMIN role
- All admin routes are protected with authentication middleware
- MongoDB connection uses SSL by default
- JWT tokens expire after 15 minutes (access) and 7 days (refresh)
