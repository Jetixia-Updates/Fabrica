import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleGetMe,
  handleLogout,
} from "./routes/auth";
import {
  handleGetProducts,
  handleGetProductDetail,
  handleCreateProduct,
  handleUpdateProduct,
} from "./routes/products";
import {
  handleGetOrders,
  handleGetOrderDetail,
  handleCreateOrder,
  handleUpdateOrderStatus,
} from "./routes/orders";
import { authenticateToken, requireAdmin } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // ============== Authentication Routes ==============
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/refresh-token", handleRefreshToken);
  app.get("/api/auth/me", handleGetMe);
  app.post("/api/auth/logout", handleLogout);

  // ============== Product Routes ==============
  app.get("/api/products", handleGetProducts);
  app.get("/api/products/:id", handleGetProductDetail);
  app.post("/api/products", handleCreateProduct); // Seller/Admin only
  app.put("/api/products/:id", handleUpdateProduct); // Seller/Admin only

  // ============== Order Routes ==============
  app.get("/api/orders", handleGetOrders); // Customer only
  app.get("/api/orders/:id", handleGetOrderDetail); // Customer only
  app.post("/api/orders", handleCreateOrder); // Customer
  app.put("/api/orders/:id/status", handleUpdateOrderStatus); // Seller/Admin only

  // Error handler - only for API routes
  app.use((req, res, next) => {
    // Only handle API routes that don't exist
    if (req.path.startsWith('/api/')) {
      res.status(404).json({
        success: false,
        error: "Route not found",
      });
    } else {
      // Let Vite handle non-API routes
      next();
    }
  });

  return app;
}
