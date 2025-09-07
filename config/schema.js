import { boolean, json, text } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

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
  userId: text('user_id').notNull().references(()=>usersTable.clerkId),
  courseId: varchar().notNull().references(()=> courseList.cid),
  badgeType: varchar().notNull(),
  awardedAt: timestamp().notNull().defaultNow(),
}, (table) => ({
  uniqueUserCourse: uniqueIndex('unique_user_course').on(table.userId, table.courseId),
}));

export const quizListTable = pgTable("quiz_list", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar().notNull(),             // Store Clerk user ID (string)
  courseId: varchar().notNull(),           // Store the associated course ID (string)
  courseName: varchar().notNull(),         // Name of the course
  quizTitle: varchar().notNull(),          // e.g., "Shadcn Master Class Quiz"
  questions: json().notNull(),             // Array of questions as JSON
  createdAt: timestamp().notNull().defaultNow(), // Record creation time
});