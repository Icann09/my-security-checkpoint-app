import { pgTable, uuid, text, timestamp, date, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


// 1. Guards
export const guards = pgTable("guards", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  nip: text("nip").notNull().unique(),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


// 2. Checkpoints
export const checkpoints = pgTable("checkpoints", {
  id: uuid("id").defaultRandom().primaryKey(),
  checkpointNumber: integer("checkpoint_number").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


// 3. Reports (1 row = 1 checkpoint image)
export const reports = pgTable(
  "reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    guardId: uuid("guard_id")
      .references(() => guards.id, { onDelete: "cascade" })
      .notNull(),

    checkpointId: uuid("checkpoint_id")
      .references(() => checkpoints.id)
      .notNull(),

    reportDate: date("report_date").notNull(),
    shift: text("shift").notNull(), // morning / evening / night

    imageUrl: text("image_url").notNull(),
    takenAt: timestamp("taken_at", { withTimezone: true }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    uniqueCheckpointEntry: uniqueIndex(
      "reports_unique_checkpoint_entry"
    ).on(table.guardId, table.checkpointId, table.reportDate, table.shift),
  })
);


// ===============================
// Relations (MUST COME AFTER TABLES)
// ===============================

export const guardsRelations = relations(guards, ({ many }) => ({
  reports: many(reports),
}));

export const checkpointsRelations = relations(checkpoints, ({ many }) => ({
  reports: many(reports),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  guard: one(guards, {
    fields: [reports.guardId],
    references: [guards.id],
  }),

  checkpoint: one(checkpoints, {
    fields: [reports.checkpointId],
    references: [checkpoints.id],
  }),
}));
