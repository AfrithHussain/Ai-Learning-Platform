import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { name, email, clerkId } = await req.json();

    if (!clerkId) {
        return NextResponse.json({ error: "clerkId is required" }, { status: 400 });
    }

    // Check if user already exists by email
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (users.length === 0) {
        const newUser = await db.insert(usersTable).values({
            name,
            email,
            clerkId
        }).returning();
        
        return NextResponse.json(newUser[0]);
    }

    // If user already exists, return the existing user
    return NextResponse.json(users[0]);
};

// Optional GET for debugging
export async function GET(req) {
    return NextResponse.json({ message: "API is alive" });
};
