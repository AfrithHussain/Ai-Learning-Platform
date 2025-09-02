import { db } from '@/config/db';
import { courseList } from '@/config/schema';

import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { ai } from '@/lib/ai';

const PROMPT = `Generate Learning Course depends on following details. in which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format Chapter Name, Topic under each chapters , Duration for each chapters etc, in JSON format only
Schema: {
"course": {
"name": "string",
"description": "string",
"category": "string",
"level": "string",
"includeVideo": "boolean",
"noOfChapters": "number",
"bannerImagePrompt": "string",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
]
}
]
}
}
`;

// 🔁 Retry wrapper for Gemini API calls
async function withRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0 && err?.status === 503) {
      console.warn(`Gemini overloaded, retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      return withRetry(fn, retries - 1, delay * 2); // exponential backoff
    }
    throw err;
  }
}

export async function POST(req) {
  try {
    const user = await currentUser();
    const { has } = await auth();

    const hasBronzePlan = has({ plan: 'starter' });

    // 🚨 Limit course creation for free plan
    if (!hasBronzePlan) {
      const result = await db
        .select()
        .from(courseList)
        .where(eq(courseList.email, user?.primaryEmailAddress?.emailAddress));

      if (result.length >= 3) {
        return NextResponse.json({ error: 'Course limit reached' }, { status: 403 });
      }
    }

    const { courseId, ...formInput } = await req.json();
    console.log("Received courseId from client:", courseId);

    // Gemini API setup
    const tools = [{ googleSearch: {} }];
    const config = { thinkingConfig: { thinkingBudget: -1 }, tools };
    const model = 'gemini-2.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [{ text: PROMPT + JSON.stringify(formInput) }],
      },
    ];

    // ✅ Call Gemini API with retry logic
    let response;
    try {
      response = await withRetry(() =>
        ai.models.generateContent({ model, config, contents })
      );
    } catch (err) {
      console.error("Gemini API failed:", err);
      return NextResponse.json(
        { error: "AI service is busy. Please try again later." },
        { status: 503 }
      );
    }

    // ✅ Parse AI JSON safely
    let rawJsonResponse;
    try {
      const rawResponse = response.candidates[0].content.parts[0].text;
      const rawJson = rawResponse.replace(/```json|```/g, '');
      rawJsonResponse = JSON.parse(rawJson);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err);
      return NextResponse.json(
        { error: "Invalid AI response format." },
        { status: 500 }
      );
    }

    // ✅ Generate Banner Image
    const imageGeneratingPrompt = await imageGenarator(
      rawJsonResponse?.course?.bannerImagePrompt
    );

    // ✅ Store course in DB
    await db.insert(courseList).values({
      ...formInput,
      courseJson: rawJsonResponse,
      email: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      imagePrompt: imageGeneratingPrompt,
    });

    return NextResponse.json({ courseId });
  } catch (err) {
    console.error("Unexpected error in create-course-layout:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 🔧 Image generator with error handling
const imageGenarator = async (imagePrompt) => {
  try {
    const BASE_URL = 'https://aigurulab.tech';
    const result = await axios.post(
      BASE_URL + '/api/generate-image',
      {
        width: 1024,
        height: 1024,
        input: imagePrompt,
        model: 'sdxl',
        aspectRatio: "16:9",
      },
      {
        headers: {
          'x-api-key': process.env.GURULAB_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return result.data.image;
  } catch (err) {
    console.error("Image generation failed:", err);
    return null; // fallback if image API fails
  }
};
