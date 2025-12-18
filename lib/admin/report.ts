"use server";

import { db } from "@/database/drizzle";

export async function getReports() {


  try {
  const data = await db.query.reports.findMany({
  with: {
    guard: {
      columns: {
        fullName: true,
      },
    },
    checkpoint: {
      columns: {
        description: true,
      },
    },
  },
  orderBy: (reports, { desc }) => [
    desc(reports.createdAt),
  ],
});

  return data;
} catch (error) {
  console.error("Failed to fetch reports:", error);
  throw new Error("Failed to fetch reports");
}
}
