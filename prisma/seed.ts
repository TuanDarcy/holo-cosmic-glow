import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.balanceHistory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.report.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.category.deleteMany();

  // Create admin user
  const adminPassword = bcrypt.hashSync("1", 10);
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
      balance: 1000000,
      active: true,
    },
  });

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

  const member2 = await prisma.user.create({
    data: {
      username: "member2",
      password: bcrypt.hashSync("1", 10),
      role: "MEMBER",
      balance: 100000,
      active: true,
    },
  });

  const ctv = await prisma.user.create({
    data: {
      username: "ctv1",
      password: bcrypt.hashSync("1", 10),
      role: "CTV",
      balance: 200000,
      active: true,
    },
  });

  // Create categories
  const cat1 = await prisma.category.create({
    data: {
      name: "Tài khoản",
      description: "Bán tài khoản game",
      active: true,
    },
  });

  const cat2 = await prisma.category.create({
    data: {
      name: "Thẻ cào",
      description: "Bán thẻ cào",
      active: true,
    },
  });

  // Create some sample transactions
  await prisma.transaction.create({
    data: {
      userId: admin.id,
      amount: 50000,
      type: "DEPOSIT",
      status: "SUCCESS",
      description: "Nạp tiền lần 1",
    },
  });

  await prisma.transaction.create({
    data: {
      userId: member2.id,
      amount: 100000,
      type: "DEPOSIT",
      status: "SUCCESS",
      description: "Nạp tiền lần 1",
    },
  });

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

  console.log("✅ Database seeded successfully!");
  console.log("Admin:", admin);
  console.log("Members:", member1, member2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
