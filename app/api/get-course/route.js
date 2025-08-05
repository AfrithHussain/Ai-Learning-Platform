import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const user =await currentUser()

    const courseId = searchParams.get('courseId');

    if(courseId){
        const result = await db.select().from(courseList).where(eq(courseList.cid,courseId))

    return NextResponse.json(result[0])
    }
    else{
        const result = await db.select().from(courseList).where(eq(courseList.email,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(courseList.id))

    return NextResponse.json(result)
    }

   
}