import { boolean, json } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscription: varchar()
});

export const courseList = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar().notNull(),
  name:varchar().notNull(),
  description: varchar(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar().notNull(),
  category: varchar(),
  courseJson : json(),
  email: varchar('userTable').references(()=> usersTable.email).notNull(),
  imagePrompt: varchar().default('')
})
