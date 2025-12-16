"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { reports, checkpoints } from "@/database/schema";
import { eq } from "drizzle-orm";
import { getWITAMinutes, getWITADate } from "../utils";

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



  const minutes = getWITAMinutes();
  let autoShift: "PAGI" | "SORE" | "MALAM";

  if (minutes >= 7 * 60 + 30 && minutes < 15 * 60 + 30) {
    autoShift = "PAGI";      // 07:30 – 15:30
  } else if (minutes >= 15 * 60 + 30 && minutes < 22 * 60) {
    autoShift = "SORE";    // 15:30 – 22:00
  } else {
    autoShift = "MALAM";        // 22:00 – 07:30
  }

  const finalShift = shift ?? autoShift;

  try {
    await db.insert(reports).values({
      guardId: session.user.id,
      checkpointId: checkpoint[0].id, // ✅ UUID
      reportDate: getWITADate(),
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
