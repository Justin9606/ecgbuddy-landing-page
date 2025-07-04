import { NextRequest, NextResponse } from "next/server";
import { getPagesByCategory, formatNotionPage } from "@/lib/notion";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const language = searchParams.get("lang") || "en";

    // For testing without Notion setup
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json({
        message: "Notion not configured yet - missing TOKEN or DATABASE_ID",
        category,
        language,
        status: "ready_for_setup",
      });
    }

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter required" },
        { status: 400 }
      );
    }

    // Use database approach only
    const pages = await getPagesByCategory(
      process.env.NOTION_DATABASE_ID,
      category,
      language
    );

    const formattedPages = pages.map(formatNotionPage);

    return NextResponse.json({
      pages: formattedPages,
      category,
      language,
      count: formattedPages.length,
      approach: "database",
    });
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content from Notion" },
      { status: 500 }
    );
  }
}
