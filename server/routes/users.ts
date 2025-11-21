import { RequestHandler } from "express";
import { prisma } from "../db";
import bcrypt from "bcryptjs";

// Get all users (Admin only)
export const handleGetAllUsers: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {};
    
    if (role) {
      where.role = role;
    }
    
    if (search) {
      where.OR = [
        { email: { contains: String(search), mode: 'insensitive' } },
        { firstName: { contains: String(search), mode: 'insensitive' } },
        { lastName: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch users",
    });
  }
};

// Get single user (Admin or own profile)
export const handleGetUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUserId = (req as any).userId;
    const requestUserRole = (req as any).userRole;

    // Check if user can access this profile
    if (id !== requestUserId && requestUserRole !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
        sellerProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch user",
    });
  }
};

// Update user profile
export const handleUpdateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUserId = (req as any).userId;
    const requestUserRole = (req as any).userRole;

    // Check if user can update this profile
    if (id !== requestUserId && requestUserRole !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const { firstName, lastName, phone, avatar, bio } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone !== undefined && { phone }),
        ...(avatar !== undefined && { avatar }),
        ...(bio !== undefined && { bio }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        bio: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    });
  }
};

// Update user role (Admin only)
export const handleUpdateUserRole: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["CUSTOMER", "SELLER", "ADMIN"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: "Invalid role",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    res.json({
      success: true,
      data: updatedUser,
      message: "User role updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update role",
    });
  }
};

// Delete user (Admin only)
export const handleDeleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    });
  }
};

// Change password
export const handleChangePassword: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUserId = (req as any).userId;
    const { currentPassword, newPassword } = req.body;

    // Check if user can change this password
    if (id !== requestUserId) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Current and new passwords are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 6 characters",
      });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to change password",
    });
  }
};

// Get user addresses
export const handleGetUserAddresses: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUserId = (req as any).userId;

    // Check if user can access addresses
    if (id !== requestUserId) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: id },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch addresses",
    });
  }
};

// Add user address
export const handleAddUserAddress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUserId = (req as any).userId;

    if (id !== requestUserId) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zip,
      country,
      isDefault,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !phone || !address || !city || !state || !zip || !country) {
      return res.status(400).json({
        success: false,
        error: "All address fields are required",
      });
    }

    // If this is default, unset other defaults
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: id,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zip,
        country,
        isDefault: isDefault || false,
      },
    });

    res.status(201).json({
      success: true,
      data: newAddress,
      message: "Address added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to add address",
    });
  }
};

// Update user address
export const handleUpdateUserAddress: RequestHandler = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const requestUserId = (req as any).userId;

    if (id !== requestUserId) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zip,
      country,
      isDefault,
    } = req.body;

    // If this is default, unset other defaults
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: id, isDefault: true, id: { not: addressId } },
        data: { isDefault: false },
      });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: addressId, userId: id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(zip && { zip }),
        ...(country && { country }),
        ...(isDefault !== undefined && { isDefault }),
      },
    });

    res.json({
      success: true,
      data: updatedAddress,
      message: "Address updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update address",
    });
  }
};

// Delete user address
export const handleDeleteUserAddress: RequestHandler = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const requestUserId = (req as any).userId;

    if (id !== requestUserId) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    await prisma.address.delete({
      where: { id: addressId, userId: id },
    });

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete address",
    });
  }
};
