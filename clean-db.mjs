import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.DATABASE_URL ||
  "mongodb+srv://tuandarcy:Trumblack2k7@trackstat.mmri1ed.mongodb.net/shop2026?appName=Trackstat";

async function cleanDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("trackstat");
    const collections = await db.listCollections().toArray();

    console.log("\n📋 Available Collections:");
    collections.forEach((col) => console.log(`  - ${col.name}`));

    const toDelete = ["local", "sample_mflix", "trackstat"];

    console.log("\n🗑️  Deleting unused collections...");
    for (const colName of toDelete) {
      try {
        await db.dropCollection(colName);
        console.log(`  ✅ Deleted: ${colName}`);
      } catch (error) {
        console.log(`  ⚠️  Skipped: ${colName}`);
      }
    }

    const finalCollections = await db.listCollections().toArray();
    console.log("\n✅ Final Collections:");
    finalCollections.forEach((col) => console.log(`  - ${col.name}`));

    await client.close();
    console.log("\n✅ Database cleaned!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

cleanDatabase();
