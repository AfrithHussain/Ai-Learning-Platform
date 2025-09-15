import { db } from "@/config/db";
import { courseList, enrollCourseTable } from "@/config/schema";
import { currentUser, auth } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

 
 
 
 
export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();
  const { has } = await auth();
  const hasBronzePlan = has({ plan: 'starter' });

  // Check if already enrolled
  const enrolledCourse = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress)
      )
    );

  if (enrolledCourse.length > 0) {
    return NextResponse.json({ res: 'response already submitted' });
  }

  // Check total number of enrolled courses
  const totalEnrolled = await db
    .select()
    .from(enrollCourseTable)
    .where(eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress));

  if (totalEnrolled.length >= 3 && !hasBronzePlan) {
    return NextResponse.json({ resp: 'Course Limit Reached' });
  }

  // Enroll the course
  const result = await db
    .insert(enrollCourseTable)
    .values({
      cid: courseId,
      email: user?.primaryEmailAddress.emailAddress,
    })
    .returning(enrollCourseTable);

  return NextResponse.json(result);
};



export async function GET(req){
    const user =await currentUser();
     const {searchParams} = new URL(req.url);
    

    const courseId = searchParams.get('courseId');
  if(courseId){
      const result = await db.select().from(courseList).innerJoin(enrollCourseTable,eq(courseList.cid, enrollCourseTable.cid))
    .where(and(eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress),eq(enrollCourseTable.cid,courseId)))
    .orderBy(desc(enrollCourseTable.cid));

    return NextResponse.json(result[0])
  }
  else{
     const result = await db.select().from(courseList).innerJoin(enrollCourseTable,eq(courseList.cid, enrollCourseTable.cid))
    .where(eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(enrollCourseTable.cid));

    return NextResponse.json(result)
  }
    
}

export async function PUT(req) {
  const user = await currentUser();
  const { chaptersCompleted, courseId } = await req.json();

  const markDb = await db
    .update(enrollCourseTable)
    .set({ chaptersCompleted }) // ✅ directly store JSON object
    .where(
      and(
        eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress)
      )
    )
    .returning(enrollCourseTable);

  return NextResponse.json(markDb);
}
