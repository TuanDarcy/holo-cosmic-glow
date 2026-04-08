#!/usr/bin/env node

/**
 * MongoDB Setup Script
 * Tự động setup MongoDB, tạo collections, seed dữ liệu
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 MongoDB Setup Script\n");

// 1. Check .env file
console.log("1️⃣ Checking .env file...");
const envPath = path.join(__dirname, ".env");
const envContent = fs.readFileSync(envPath, "utf-8");

if (envContent.includes("<DB_PASSWORD>")) {
  console.error("❌ ERROR: Replace <DB_PASSWORD> in .env file first!");
  console.error("   Edit .env and set your MongoDB password");
  process.exit(1);
}

console.log("✅ .env configured\n");

// 2. Push schema to MongoDB
console.log("2️⃣ Creating MongoDB collections...");
try {
  execSync("npx prisma db push", { stdio: "inherit" });
  console.log("✅ Collections created\n");
} catch (error) {
  console.error("❌ Failed to push schema to MongoDB");
  console.error("   Make sure MongoDB connection string is correct");
  process.exit(1);
}

// 3. Seed data
console.log("3️⃣ Seeding initial data...");
try {
  execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
  console.log("✅ Data seeded\n");
} catch (error) {
  console.error("❌ Failed to seed data");
  process.exit(1);
}

// 4. Summary
console.log("\n" + "=".repeat(50));
console.log("🎉 MongoDB Setup Complete!");
console.log("=".repeat(50));
console.log("\n📋 Test Credentials:\n");
console.log("  Admin:   admin / 1");
console.log("  Member1: member1 / 1");
console.log("  Member2: member2 / 1");
console.log("  CTV:     ctv1 / 1");
console.log("\n🌐 Database: trackstat @ MongoDB Atlas");
console.log("✅ Collections: User, Account, Category, Transaction, etc.");
console.log("\n🚀 Next: Build Express API & React Frontend");
console.log("=".repeat(50) + "\n");
