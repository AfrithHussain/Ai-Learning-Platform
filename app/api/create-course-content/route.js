import { NextResponse } from "next/server";
import { ai } from "../create-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { courseList } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `
You are an expert learning content generator.

Given a chapter object (with chapter name and topics), generate an HTML formatted explanation for each topic. Return the final response in **JSON** format as described below.

Ensure your entire response is ONLY a single, valid JSON object, with no extra text or markdown formatting like \`\`\`json before or after it.

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
    const cleaned = jsonStr
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/```json|```/g, '')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    return JSON.parse(cleaned.trim());
  } catch (err) {
    console.error("JSON parsing failed:", err.message);
    return null;
  }
}

const Youtube_URL = 'https://www.googleapis.com/youtube/v3/search';

const getYoutubeVideos = async (topic) => {
  try {
    const params = {
      part: 'snippet',
      maxResults: '5',
      q: `${topic} tutorial explanation`,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY
    };
    const resp = await axios.get(Youtube_URL, { params });
    const youtubeVideoRespList = resp.data.items || [];
    return youtubeVideoRespList.map(item => ({
      videoId: item?.id?.videoId,
      title: item?.snippet?.title
    }));
  } catch (error) {
    console.error(`Failed to fetch YouTube videos for topic: ${topic}`, error.response?.data || error.message);
    return []; 
  }
};


export async function POST(req) {
  try {
    const { courseTitle, courseId, courseJson } = await req.json();

    if (!courseJson?.chapters || !courseId) {
        return NextResponse.json({ error: "Missing required fields: courseJson.chapters or courseId" }, { status: 400 });
    }

    const promises = courseJson.chapters.map(async (chapter) => {
      // AI Call
      const contents = [{ role: "user", parts: [{ text: PROMPT + JSON.stringify(chapter) }] }];
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });
      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const parsedContent = safeParseJSON(rawText);

      // ✅ CORRECTED LOGIC IS HERE
      let chapterData; // Use 'let' to allow reassignment
      if (!parsedContent) {
        // This block ONLY prepares the fallback data. It does NOT return.
        console.error("==== Failed to parse Gemini response for chapter:", chapter.chapterName);
        chapterData = {
          chapterName: chapter.chapterName,
          topics: chapter.topics.map((t) => ({
            topic: t.topic, 
            content: "<p>Failed to generate content. Please try again later.</p>",
          })),
        };
      } else {
        // If successful, use the parsed content
        chapterData = parsedContent;
      }

      // Every path (success or failure) continues to this point
      const youtubeVideos = await getYoutubeVideos(chapter.chapterName);

      // The SINGLE return statement ensures a consistent object shape every time
      return {
          courseData: chapterData,
          youtubeVideo: youtubeVideos,
      };
    });

    const courseContent = await Promise.all(promises);
    
    await db.update(courseList)
      .set({ courseDataContent: JSON.stringify(courseContent) }) 
      .where(eq(courseList.cid, courseId));

    return NextResponse.json({
      message: "Course generated successfully!",
      chapterName: courseTitle,
      courseContent,
    }, { status: 200 });

  } catch (error) {
    console.error("🔥 A critical error occurred in create-course-content:", error);
    return NextResponse.json({ error: "An internal server error occurred.", details: error.message }, { status: 500 });
  }
}