import { NextResponse } from "next/server";
import { getContentAvailability } from "@/lib/notion";

const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID || "22571cd270d480b8868df2e02b6dde5e";

export async function GET() {
  try {
    const availability = await getContentAvailability(NOTION_DATABASE_ID);

    return NextResponse.json({
      success: true,
      data: availability,
    });
  } catch (error) {
    console.error("Error fetching content availability:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch content availability",
        data: {},
      },
      { status: 500 }
    );
  }
}
