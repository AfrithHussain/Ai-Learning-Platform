import { NextResponse } from "next/server";
import { ai } from "../create-course-layout/route";

const PROMPT = `
You are an expert learning content generator.

Given a chapter object (with chapter name and topics), generate an HTML formatted explanation for each topic. Return the final response in **JSON** format as described below:

Schema:
{
  "chapterName": "<chapter name>",
  "topics": [
    {
      "topic": "<topic name>",
      "content": "<HTML formatted explanation for the topic>"
    }
  ]
}

Return ONLY the JSON. Here is the input:
`;

function safeParseJSON(jsonStr) {
  try {
    // Replace smart quotes and clean unwanted code blocks
    const cleaned = jsonStr
      .replace(/[“”]/g, '"') // smart quotes to normal quotes
      .replace(/[‘’]/g, "'")
      .replace(/```json|```/g, '') // strip code fences
      .replace(/,\s*}/g, '}') // trailing commas in objects
      .replace(/,\s*]/g, ']'); // trailing commas in arrays
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parsing failed:", err.message);
    return null;
  }
}

export async function POST(req) {
  const { courseTitle, courseId, courseJson } = await req.json();

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const promises = courseJson?.chapters.map(async (chapter) => {
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: PROMPT + JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const parsed = safeParseJSON(rawText);

  if (!parsed) {
    console.error("==== Failed to parse Gemini response ====");
    console.log("Chapter:", chapter.chapterName);
    console.log("Raw Gemini response:", rawText);
    return {
      chapterName: chapter.chapterName,
      topics: chapter.topics.map((t) => ({
        topic: t,
        content: "<p>Failed to generate content. Please try again later.</p>",
      })),
    };
  }

  return parsed;
});


  const courseContent = await Promise.all(promises);

  return NextResponse.json({
    courseName: courseTitle,
    courseContent,
  });
}
