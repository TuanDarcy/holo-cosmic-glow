import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️ Clearing all collections...");
  
  try {
    await prisma.balanceHistory.deleteMany({});
    console.log("✅ BalanceHistory cleared");
  } catch (e) {
    console.log("⚠️ BalanceHistory error:", e.message);
  }

  try {
    await prisma.orderItem.deleteMany({});
    console.log("✅ OrderItem cleared");
  } catch (e) {
    console.log("⚠️ OrderItem error:", e.message);
  }

  try {
    await prisma.order.deleteMany({});
    console.log("✅ Order cleared");
  } catch (e) {
    console.log("⚠️ Order error:", e.message);
  }

  try {
    await prisma.transaction.deleteMany({});
    console.log("✅ Transaction cleared");
  } catch (e) {
    console.log("⚠️ Transaction error:", e.message);
  }

  try {
    await prisma.account.deleteMany({});
    console.log("✅ Account cleared");
  } catch (e) {
    console.log("⚠️ Account error:", e.message);
  }

  try {
    await prisma.user.deleteMany({});
    console.log("✅ User cleared");
  } catch (e) {
    console.log("⚠️ User error:", e.message);
  }

  try {
    await prisma.report.deleteMany({});
    console.log("✅ Report cleared");
  } catch (e) {
    console.log("⚠️ Report error:", e.message);
  }

  try {
    await prisma.paymentMethod.deleteMany({});
    console.log("✅ PaymentMethod cleared");
  } catch (e) {
    console.log("⚠️ PaymentMethod error:", e.message);
  }

  try {
    await prisma.category.deleteMany({});
    console.log("✅ Category cleared");
  } catch (e) {
    console.log("⚠️ Category error:", e.message);
  }

  console.log("\n✅ All collections cleared!");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
