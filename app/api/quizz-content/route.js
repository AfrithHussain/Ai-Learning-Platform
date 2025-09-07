import { db } from "@/config/db";
import { quizListTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";
import { eq } from "drizzle-orm";

const PROMPT = `You are an expert quiz generator specializing in creating educational multiple-choice quizzes. Based on the following list of chapter names from a course, generate exactly 2 multiple-choice questions per chapter. Each question must have 4 answer options and exactly one correct answer. Ensure the questions are relevant to the chapter topic and help the learner recall important concepts.

Course Name: {{courseName}}
Chapters:
{{chapterList}}

Format the output strictly as JSON with the following structure: {
  "quizTitle": "{{courseName}} Quiz",
  "questions": [
    {
      "chapter": "Chapter Name",
      "question": "A relevant multiple-choice question",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswerIndex": 0
    }
  ]
}`;

async function withRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0 && err?.status === 503) {
      console.warn(`Gemini overloaded, retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw err;
  }
}

export async function POST(req) {
  try {
    const user = await currentUser();
    const { courseId, courseName, quizzChapterName } = await req.json();

    const has = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chapterListString = JSON.stringify(quizzChapterName);

    const tools = [{ googleSearch: {} }];
    const config = { thinkingConfig: { thinkingBudget: -1 }, tools };
    const model = "gemini-2.5-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT.replace("{{courseName}}", courseName).replace(
              "{{chapterList}}",
              chapterListString
            ),
          },
        ],
      },
    ];

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

    let quizJson;
    try {
      const rawResponse = response.candidates[0].content.parts[0].text;
      const cleanJson = rawResponse.replace(/```json|```/g, '');
      quizJson = JSON.parse(cleanJson);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err);
      return NextResponse.json(
        { error: "Invalid AI response format." },
        { status: 500 }
      );
    }

   const insertedQuiz = await db
  .insert(quizListTable)
  .values({
    userId: user.id,
    courseId: courseId,
    courseName,
    quizTitle: `${courseName} Quiz`,
    questions: JSON.stringify(quizJson.questions),
    createdAt: new Date(),
  })
  .returning({ id: quizListTable.id });  // <-- Capture the generated quiz ID

return NextResponse.json({
  message: "Quiz generated successfully",
  quizData: quizJson,
  quizId: insertedQuiz[0].id,           // Return generated quiz ID
});

  } catch (err) {
    console.error("Unexpected error in quiz-generation API:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    const user = await currentUser();
    await auth();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');  // ✅ Read query param

    if (!courseId) {
      return NextResponse.json(
        { error: "Missing courseId query parameter" },
        { status: 400 }
      );
    }

    const quizzes = await db
      .select()
      .from(quizListTable)
      .where(
        eq(quizListTable.userId, user.id),
        eq(quizListTable.courseId, courseId)  // ✅ Filter by courseId
      );

    return NextResponse.json({ quizzes });
  }catch (err) {
    console.error("Error fetching quizzes:", err);
    return NextResponse.json({ error: "Failed to fetch quizzes" }, { status: 500 });
  }
}
