import { NextRequest, NextResponse } from "next/server";
import {
  getPagesByCategory,
  formatNotionPage,
  getNotionPage,
  getPageIdByRoute,
} from "@/lib/notion";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const language = (searchParams.get("lang") as "ko" | "en") || "en";

    // For testing without Notion setup
    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json({
        message: "Notion not configured yet",
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

    const page = searchParams.get("page"); // specific page within category

    // APPROACH 1: Database (if DATABASE_ID is set)
    if (process.env.NOTION_DATABASE_ID) {
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
    }

    // APPROACH 2: Individual Pages (if specific page IDs are set)
    if (page) {
      const pageId = getPageIdByRoute(category, page, language);
      if (!pageId) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }

      const pageData = await getNotionPage(pageId);
      if (!pageData) {
        return NextResponse.json(
          { error: "Failed to fetch page" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        page: pageData.page,
        blocks: pageData.blocks,
        category,
        language,
        approach: "individual_pages",
      });
    }

    return NextResponse.json({
      message: "Neither database nor individual page IDs configured",
      category,
      language,
      status: "needs_configuration",
    });
  } catch (error) {
    console.error("Notion API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content from Notion" },
      { status: 500 }
    );
  }
}
