import { db } from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { userBadgesTable } from "@/config/schema";
import { eq } from "drizzle-orm"; // For where clauses

export async function POST(req) {
  const { userId } = await auth();
  const { courseId } = await req.json();

  if (!userId || !courseId) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing data" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Check if badge already exists
  const existing = await db
    .select()
    .from(userBadgesTable)
    .where(eq(userBadgesTable.userId, userId), eq(userBadgesTable.courseId, courseId));

  if (existing.length === 0) {
    await db.insert(userBadgesTable).values({
      userId,
      courseId,
      badgeType: "Course Completion",
      awardedAt: new Date(),
    });
  }

  // Count total badges
  const badgeCount = await db
    .select()
    .from(userBadgesTable)
    .where(eq(userBadgesTable.userId, userId));

  return new Response(
    JSON.stringify({ success: true, badgeCount: badgeCount.length }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const badges = await db.select().from(userBadgesTable).where(eq(userBadgesTable.userId, userId));

  return new Response(
    JSON.stringify({ success: true, badgeCount: badges.length, badges }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
