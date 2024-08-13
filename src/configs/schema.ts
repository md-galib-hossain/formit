import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  uniqueIndex,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
});

export const subscriptionPeriods = pgTable("subscriptionPeriods", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerkId").notNull().unique(),
  email: varchar("email").notNull().unique(),
  name: varchar("name"),
  image: varchar("image"),
  planId: integer("planId")
    .references(() => plans.id)
    .default(1), // assuming '1' is the id for 'free' plan
  customerId: varchar("customerId").unique(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .unique(),
  planId: integer("planId").references(() => plans.id),
  periodId: integer("periodId").references(() => subscriptionPeriods.id),
  startDate: timestamp("startDate").defaultNow(),
  endDate: timestamp("endDate"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const jsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdDate: varchar("createdAt").notNull(),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  email: varchar("email"),

  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").default("anonymous"),
  createdDate: varchar("createdAt").notNull(),
  formRef: integer("formRef").references(() => jsonForms.id),
});
