import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { guards, checkpoints, reports, users } from "./schema";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";


// ----------------
// DB CONNECTION
// ----------------
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);


// --------------------
// UTILITIES
// --------------------



/**
 * Run with:
 * npx tsx drizzle/seed.ts
 */
async function seed() {
  console.log("🌱 Seeding database...");

  /* =========================
     1. USERS
     ========================= */

  // const adminUserId = randomUUID();
  // const guardUserId = randomUUID();
  // const adminUserId1 = randomUUID();
  // const guardUserId1 = randomUUID();
  // const security1 = randomUUID();
  // const security2 = randomUUID();
  // const security3 = randomUUID();
  // const security4 = randomUUID();
  // const security5 = randomUUID();
  // const security6 = randomUUID();
  // const security7 = randomUUID();



  // await db.insert(users).values([
  //   {
  //     id: adminUserId,
  //     email: "admin@security.com",
  //     password: "hashed_password_admin", // 🔐 hash in real app
  //     name: "Admin User",
  //   },
  //   {
  //     id: guardUserId,
  //     email: "guard1@security.com",
  //     password: "hashed_password_guard",
  //     name: "Guard One",
  //   },
  // ]);

  // const adminHashedPassword = await hash("admin123", 12);
  // const guardHashedPassword = await hash("guard123", 12);
  // const securityHashedPassword1 = await hash("security1",12);
  // const securityHashedPassword2 = await hash("security2",12);
  // const securityHashedPassword3 = await hash("security3",12);
  // const securityHashedPassword4 = await hash("security4",12);
  // const securityHashedPassword5 = await hash("security5",12);
  // const securityHashedPassword6 = await hash("security6",12);
  // const securityHashedPassword7 = await hash("security7",12);
  
  const satpamIds = Array.from({ length: 7 }, () => randomUUID());

  const usersData = await Promise.all(
  satpamIds.map(async (id, i) => ({
    id,
    email: `satpam${i + 1}@gmail.com`,
    password: await hash(`satpam${i + 1}`, 12), // ✅ now safe
    name: `Satpam ${i + 1}`,
  }))
);

  // Insert users
  for (const u of usersData) {
    const exists = await db.select({ id: users.id }).from(users).where(eq(users.email, u.email)).limit(1);
    if (!exists.length) {
      await db.insert(users).values(u);
    }
  }

  // Insert guards using the **same IDs** as users
  const guardsData = usersData.map(u => ({
    id: u.id, // FK → users.id
    fullName: u.name!,
    nip: `SATPAM-${(u.name!.split(" ")[1] as string).padStart(3, "0")}`,
    phone: "081234567890",
  }));

  for (const g of guardsData) {
    const exists = await db.select({ id: guards.id }).from(guards).where(eq(guards.id, g.id)).limit(1);
    if (!exists.length) {
      await db.insert(guards).values(g);
    }
  }


  /* =========================
     3. CHECKPOINTS (7 points)
     ========================= */

  // const checkpointData = Array.from({ length: 7 }).map((_, i) => ({
  //   id: randomUUID(),
  //   checkpointNumber: i + 1,
  //   description: `Checkpoint ${i + 1} area`,
  // }));

  // await db.insert(checkpoints).values(checkpointData);

  // console.log("✅ Checkpoints seeded");

  /* =========================
     4. REPORTS (per hour / per checkpoint)
     ========================= */

  // const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // const reportRows = checkpointData.map((checkpoint, index) => ({
  //   id: randomUUID(),
  //   guardId: guardUserId,
  //   checkpointId: checkpoint.id,
  //   reportDate: new Date(),
  //   shift: "NIGHT",
  //   imageUrl: `https://example.com/images/report-${index + 1}.jpg`,
  //   imagaeTakenAt: new Date(),
  // }));

  // await db.insert(reports).values(reportRows);

  // console.log("✅ Reports seeded");

  console.log("🌱 Seeding completed successfully");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
