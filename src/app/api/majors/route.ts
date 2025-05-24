import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("https://anteaterapi.com/v2/rest/programs/majors");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Process majors: filter for undergraduate majors and clean up names
    const processedMajors = data.data
      .filter((major: any) => major.name.startsWith("Major in ") && major.division === "Undergraduate")
      .map((major: any) => ({
        ...major,
        name: major.name.replace("Major in ", ""),
      }));

    // sort majors by name
    processedMajors.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return NextResponse.json({
      data: processedMajors,
      message: "Majors retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching majors:", error);
    return NextResponse.json({ message: "Error retrieving majors", status: 500 }, { status: 500 });
  }
}
