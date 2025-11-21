import { RequestHandler } from "express";

// GET /api/orders - Get user's orders
export const handleGetOrders: RequestHandler = (req, res) => {
  try {
    // In production, get from database filtered by user ID
    const mockOrders = [
      {
        id: "order-1",
        orderNumber: "ORD-2024-001",
        status: "DELIVERED",
        total: 67.98,
        items: [
          {
            productId: "1",
            name: "Premium Cotton Linen Blend",
            quantity: 2,
            unit: "meter",
            price: 24.99,
          },
        ],
        createdAt: new Date("2024-01-15"),
        deliveredAt: new Date("2024-01-20"),
      },
    ];

    res.json({
      success: true,
      data: mockOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch orders",
    });
  }
};

// GET /api/orders/:id - Get order details
export const handleGetOrderDetail: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const mockOrder = {
      id,
      orderNumber: "ORD-2024-001",
      status: "DELIVERED",
      items: [
        {
          id: "item-1",
          productId: "1",
          name: "Premium Cotton Linen Blend",
          color: "Natural",
          quantity: 2,
          unit: "meter",
          priceAtPurchase: 24.99,
          subtotal: 49.98,
        },
        {
          id: "item-2",
          productId: "3",
          name: "Silk Satin Fabric",
          color: "Gold",
          quantity: 1,
          unit: "roll",
          priceAtPurchase: 42.99,
          subtotal: 18.0,
        },
      ],
      subtotal: 67.98,
      shipping: 0,
      tax: 6.798,
      total: 74.778,
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
        phone: "+1 (555) 123-4567",
      },
      paymentMethod: "CARD",
      paymentStatus: "COMPLETED",
      createdAt: new Date("2024-01-15"),
      shippedAt: new Date("2024-01-17"),
      deliveredAt: new Date("2024-01-20"),
    };

    res.json({
      success: true,
      data: mockOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch order",
    });
  }
};

// POST /api/orders - Create new order
export const handleCreateOrder: RequestHandler = (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Cart cannot be empty",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        error: "Shipping address is required",
      });
    }

    // Calculate totals (mock)
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = (subtotal + shipping) * 0.1;
    const total = subtotal + shipping + tax;

    // Create order (in production, save to database)
    const newOrder = {
      id: "new-order-id",
      orderNumber: `ORD-${Date.now()}`,
      status: "PENDING",
      items,
      subtotal,
      shipping,
      tax,
      total,
      discount: 0,
      shippingAddress,
      paymentMethod,
      paymentStatus: "PENDING",
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      data: newOrder,
      message: "Order created successfully. Proceed to payment.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    });
  }
};

// PUT /api/orders/:id/status - Update order status (admin/seller only)
export const handleUpdateOrderStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "RETURNED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    // Update in database (mock)
    res.json({
      success: true,
      data: { id, status, updatedAt: new Date() },
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update order",
    });
  }
};
