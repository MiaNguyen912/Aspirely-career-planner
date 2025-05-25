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
    const { resume } = await request.json();

    // Generate content using Gemini
    // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // const result = await model.generateContent(prompt);
    // const text = result.response.text();

    // const prompt = `given the resume text:\"${resume}\". As an AI assistant for a resume parser application, your role is to intelligently analyze any uploaded resume, regardless of its unique format and structure. You need to collect meaningful keywords, then match and narrow down potential future career pathways or job/internship opportunities from the given CSV named occupationsTable.csv. Keywords are collected from analyzing each resume section such as education (major, degree), work/ project experience (role, project description), leadership experience, soft/hard skills. You should recognize and keep track of existing skills with a boolean variable isComplete (check / cross) and provide a list of qualities they should have, along with web pages resources. You should ignore filling in information for rootNode, only output information about future career and skill sets. The id name must be meaningful to reflect specific career or skills. For the Edge output to connect each node, the source represents its respective career node and its target represents the skill node. The structure output should be exported in json format and must follow the given format example below for Node and Edge. export const initialNodes: CustomNode[] = [ { id: "root", type: "rootNode", position: { x: 50, y: 300 }, data: { fileInfo: null, majorInfo: null, }, }, { id: "Software-Engineer", type: "careerNode", position: { x: 500, y: 200 }, data: { name: "Software Engineer", averageSalary: 120000, demandIn5Years: 25, percentageMen: 75, percentageWomen: 25, }, }, { id: "Data-Scientist", type: "careerNode", position: { x: 300, y: 400 }, data: { name: "Data Scientist", averageSalary: 130000, demandIn5Years: 35, percentageMen: 65, percentageWomen: 35, }, }, { id: "skill-python-se", type: "skillNode", position: { x: 550, y: 150 }, data: { name: "Python Programming", careerId: "career-1", resources: ["https://www.python.org/doc/", "https://www.w3schools.com/python/", "https://realpython.com/"], isCompleted: false, }, }, { id: "skill-python-ds", type: "skillNode", position: { x: 550, y: 350 }, data: { name: "Python Programming", careerId: "career-2", resources: ["https://www.python.org/doc/", "https://www.kaggle.com/learn/python", "https://www.datacamp.com/courses/intro-to-python-for-data-science"], isCompleted: false, }, }, { id: "skill-ml-se", type: "skillNode", position: { x: 550, y: 250 }, data: { name: "Machine Learning", careerId: "career-1", resources: ["https://www.coursera.org/learn/machine-learning", "https://www.fast.ai/"], isCompleted: false, }, }, { id: "skill-ml-ds", type: "skillNode", position: { x: 550, y: 450 }, data: { name: "Machine Learning", careerId: "career-2", resources: ["https://www.coursera.org/learn/machine-learning", "https://www.kaggle.com/learn/intro-to-machine-learning", "https://www.deeplearning.ai/"], isCompleted: false, }, }, { id: "skill-web", type: "skillNode", position: { x: 800, y: 200 }, data: { name: "Web Development", careerId: "career-1", resources: ["https://developer.mozilla.org/", "https://www.w3schools.com/", "https://www.freecodecamp.org/"], isCompleted: false, }, }, { id: "skill-data", type: "skillNode", position: { x: 800, y: 400 }, data: { name: "Data Analysis", careerId: "career-2", resources: ["https://www.kaggle.com/learn/data-analysis", "https://www.datacamp.com/courses/data-analysis-with-python", "https://www.coursera.org/learn/data-analysis-with-python"], isCompleted: false, }, }, ]; export const initialEdges: Edge[] = [ { id: "root-career-1", source: "root", target: "career-1", type: "smoothstep", animated: true, style: { stroke: "#10b981", strokeWidth: 2 }, }, { id: "root-career-2", source: "root", target: "career-2", type: "smoothstep", animated: true, style: { stroke: "#10b981", strokeWidth: 2 }, }, { id: "career-1-skill-python-se", source: "career-1", target: "skill-python-se", type: "smoothstep", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 }, }, { id: "career-1-skill-ml-se", source: "career-1", target: "skill-ml-se", type: "smoothstep", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 }, }, { id: "career-1-skill-web", source: "career-1", target: "skill-web", type: "smoothstep", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 }, }, { id: "career-2-skill-python-ds", source: "career-2", target: "skill-python-ds", type: "smoothstep", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 }, }, { id: "career-2-skill-ml-ds", source: "career-2", target: "skill-ml-ds", type: "smoothstep", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 }, }, { id: "career-2-skill-data", source: "career-2", target: "skill-data", type: "smoothstep", animated: true, style: { stroke: "#f59e0b", strokeWidth: 2 }, }, ]; `;
    const prompt = `given the resume text:\"${resume}\". can you analyze it`;
    // {
    //   id: "career-1-skill-python-se",
    //   source: "career-1",
    //   target: "skill-python-se",
    //   type: "smoothstep",
    //   animated: true,
    //   style: { stroke: "#f59e0b", strokeWidth: 2 },
    // },

    // {
    //   id: "career-2",
    //   type: "careerNode",
    //   position: { x: 300, y: 400 },
    //   data: {
    //     name: "Data Scientist",
    //     averageSalary: 130000,
    //     demandIn5Years: 35,
    //     percentageMen: 65,
    //     percentageWomen: 35,
    //   },
    // },

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            nodes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { type: "string" },
                  position: {
                    type: "object",
                    properties: {
                      x: { type: "number" },
                      y: { type: "number" },
                    },
                    required: ["x", "y"],
                  },
                  data: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      averageSalary: { type: "number" },
                      demandIn5Years: { type: "number" },
                      percentageMen: { type: "number" },
                      percentageWomen: { type: "number" },
                    },
                    required: ["name"],
                  },
                },
                required: ["id", "type", "position", "data"],
              },
            },
            edges: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  source: { type: "string" },
                  target: { type: "string" },
                  type: { type: "string" },
                  animated: { type: "boolean" },
                },
                required: ["id", "source", "target"],
              },
            },
          },
          required: ["nodes", "edges"],
        },
      },
    });

    const json = JSON.parse(response.text || "{}");
    console.log(json);

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
