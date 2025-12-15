"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { reports, checkpoints } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createReport = async ({
  checkpointId,
  imageUrl,
  shift,
}: {
  checkpointId: string; // numeric string from UI
  imageUrl: string;
  shift?: "morning" | "afternoon" | "night";
}) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const checkpoint = await db
    .select({ id: checkpoints.id })
    .from(checkpoints)
    .where(eq(checkpoints.checkpointNumber, Number(checkpointId)))
    .limit(1);

  if (!checkpoint.length) {
    return { success: false, error: "Checkpoint not found" };
  }

  const hour = new Date().getHours();
  const autoShift =
    hour < 12 ? "morning" : hour < 18 ? "afternoon" : "night";

  const finalShift = shift ?? autoShift;

  try {
    await db.insert(reports).values({
      guardId: session.user.id,
      checkpointId: checkpoint[0].id, // ✅ UUID
      reportDate: new Date(),
      shift: finalShift,
      imageUrl,
      imagaeTakenAt: new Date(),
    });

    return { success: true };
  } catch (err: any) {
    if (err.code === "23505") {
      return {
        success: false,
        error: "Report already exists for this checkpoint",
      };
    }

    console.error("Create report error:", err);
    return { success: false, error: "Server error" };
  }
};
