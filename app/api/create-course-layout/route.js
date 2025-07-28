import { db } from '@/config/db';
import { courseList } from '@/config/schema';
import {
  GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';


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
`
 
export async function POST(req) {
    const user =await currentUser()

    const {courseId,...formInput} = await req.json();
  
  console.log("Received courseId from client:", courseId);

    // To run this code you need to install the following dependencies:
// npm install @google/genai mime
    
   const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(formInput),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
   
  const rawResponse =  response.candidates[0].content.parts[0].text;
  const rawJson = rawResponse.replace('```json', '').replace('```','');
  const rawJsonResponse = JSON.parse(rawJson)


  const imageGeneratingPrompt = await imageGenarator(rawJsonResponse?.course?.bannerImagePrompt)
  

  let fileIndex = 0;

  // store to db

  const result =await db.insert(courseList).values({
    ...formInput,
    courseJson: rawJsonResponse,
    email: user?.primaryEmailAddress?.emailAddress,
    cid:courseId,
    imagePrompt:imageGeneratingPrompt
  })
    


  return NextResponse.json({courseId:courseId})
}



 const imageGenarator =  async (imagePrompt) => {
     const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'sdxl',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process.env.GURULAB_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })

  return result.data.image
 }
     
 