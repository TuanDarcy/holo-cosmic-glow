import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log("Creating admin account...");

    // Hash password
    const hashedPassword = bcrypt.hashSync("Trumblack2k7", 10);

    // Create or update admin user
    const admin = await prisma.user.upsert({
      where: { username: "tuandarcy" },
      update: {
        email: "sharkbalck2k7@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
        active: true,
        balance: 999999,
      },
      create: {
        username: "tuandarcy",
        email: "sharkbalck2k7@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
        active: true,
        balance: 999999,
      },
    });

    console.log("✅ Admin account created/updated successfully!");
    console.log(`
═══════════════════════════════════════
  Username: ${admin.username}
  Email: ${admin.email}
  Password: Trumblack2k7
  Role: ${admin.role}
  Balance: ${admin.balance}
  ID: ${admin.id}
═══════════════════════════════════════
    `);

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error creating admin:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

createAdmin();
