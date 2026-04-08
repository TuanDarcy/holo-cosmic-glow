import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding MongoDB Atlas...\n");
  
  // First, try to clear old data if it exists
  console.log("🗑️ Attempting to clear old data...");
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      console.log(`Found ${userCount} old users, clearing...`);
      
      // Delete in correct order to avoid foreign key issues
      await prisma.balanceHistory.deleteMany({});
      await prisma.orderItem.deleteMany({});
      await prisma.order.deleteMany({});
      await prisma.transaction.deleteMany({});
      await prisma.account.deleteMany({});
      await prisma.user.deleteMany({});
      await prisma.report.deleteMany({});
      await prisma.paymentMethod.deleteMany({});
      await prisma.category.deleteMany({});
      console.log("✅ Old data cleared\n");
    }
  } catch (e) {
    console.warn("⚠️ Could not clear old data (first run?):", e.message.substring(0, 50) + "\n");
  }

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: bcrypt.hashSync("1", 10),
      role: "ADMIN",
      balance: 1000000,
      active: true,
    },
  });
  console.log("✅ Admin created:", admin.id);

  // Create member users
  const member1 = await prisma.user.create({
    data: {
      username: "member1",
      password: bcrypt.hashSync("1", 10),
      role: "MEMBER",
      balance: 50000,
      active: true,
    },
  });
  console.log("✅ Member1 created:", member1.id);

  const member2 = await prisma.user.create({
    data: {
      username: "member2",
      password: bcrypt.hashSync("1", 10),
      role: "MEMBER",
      balance: 100000,
      active: true,
    },
  });
  console.log("✅ Member2 created:", member2.id);

  const ctv = await prisma.user.create({
    data: {
      username: "ctv1",
      password: bcrypt.hashSync("1", 10),
      role: "CTV",
      balance: 200000,
      active: true,
    },
  });
  console.log("✅ CTV created:", ctv.id);

  // Create categories
  await prisma.category.create({
    data: {
      name: "Tài khoản",
      description: "Bán tài khoản game",
      active: true,
    },
  });

  await prisma.category.create({
    data: {
      name: "Thẻ cào",
      description: "Bán thẻ cào",
      active: true,
    },
  });
  console.log("✅ Categories created");

  // Create transactions
  await prisma.transaction.create({
    data: {
      userId: admin.id,
      amount: 50000,
      type: "DEPOSIT",
      status: "SUCCESS",
      description: "Nạp tiền",
    },
  });

  await prisma.transaction.create({
    data: {
      userId: member2.id,
      amount: 100000,
      type: "DEPOSIT",
      status: "SUCCESS",
      description: "Nạp tiền",
    },
  });
  console.log("✅ Transactions created");

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: member1.id,
      totalAmount: 50000,
      status: "COMPLETED",
      items: {
        create: [
          {
            productName: "Tài khoản game A",
            quantity: 1,
            price: 50000,
            total: 50000,
          },
        ],
      },
    },
  });
  console.log("✅ Order created");

  // Create balance history
  await prisma.balanceHistory.create({
    data: {
      userId: member1.id,
      previousBalance: 100000,
      newBalance: 50000,
      change: -50000,
      reason: "Mua hàng",
    },
  });
  console.log("✅ Balance history created");

  // Create today's report
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.report.create({
    data: {
      date: today,
      totalRevenue: 150000,
      totalOrders: 1,
      totalDeposits: 150000,
      totalWithdrawals: 0,
      activeUsers: 3,
    },
  });
  console.log("✅ Report created");

  console.log("\n" + "=".repeat(50));
  console.log("✅✅✅ MongoDB Atlas seeded successfully!");
  console.log("=".repeat(50));
  console.log("\n📋 Test Credentials:");
  console.log("  Admin:   admin / 1 (Full access)");
  console.log("  Member1: member1 / 1 (50,000)");
  console.log("  Member2: member2 / 1 (100,000)");
  console.log("  CTV:     ctv1 / 1 (200,000)");
  console.log("\n🌐 Database: trackstat @ MongoDB Atlas");
  console.log("✅ Collections: User, Account, Category, Transaction, Order, Report, etc.");
}

main()
  .catch((e) => {
    console.error("\n❌ Seed error:");
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
