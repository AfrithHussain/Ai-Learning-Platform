// in your /api/user/route.js file

import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    // Destructure all three fields from the request
    const { name, email, clerkId } = await req.json();

    // Check if the clerkId is provided
    if (!clerkId) {
        return NextResponse.json({ error: "clerkId is required" }, { status: 400 });
    }

    // --- Check for the user using the more reliable clerkId ---
    const users = await db.select().from(usersTable).where(eq(usersTable.clerkId, clerkId));

    // If the user does not exist in our DB, create them
    if (users.length === 0) {
        const newUser = await db.insert(usersTable).values({
            name: name,
            email: email,
            clerkId: clerkId // <-- Save the clerkId
        }).returning(); // .returning() gives you back the inserted row(s)
        
        // Return the newly created user object
        return NextResponse.json(newUser[0]);
    }

    // If the user already exists, return their data
    return NextResponse.json(users[0]);
}