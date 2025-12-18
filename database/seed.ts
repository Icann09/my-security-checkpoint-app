import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { guards, checkpoints, reports, users } from "./schema";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { email } from "zod";


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

  
  const securityHashedPassword1 = await hash("8210102029",12);
  const adminHashedPassword1 = await hash("pltdraha",12);

  // const securityHashedPassword2 = await hash("8210102030",12);
  // const securityHashedPassword3 = await hash("8210102031",12);
  // const securityHashedPassword4 = await hash("8210102032",12);
  // const securityHashedPassword5 = await hash("8210102033",12);

  const adminId = randomUUID();
  // const satpamIds = Array.from({ length: 5 }, () => randomUUID());
  const admin = {
    id: adminId,
    email: "adminpltd@gmail.com",
    password: adminHashedPassword1,
    name: "PLTD RAHA",
  };

  await db.insert(users).values(admin);

  // const satpams = [
  //   {
  //     id: satpamIds[0],
  //     email: "lakeke1@gmail.com",
  //     password: securityHashedPassword1,
  //     name: "LA KEKE",
  //   },
  //   {
  //     id: satpamIds[1],
  //     email: "laodemuhalfin@gmail.com",
  //     password: securityHashedPassword2,
  //     name: "LAODE MUH ALFIN",
  //   },
  //   {
  //     id: satpamIds[2],
  //     email: "lapili@gmail.com",
  //     password: securityHashedPassword3,
  //     name: "LA PILI",
  //   },
  //   {
  //     id: satpamIds[3],
  //     email: "herman@gmail.com",
  //     password: securityHashedPassword4,
  //     name: "HERMAN",
  //   },
  //   {
  //     id: satpamIds[4],
  //     email: "anas@gmail.com",
  //     password: securityHashedPassword5,
  //     name: "ANAS",
  //   },
  // ];


  // const guardsData = satpams.map((u, i) => ({
  //   id: u.id,
  //   fullName: u.name!,
  //   nip: `SECURITY-${String(i + 1).padStart(3, "0")}`,
  //   phone: "081234567899",
  // }));



  // await db.insert(guards).values(guardsData).onConflictDoNothing();


  console.log("🌱 Seeding completed successfully");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
