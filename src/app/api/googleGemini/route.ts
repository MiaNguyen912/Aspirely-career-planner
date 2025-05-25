import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    // Get the prompt from the request body
    const { prompt } = await request.json();
    // console.log(prompt);

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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Store the response in the JSON file
    try {
      const filePath = path.join(process.cwd(), "src/data/aiResponses.json");

      // Create new data object with only the latest response
      const data = {
        responses: [
          {
            text,
          },
        ],
      };

      // Write the new content to the file, overwriting the previous content
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error storing response in file:", error);
      // Continue with the response even if file storage fails
    }

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
