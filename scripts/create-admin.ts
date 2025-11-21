import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@fabrica.com" },
    update: {},
    create: {
      email: "admin@fabrica.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      phone: "+20123456789",
    },
  });

  console.log("Admin user created:", admin);
  console.log("\nAdmin Credentials:");
  console.log("Email: admin@fabrica.com");
  console.log("Password: Admin@123456");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
