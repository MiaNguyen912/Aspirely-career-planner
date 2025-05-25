import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

// Define the interface for occupation data based on the actual CSV structure
interface OccupationData {
  //Name,Code,Employment2023,Employment2033,EmploymentChangePercent,AnnualWage,Handbook

  Name: string;
  Code: string;
  Employment2023: number;
  Employment2033: number;
  EmploymentChangePercent: number;
  AnnualWage: number;
  Handbook: string;
}

// Helper function to parse CSV line with quoted values
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  // Push the last value
  result.push(current.trim());

  // Remove quotes from values
  return result.map((value) => value.replace(/^"|"$/g, ""));
}

// Helper function to parse CSV data
function parseCSV(csvData: string): OccupationData[] {
  const lines = csvData.split("\n").filter((line) => line.trim());
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const data: any = {};

    headers.forEach((header, index) => {
      const value = values[index];

      // Map CSV headers to interface properties
      switch (header) {
        case "Name":
          data.Name = value;
          break;
        case "Code":
          data.Code = value;
          break;
        case "Employment2023":
          // Convert from thousands to actual number
          data.Employment2023 = parseFloat(value) * 1000;
          break;
        case "Employment2033":
          // Convert from thousands to actual number
          data.Employment2033 = parseFloat(value) * 1000;
          break;
        case "EmploymentChangePercent":
          data.EmploymentChangePercent = parseFloat(value);
          break;
        case "AnnualWage":
          // Remove commas and convert to number
          data.AnnualWage = parseInt(value.replace(/,/g, "")) || 0;
          break;
        case "Handbook":
          data.Handbook = value;
          break;
      }
    });

    return data as OccupationData;
  });
}

// Helper function to read and parse CSV data
async function readOccupationData(): Promise<OccupationData[]> {
  const filePath = path.join(process.cwd(), "src", "data", "occupationsTable.csv");

  if (!fs.existsSync(filePath)) {
    console.error("File not found at:", filePath);
    throw new Error("Occupations data file not found");
  }

  const csvData = fs.readFileSync(filePath, "utf-8");
  return parseCSV(csvData);
}

// GET /api/careerInformation - Get all careers
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");

    // If name parameter is provided, use getCareerByName logic
    if (name) {
      return getCareerByName(name);
    }

    // Otherwise, return all careers
    const data = await readOccupationData();

    const processedData = data.map((occupation) => ({
      name: occupation.Name,
      code: occupation.Code,
      data: {
        currentEmployment: occupation.Employment2023,
        projectedEmployment: occupation.Employment2033,
        employmentChange: occupation.EmploymentChangePercent,
        annualWage: occupation.AnnualWage,
        handbook: occupation.Handbook,
      },
    }));

    return NextResponse.json({
      data: processedData,
      message: "All careers retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      {
        message: "Error retrieving careers",
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// Helper function to get career by name
async function getCareerByName(name: string) {
  try {
    const data = await readOccupationData();

    const occupationData = data.find((occ) => occ.Code.toLowerCase() === name.toLowerCase() || occ.Name.toLowerCase() === name.toLowerCase());

    if (!occupationData) {
      return NextResponse.json(
        {
          message: `Career not found: ${name}`,
          availableCareers: data.map((occ) => ({
            name: occ.Name,
            code: occ.Code,
          })),
          status: 404,
        },
        { status: 404 }
      );
    }

    const processedData = {
      name: occupationData.Name,
      code: occupationData.Code,
      data: {
        currentEmployment: occupationData.Employment2023,
        projectedEmployment: occupationData.Employment2033,
        employmentChange: occupationData.EmploymentChangePercent,
        annualWage: occupationData.AnnualWage,
        handbook: occupationData.Handbook,
      },
    };

    return NextResponse.json({
      data: processedData,
      message: "Career information retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching career information:", error);
    return NextResponse.json(
      {
        message: "Error retrieving career information",
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      },
      { status: 500 }
    );
  }
}
