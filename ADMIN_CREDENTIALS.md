# Admin Credentials

## Admin User
Created on: November 21, 2025

**Email:** `admin@fabrica.com`  
**Password:** `Admin@123456`  
**Role:** ADMIN

⚠️ **IMPORTANT:** Please change this password after your first login!

---

## How to Login

1. Go to `/login` page
2. Enter the email and password above
3. Click "Login"
4. You will be redirected to the home page
5. Access your account at `/account`

---

## Admin Capabilities

As an admin, you have access to:

- ✅ View all users (`GET /api/users`)
- ✅ View any user profile (`GET /api/users/:id`)
- ✅ Update any user profile (`PUT /api/users/:id`)
- ✅ Change user roles (`PUT /api/users/:id/role`)
- ✅ Delete users (`DELETE /api/users/:id`)
- ✅ Manage products
- ✅ Manage orders
- ✅ Full system access

---

## API Endpoints for User Management

### Get All Users (Admin Only)
```
GET /api/users
Authorization: Bearer {accessToken}
Query params: ?page=1&limit=20&role=CUSTOMER&search=john
```

### Get User by ID
```
GET /api/users/:id
Authorization: Bearer {accessToken}
```

### Update User Profile
```
PUT /api/users/:id
Authorization: Bearer {accessToken}
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+20 1234567890",
  "bio": "My bio"
}
```

### Change User Role (Admin Only)
```
PUT /api/users/:id/role
Authorization: Bearer {accessToken}
Body: {
  "role": "SELLER" // CUSTOMER | SELLER | ADMIN
}
```

### Delete User (Admin Only)
```
DELETE /api/users/:id
Authorization: Bearer {accessToken}
```

### Change Password
```
POST /api/users/:id/change-password
Authorization: Bearer {accessToken}
Body: {
  "currentPassword": "old password",
  "newPassword": "new password"
}
```

### Address Management
```
GET    /api/users/:id/addresses
POST   /api/users/:id/addresses
PUT    /api/users/:id/addresses/:addressId
DELETE /api/users/:id/addresses/:addressId
Authorization: Bearer {accessToken}
```

---

## Creating Additional Admin Users

Run the script:
```bash
npx tsx scripts/create-admin.ts
```

Or manually register a user and change their role via API:
```bash
curl -X PUT http://localhost:8080/api/users/{userId}/role \
  -H "Authorization: Bearer {adminAccessToken}" \
  -H "Content-Type: application/json" \
  -d '{"role":"ADMIN"}'
```
