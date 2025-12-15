// import { guards } from "@/database/schema";
// import { eq } from "drizzle-orm";
// import { db } from "@/database/drizzle";
// import { randomUUID } from "crypto";

// async function ensureGuardExists(user: {
//   id: string;
//   email?: string | null;
//   name?: string | null;
// }) {
//   const existing = await db
//     .select({ id: guards.id })
//     .from(guards)
//     .where(eq(guards.id, user.id))
//     .limit(1);

//   if (existing.length) return;

//   await db.insert(guards).values({
//     id: user.id,                 // OK (UUID)
//     fullName: user.name ?? "Guard",
//     nip: `AUTO-${user.id.slice(0, 8)}`, // must be UNIQUE if constrained
//     password: "AUTH_USER",        // placeholder (not used)
//     email: user.email ?? null,
//   });
// }
