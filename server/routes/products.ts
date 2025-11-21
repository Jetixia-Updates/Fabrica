import { RequestHandler } from "express";

// GET /api/products - List all products with filters
export const handleGetProducts: RequestHandler = (req, res) => {
  try {
    const { category, page = 1, limit = 20, search } = req.query;

    // Mock products data - in production, this would query the database
    const mockProducts = [
      {
        id: "1",
        name: "Premium Cotton Linen Blend",
        pricePerMeter: 24.99,
        category: "Cotton Fabrics",
        rating: 4.8,
        reviews: 234,
        images: [
          "https://images.unsplash.com/photo-1598084993000-cd4aaadc8dc0?w=400&h=400&fit=crop",
        ],
        material: "65% Cotton, 35% Linen",
        width: "145cm",
      },
      {
        id: "2",
        name: "Organic Cotton Canvas",
        pricePerMeter: 18.5,
        category: "Cotton Fabrics",
        rating: 4.6,
        reviews: 156,
        images: [
          "https://images.unsplash.com/photo-1591601487180-8a72e3a20ad0?w=400&h=400&fit=crop",
        ],
        material: "100% Cotton",
        width: "150cm",
      },
      {
        id: "3",
        name: "Silk Satin Fabric",
        pricePerMeter: 42.99,
        category: "Silk & Satin",
        rating: 4.9,
        reviews: 312,
        images: [
          "https://images.unsplash.com/photo-1585034697428-3fa24e74f4c5?w=400&h=400&fit=crop",
        ],
        material: "100% Silk",
        width: "140cm",
      },
    ];

    // Filter by category if provided
    let filtered = mockProducts;
    if (category) {
      filtered = mockProducts.filter((p) => p.category === category);
    }

    // Filter by search if provided
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.material.toLowerCase().includes(searchTerm),
      );
    }

    // Pagination
    const pageNum = parseInt(String(page)) || 1;
    const limitNum = parseInt(String(limit)) || 20;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        total: filtered.length,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(filtered.length / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch products",
    });
  }
};

// GET /api/products/:id - Get single product details
export const handleGetProductDetail: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    // Mock product detail
    const mockProduct = {
      id,
      name: "Premium Cotton Linen Blend",
      description:
        "Our Premium Cotton Linen Blend is perfect for various projects.",
      pricePerMeter: 24.99,
      pricePerRoll: 299.99,
      rollLength: 12,
      category: "Cotton Fabrics",
      rating: 4.8,
      reviews: 234,
      stock: 156,
      material: "65% Cotton, 35% Linen",
      width: "145cm",
      weight: "250g/m²",
      pattern: "Solid",
      care: "Machine wash cold, tumble dry medium",
      moq: 1,
      leadTime: "1-2 business days",
      images: [
        "https://images.unsplash.com/photo-1598084993000-cd4aaadc8dc0?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591601487180-8a72e3a20ad0?w=600&h=600&fit=crop",
      ],
      colors: ["Natural", "White", "Cream", "Light Gray"],
      specifications: [
        { label: "Composition", value: "65% Cotton, 35% Linen" },
        { label: "Width", value: "145cm" },
        { label: "Weight", value: "250g/m²" },
        { label: "Pattern", value: "Solid" },
      ],
    };

    res.json({
      success: true,
      data: mockProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    });
  }
};

// POST /api/products - Create new product (seller/admin only)
export const handleCreateProduct: RequestHandler = (req, res) => {
  try {
    const {
      name,
      description,
      category,
      pricePerMeter,
      pricePerRoll,
      width,
      material,
    } = req.body;

    // Validation
    if (!name || !category || !pricePerMeter) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // In production, save to database
    const newProduct = {
      id: "new-id",
      name,
      description,
      category,
      pricePerMeter,
      pricePerRoll,
      width,
      material,
      createdAt: new Date(),
    };

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create product",
    });
  }
};

// PUT /api/products/:id - Update product
export const handleUpdateProduct: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // In production, update in database
    res.json({
      success: true,
      data: { id, ...updates },
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update product",
    });
  }
};
