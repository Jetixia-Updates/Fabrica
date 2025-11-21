# 🧵 FabricHub - E-Commerce Platform for Premium Fabrics

A full-stack e-commerce platform for selling fabrics by the **meter** and by the **roll**. Built with React, Node.js, Express, Prisma, and PostgreSQL.

## ✨ Features

- 🛍️ **Dual Pricing Model**: Sell fabrics by meter or by roll
- 🔐 **JWT Authentication**: Secure user authentication with refresh tokens
- 👥 **Role-Based Access**: Customer, Seller, and Admin roles
- 📦 **Order Lifecycle**: PENDING → PAID → SHIPPED → DELIVERED → RETURNED
- 💳 **Multiple Payment Methods**: Stripe integration + Cash on Delivery
- 🔍 **Product Search & Filters**: By category, color, width, price range
- 🛒 **Shopping Cart**: With unit conversion (meters ↔ rolls)
- 📊 **Dashboard**: Seller and Admin dashboards (coming soon)
- 🎨 **Modern UI**: Beautiful, responsive design inspired by Amazon
- 🌍 **RTL Support**: Ready for Arabic and other RTL languages
- 📱 **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PNPM 10+
- Docker & Docker Compose (optional, for local database)
- PostgreSQL 16+ (or use Docker)

### 1. Clone & Install

```bash
git clone <repository-url>
cd fabrichub
pnpm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
DATABASE_URL="postgresql://admin:password@localhost:5432/fabrichub"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-key-change-in-production"
```

### 3. Setup Database (with Docker)

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on port 5432
- Redis on port 6379

### 4. Initialize Database

```bash
# Create Prisma client and setup schema
pnpm install @prisma/client prisma

# Create database tables
npx prisma migrate dev --name init

# Seed with sample data
npx ts-node scripts/seed.ts
```

### 5. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:8080

## 📁 Project Structure

```
.
├── client/                  # React frontend
│   ├── pages/              # Route components (Home, Products, Cart, etc)
│   ├── components/         # Reusable UI components
│   ├── App.tsx             # Main app with routing
│   └── global.css          # Tailwind CSS theming
│
├── server/                 # Express backend
│   ├── routes/             # API endpoints (auth, products, orders)
│   └── index.ts            # Server setup and route registration
│
├── shared/                 # Shared types
│   └── api.ts              # API interfaces
│
├── prisma/                 # Database schema
│   └── schema.prisma       # Data models
│
├── scripts/                # Utility scripts
│   └── seed.ts             # Database seeding
│
├── .github/workflows/      # CI/CD pipelines
│   └── ci.yml              # GitHub Actions
│
├── docker-compose.yml      # Local dev database
├── Dockerfile              # Production build
└── README.md               # This file
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products

- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (seller/admin)
- `PUT /api/products/:id` - Update product (seller/admin)

### Orders

- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (seller/admin)

## 💾 Database Schema

Key tables:

- **users**: User accounts with roles
- **products**: Fabric products with meter/roll pricing
- **variants**: Product attributes (color, width, material, pattern)
- **skus**: Stock keeping units
- **inventory**: Stock levels by product/color
- **orders**: Customer orders
- **order_items**: Individual items in orders
- **payments**: Payment records
- **coupons**: Discount codes
- **seller_profile**: Seller information

## 🏗️ Building for Production

### Build

```bash
pnpm build
```

Outputs:

- `dist/spa/` - Client build
- `dist/server/` - Server build

### Docker Build

```bash
docker build -t fabrichub:1.0.0 .
```

### Run in Docker

```bash
docker run -p 8080:8080 \
  -e DATABASE_URL="postgresql://..." \
  -e REDIS_URL="redis://..." \
  -e JWT_SECRET="..." \
  fabrichub:1.0.0
```

## 🧪 Testing

### Run Tests

```bash
pnpm test
```

### Type Check

```bash
pnpm typecheck
```

### Code Format

```bash
pnpm format.fix
```

## 📋 Sample API Usage

### Register User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Get Products

```bash
curl http://localhost:8080/api/products?category=Cotton%20Fabrics&limit=10
```

### Create Order

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "1",
        "quantity": 2,
        "unit": "meter",
        "color": "Natural",
        "price": 24.99
      }
    ],
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    },
    "paymentMethod": "CARD"
  }'
```

## 🔐 Security Checklist

- [x] Input validation (Zod schemas)
- [x] JWT authentication with refresh tokens
- [x] CORS enabled
- [x] HTTPS in production (configure reverse proxy)
- [x] Rate limiting (implement in production)
- [x] SQL injection prevention (Prisma ORM)
- [x] XSS protection (React auto-escaping)
- [ ] CSRF tokens (implement as needed)
- [ ] 2FA for admin (implement as needed)

## 🚀 Deployment

### Netlify

```bash
# Connect your repo and push
git push origin main

# Netlify auto-deploys from repository
```

### Vercel

```bash
# Deploy with Vercel CLI
vercel
```

### Self-Hosted (Linux)

1. Setup environment on server
2. Build: `pnpm build`
3. Run: `node dist/server/node-build.mjs`
4. Use reverse proxy (nginx/Apache) with HTTPS
5. Setup database (PostgreSQL, Redis)

### Docker on AWS ECS

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker build -t fabrichub:latest .
docker tag fabrichub:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/fabrichub:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/fabrichub:latest
```

## 📚 Documentation

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Radix UI Docs](https://www.radix-ui.com/)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 Sample Test File

See `client/lib/utils.spec.ts` for example unit tests.

## 🎓 Learning Resources

- [Full-Stack Development](https://www.prisma.io/docs/)
- [E-Commerce Best Practices](https://www.shopify.com/blog)
- [API Design](https://swagger.io/tools/swagger-editor/)

## 📄 License

MIT License - feel free to use this project commercially

## 🙋 Support

For issues and questions:

- GitHub Issues: [Open Issue](https://github.com/yourusername/fabrichub/issues)
- Email: support@fabrichub.example.com

## 🎯 Roadmap

- [ ] Seller Dashboard
- [ ] Admin Dashboard
- [ ] Full Stripe integration
- [ ] PDF Invoice generation
- [ ] Email notifications
- [ ] Product reviews & ratings
- [ ] Wishlist feature
- [ ] Advanced search with Elasticsearch
- [ ] Mobile app (React Native)
- [ ] Kubernetes deployment

---

**Built with ❤️ for the fabric and textile industry**
