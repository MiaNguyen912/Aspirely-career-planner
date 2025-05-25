import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


export async function POST(request: NextRequest) {
 try {
   // Get the prompt from the request body
   const { prompt } = await request.json();


   if (!prompt) {
     return NextResponse.json(
       {
         message: "Prompt is required",
         status: 400,
       },
       { status: 400 }
     );
   }


   // Generate content using Gemini
   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
   const result = await model.generateContent(prompt);
   const text = result.response.text();


   return NextResponse.json({
     data: {
       response: text,
     },
     message: "Successfully generated response",
     status: 200,
   });
 } catch (error) {
   console.error("Error generating content:", error);
   return NextResponse.json(
     {
       message: "Error generating content",
       error: error instanceof Error ? error.message : "Unknown error",
       status: 500,
     },
     { status: 500 }
   );
 }
}


