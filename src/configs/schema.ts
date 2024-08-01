import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

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
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").default("anonymouse"),
  createdDate: varchar("createdAt").notNull(),
  formRef: integer("formRef").references(() => jsonForms.id),
});
