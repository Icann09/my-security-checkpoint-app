"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { signIn } from "@/auth";
import { compare } from "bcryptjs"

export const signInWithCredentials = async (
  params: { email: string; password: string }
) => {
  const { email, password } = params

  // 🟢 Step 1: Check user
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (user.length === 0) {
    return { success: false, error: "Email does not exist" }
  }

  // 🟢 Step 2: Check password
  const isPasswordValid = await compare(password, user[0].password)
  if (!isPasswordValid) {
    return { success: false, error: "Wrong password" }
  }

  // 🟢 Step 3: Call NextAuth signIn()
  try {
    const result = await signIn("credentials", {
      id: user[0].id.toString(),
      email: user[0].email,
      name: user[0].name,
      redirect: false,
    })

    if (result?.error) {
      return { success: false, error: "Signin failed" }
    }

    return { success: true }
  } catch (err) {
    console.error("Signin error:", err)
    return { success: false, error: "Signin error" }
  }
}