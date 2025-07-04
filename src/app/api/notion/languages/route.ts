import { NextResponse } from "next/server";
import { getAvailableLanguages } from "@/lib/notion";

const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID || "22571cd270d480b8868df2e02b6dde5e";

export async function GET() {
  try {
    const languages = await getAvailableLanguages(NOTION_DATABASE_ID);

    return NextResponse.json({
      success: true,
      data: languages,
    });
  } catch (error) {
    console.error("Error fetching available languages:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch available languages",
        data: [], // No fallback - let Notion determine languages
      },
      { status: 500 }
    );
  }
}
