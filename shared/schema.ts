import { pgTable, text, serial, integer, boolean, timestamp, json, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
  role: true,
});

// Organizations table
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  mission: text("mission"),
  sector: text("sector").notNull(),
  region: text("region").notNull(),
  established: integer("established"),
  verified: boolean("verified").default(false),
  verificationType: text("verification_type").default("self-reported"),
  claimedBy: integer("claimed_by").references(() => users.id),
  impactScore: integer("impact_score"),
  impactGrade: text("impact_grade"),
  yearlyChange: real("yearly_change"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertOrganizationSchema = createInsertSchema(organizations).pick({
  name: true,
  logo: true,
  mission: true,
  sector: true,
  region: true,
  established: true,
  verified: true,
  verificationType: true,
  claimedBy: true,
  impactScore: true,
  impactGrade: true,
  yearlyChange: true,
});

// Programs table
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  organizationId: integer("organization_id").references(() => organizations.id).notNull(),
  sector: text("sector").notNull(),
  region: text("region"),
  peopleReached: integer("people_reached"),
  socialROI: real("social_roi"),
  impactScore: integer("impact_score"),
  impactGrade: text("impact_grade"),
  sdgAlignment: text("sdg_alignment").array(),
  demographics: text("demographics").array(),
  yearlyChange: real("yearly_change"),
  effectiveness: integer("effectiveness"),
  verified: boolean("verified").default(false),
  verificationType: text("verification_type").default("self-reported"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProgramSchema = createInsertSchema(programs).pick({
  name: true,
  description: true,
  organizationId: true,
  sector: true,
  region: true,
  peopleReached: true,
  socialROI: true,
  impactScore: true,
  impactGrade: true,
  sdgAlignment: true,
  demographics: true,
  yearlyChange: true,
  effectiveness: true,
  verified: true,
  verificationType: true,
});

// Metrics table for Impact IQ Breakdown
export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").references(() => organizations.id).notNull(),
  reportingQuality: integer("reporting_quality").notNull(),
  reach: integer("reach").notNull(),
  socialROI: integer("social_roi").notNull(),
  outcomeEffectiveness: integer("outcome_effectiveness").notNull(),
  transparencyGovernance: integer("transparency_governance").notNull(),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMetricSchema = createInsertSchema(metrics).pick({
  organizationId: true,
  reportingQuality: true,
  reach: true,
  socialROI: true,
  outcomeEffectiveness: true,
  transparencyGovernance: true,
  year: true,
});

// Reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organizationId: integer("organization_id").references(() => organizations.id).notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(),
  year: integer("year").notNull(),
  verified: boolean("verified").default(false),
  verifiedBy: integer("verified_by").references(() => users.id),
  extracted: boolean("extracted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReportSchema = createInsertSchema(reports).pick({
  title: true,
  organizationId: true,
  fileUrl: true,
  fileType: true,
  year: true,
  verified: true,
  verifiedBy: true,
  extracted: true,
});

// Statistics table
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  organizationCount: integer("organization_count").default(0),
  programCount: integer("program_count").default(0),
  impactValue: real("impact_value").default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertStatisticsSchema = createInsertSchema(statistics).pick({
  organizationCount: true,
  programCount: true,
  impactValue: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Metric = typeof metrics.$inferSelect;
export type InsertMetric = z.infer<typeof insertMetricSchema>;

export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;

export type Statistic = typeof statistics.$inferSelect;
export type InsertStatistic = z.infer<typeof insertStatisticsSchema>;
