/**
 * Seed script for FabricHub e-commerce platform
 *
 * This script populates the database with:
 * - Sample users (admin, seller, customer)
 * - Sample fabric products (meter and roll variants)
 * - Sample product categories and specifications
 *
 * Usage: npx ts-node scripts/seed.ts
 */

const sampleProducts = [
  {
    name: "Premium Cotton Linen Blend",
    description:
      "A versatile cotton-linen blend perfect for fashion design, home décor, and upholstery projects.",
    category: "Cotton Fabrics",
    pricePerMeter: 24.99,
    pricePerRoll: 299.99,
    rollLength: 12,
    width: "145cm",
    material: "65% Cotton, 35% Linen",
    weight: "250g/m²",
    pattern: "Solid",
    colors: ["Natural", "White", "Cream", "Light Gray", "Taupe"],
    moq: 1,
    leadTime: "1-2 business days",
    images: [
      "https://images.unsplash.com/photo-1598084993000-cd4aaadc8dc0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590870969332-35c9e02ebc0f?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Organic Cotton Canvas",
    description:
      "Durable 100% organic cotton canvas suitable for bags, upholstery, and heavy-duty projects.",
    category: "Cotton Fabrics",
    pricePerMeter: 18.5,
    pricePerRoll: 185.0,
    rollLength: 10,
    width: "150cm",
    material: "100% Organic Cotton",
    weight: "450g/m²",
    pattern: "Solid",
    colors: ["Khaki", "Navy", "Black", "Natural", "Rust"],
    moq: 1,
    leadTime: "2-3 business days",
    images: [
      "https://images.unsplash.com/photo-1591601487180-8a72e3a20ad0?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Silk Satin Fabric",
    description:
      "Luxurious 100% silk satin with beautiful drape, perfect for evening wear and special occasions.",
    category: "Silk & Satin",
    pricePerMeter: 42.99,
    pricePerRoll: 514.8,
    rollLength: 12,
    width: "140cm",
    material: "100% Mulberry Silk",
    weight: "160g/m²",
    pattern: "Solid",
    colors: ["Burgundy", "Gold", "Silver", "Champagne", "Navy", "Black"],
    moq: 0.5,
    leadTime: "3-5 business days",
    images: [
      "https://images.unsplash.com/photo-1585034697428-3fa24e74f4c5?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Natural Linen Fabric",
    description:
      "Authentic European linen with characteristic texture, ideal for summer clothing and home décor.",
    category: "Linen",
    pricePerMeter: 19.99,
    pricePerRoll: 199.9,
    rollLength: 10,
    width: "148cm",
    material: "100% European Linen",
    weight: "200g/m²",
    pattern: "Solid",
    colors: ["Natural", "White", "Flax", "Sand", "Taupe", "Gray"],
    moq: 1,
    leadTime: "2-3 business days",
    images: [
      "https://images.unsplash.com/photo-1544367567-0d0a57b8f6d9?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Wool Tweed Roll",
    description:
      "Classic wool tweed perfect for tailoring, jackets, and upholstery with authentic Scottish heritage.",
    category: "Wool & Knits",
    pricePerMeter: 35.99,
    pricePerRoll: 449.88,
    rollLength: 12.5,
    width: "160cm",
    material: "85% Wool, 15% Synthetic",
    weight: "600g/m²",
    pattern: "Tweed",
    colors: ["Brown", "Gray", "Olive", "Navy", "Charcoal"],
    moq: 1,
    leadTime: "5-7 business days",
    images: [
      "https://images.unsplash.com/photo-1583391733981-21a38e7acc29?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Polyester Jersey Knit",
    description:
      "Comfortable polyester jersey knit stretch fabric, great for casual wear and activewear.",
    category: "Synthetic",
    pricePerMeter: 12.99,
    pricePerRoll: 129.9,
    rollLength: 10,
    width: "160cm",
    material: "100% Polyester",
    weight: "200g/m²",
    pattern: "Solid",
    colors: ["Black", "Navy", "White", "Gray", "Red", "Pink"],
    moq: 1,
    leadTime: "1-2 business days",
    images: [
      "https://images.unsplash.com/photo-1590870969332-35c9e02ebc0f?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Jacquard Brocade Fabric",
    description:
      "Intricate jacquard pattern fabric with metallic threads, perfect for upholstery and special garments.",
    category: "Specialty",
    pricePerMeter: 28.5,
    pricePerRoll: null,
    rollLength: null,
    width: "130cm",
    material: "65% Viscose, 35% Polyester",
    weight: "320g/m²",
    pattern: "Jacquard",
    colors: ["Gold", "Silver", "Burgundy", "Navy"],
    moq: 2,
    leadTime: "5-7 business days",
    images: [
      "https://images.unsplash.com/photo-1535629066539-c8159348e113?w=600&h=600&fit=crop",
    ],
  },
  {
    name: "Cotton Voile",
    description:
      "Light and airy cotton voile, perfect for summer dresses, curtains, and baby fabrics.",
    category: "Cotton Fabrics",
    pricePerMeter: 9.99,
    pricePerRoll: 99.9,
    rollLength: 10,
    width: "145cm",
    material: "100% Cotton",
    weight: "100g/m²",
    pattern: "Solid",
    colors: ["White", "Cream", "Pale Blue", "Pale Pink", "Pale Yellow"],
    moq: 1,
    leadTime: "1-2 business days",
    images: [
      "https://images.unsplash.com/photo-1548187528-55a613bb119d?w=600&h=600&fit=crop",
    ],
  },
];

const sampleUsers = [
  {
    email: "admin@fabrichub.com",
    password: "admin123", // In production, use strong passwords
    firstName: "Admin",
    lastName: "User",
    role: "ADMIN",
  },
  {
    email: "seller@fabrichub.com",
    password: "seller123",
    firstName: "Fabric",
    lastName: "Seller",
    role: "SELLER",
    shopName: "Premium Fabrics Co.",
    shopDescription: "High-quality fabrics for every project",
  },
  {
    email: "customer@fabrichub.com",
    password: "customer123",
    firstName: "John",
    lastName: "Doe",
    role: "CUSTOMER",
  },
];

async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Note: In a real implementation, you would use Prisma to seed the database
    // For now, this is a template showing what would be seeded

    console.log("📦 Sample Products to be seeded:");
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Category: ${product.category}`);
      console.log(
        `   Price: $${product.pricePerMeter}/m${product.pricePerRoll ? ` or $${product.pricePerRoll}/roll` : ""}`,
      );
      console.log(`   Material: ${product.material}`);
      console.log(`   Colors: ${product.colors.join(", ")}`);
      console.log("");
    });

    console.log("👥 Sample Users to be seeded:");
    sampleUsers.forEach((user) => {
      console.log(
        `- ${user.firstName} ${user.lastName} (${user.email}) [${user.role}]`,
      );
    });

    console.log("\n✅ Seed data prepared successfully!");
    console.log("\n📝 To apply seeds to database:");
    console.log("   1. Set up Prisma with 'npm install @prisma/client'");
    console.log("   2. Configure DATABASE_URL in .env");
    console.log("   3. Run 'npx prisma migrate dev'");
    console.log(
      "   4. Import and run this seed function in your Prisma seed.ts",
    );
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

export { sampleProducts, sampleUsers };
