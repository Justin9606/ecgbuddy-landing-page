import { NextRequest, NextResponse } from "next/server";
import { getNavigationData, formatNavigationData } from "@/lib/notion";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = (searchParams.get("lang") as "ko" | "en") || "en";

    // For testing without Notion setup
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json({
        message: "Notion not configured yet",
        navigation: null,
        language,
        status: "ready_for_setup",
      });
    }

    const pages = await getNavigationData(
      process.env.NOTION_DATABASE_ID,
      language
    );

    const navigation = formatNavigationData(pages);

    return NextResponse.json({
      navigation,
      language,
      count: pages.length,
      status: "success",
    });
  } catch (error) {
    console.error("Navigation API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch navigation data from Notion" },
      { status: 500 }
    );
  }
}
