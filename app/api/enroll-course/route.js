import { db } from "@/config/db";
import { courseList, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

 
 
 
 
 export async function POST(req) {   
    const {courseId} = await  req.json()
    const user =await currentUser();

    // if the user is already enrolled

    const enrolledCourse =await db.select().from(enrollCourseTable).where(and(eq(enrollCourseTable.cid, courseId), eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress)))
     

    // if the user is not enrolled , then enroll

    if(enrolledCourse.length === 0){
        const result = await db.insert(enrollCourseTable).values({
            cid:courseId,
            email:user?.primaryEmailAddress.emailAddress
        }).returning(enrollCourseTable)

        return NextResponse.json(result)
    }
    return NextResponse.json({'res': 'response already submitted'})
  }


export async function GET(req){
    const user =await currentUser();

    const result = await db.select().from(courseList).innerJoin(enrollCourseTable,eq(courseList.cid, enrollCourseTable.cid))
    .where(eq(enrollCourseTable.email, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(enrollCourseTable.cid));

    return NextResponse.json(result)
}