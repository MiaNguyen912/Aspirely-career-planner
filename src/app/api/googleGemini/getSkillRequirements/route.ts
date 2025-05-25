import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Type } from "@google/genai";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Initialize the Google Generative AI client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(request: NextRequest) {
  try {
    // Get the prompt from the request body
    const { career } = await request.json();

    const prompt = `You are a career consultant. You are given a career path of \"${career}\", list out 3 skill requirements for the career. Each skill should have a unique id, name, and learning resources - which are urls to the resources to learn the skill.`;

    //    {
    //     id: "skill-python-se",
    //     type: "skillNode",
    //     position: { x: 550, y: 150 },
    //     data: {
    //       name: "Python Programming",
    //       careerId: "career-1",
    //       resources: ["https://www.python.org/doc/", "https://www.w3schools.com/python/", "https://realpython.com/"],
    //       isCompleted: false,
    //     },
    //   },
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,

      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              learningResources: { type: "array", items: { type: "string" } },
            },
            required: ["id", "name", "learningResources"],
          },
        },
      },
    });

    const json = JSON.parse(response.text || "{}");
    // console.log(json);

    // Store the response in the JSON file
    try {
      const filePath = path.join(process.cwd(), "src/data/aiResponses.json");

      // Create new data object with only the latest response
      const data = json;

      // Write the new content to the file, overwriting the previous content
      await fs.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
      console.error("Error storing response in file:", error);
      // Continue with the response even if file storage fails
    }

    return NextResponse.json({
      data: {
        response: json,
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
