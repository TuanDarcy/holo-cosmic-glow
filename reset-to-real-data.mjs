import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function resetToRealData() {
  try {
    console.log("Resetting database to real-only data...");

    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.balanceHistory.deleteMany({});
    await prisma.transaction.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.paymentMethod.deleteMany({});
    await prisma.user.deleteMany({});

    const hashedPassword = bcrypt.hashSync("Trumblack2k7", 10);
    const admin = await prisma.user.create({
      data: {
        username: "tuandarcy",
        email: "sharkblack2k7",
        password: hashedPassword,
        role: "ADMIN",
        active: true,
        balance: 999999,
      },
    });

    console.log("Database reset complete.");
    console.log(
      `Admin: ${admin.username} | Email: ${admin.email} | Role: ${admin.role}`,
    );
  } catch (error) {
    console.error("Failed to reset database:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

resetToRealData();
