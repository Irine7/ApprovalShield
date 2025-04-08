import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Approval risk levels
export const RiskLevelEnum = z.enum(["high", "medium", "low", "none"]);
export type RiskLevel = z.infer<typeof RiskLevelEnum>;

// Approval types
export const ApprovalTypeEnum = z.enum(["wallet", "transaction", "token"]);
export type ApprovalType = z.infer<typeof ApprovalTypeEnum>;

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Approvals schema
export const approvals = pgTable("approvals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  provider: text("provider").notNull(),
  description: text("description").notNull(),
  codeSnippet: text("code_snippet").notNull(),
  riskLevel: text("risk_level").notNull(),
  type: text("type").notNull(),
  detectedAt: timestamp("detected_at").notNull().defaultNow(),
  details: text("details"),
});

// Define relations
export const approvalsRelations = relations(approvals, ({ one }) => ({
  // No relations needed right now, but can be added here in the future
}));

export const usersRelations = relations(users, ({ many }) => ({
  approvals: many(approvals),
}));

export const insertApprovalSchema = createInsertSchema(approvals).omit({
  id: true,
  detectedAt: true,
}).extend({
  riskLevel: RiskLevelEnum,
  type: ApprovalTypeEnum,
});

export type InsertApproval = z.infer<typeof insertApprovalSchema>;
export type Approval = typeof approvals.$inferSelect;

// Scan history schema
export const scanHistory = pgTable("scan_history", {
  id: serial("id").primaryKey(),
  scanDate: timestamp("scan_date").notNull().defaultNow(),
  totalApprovals: integer("total_approvals").notNull(),
  riskyApprovals: integer("risky_approvals").notNull(),
  riskScore: integer("risk_score").notNull(),
});

export const scanHistoryRelations = relations(scanHistory, ({ many }) => ({
  // No relations needed right now, but can be added here in the future
}));

export const insertScanHistorySchema = createInsertSchema(scanHistory).omit({
  id: true,
  scanDate: true,
});

export type InsertScanHistory = z.infer<typeof insertScanHistorySchema>;
export type ScanHistory = typeof scanHistory.$inferSelect;
