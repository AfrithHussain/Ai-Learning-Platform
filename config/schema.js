import { boolean, json, text } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscription: varchar(),
  clerkId: text('clerk_id').unique().notNull(),
});

export const courseList = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar().notNull().unique(),
  name:varchar().notNull(),
  description: varchar(),
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar().notNull(),
  category: varchar(),
  courseDataContent: json().default({}),
  courseJson : json(),
  email: varchar('email').references(()=> usersTable.email).notNull(),
  imagePrompt: varchar().default('')
})

export const enrollCourseTable = pgTable("enrollCourse", {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar('cid').references(()=>courseList.cid),
  email: varchar('email').references(()=> usersTable.email).notNull(),
  chaptersCompleted: json()
 
})


export const userBadgesTable = pgTable("user_badges", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id').notNull().references(()=>usersTable.clerkId),  // Should reference usersTable.id
  courseId: varchar().notNull().references(()=> courseList.cid), // Should reference courseList.cid
  badgeType: varchar().notNull(),
  awardedAt: timestamp().notNull().defaultNow(),
});
