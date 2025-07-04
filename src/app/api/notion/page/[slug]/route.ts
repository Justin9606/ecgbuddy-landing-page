import { NextRequest, NextResponse } from "next/server";
import { getNotionPageWithBlocks } from "@/lib/notion";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const language = (searchParams.get("lang") as "ko" | "en") || "en";

    // Check if Notion is configured
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        {
          error: "Notion CMS is not configured",
          status: "configuration_required",
        },
        { status: 503 }
      );
    }

    // Fetch page data from Notion
    const pageData = await getNotionPageWithBlocks(
      process.env.NOTION_DATABASE_ID,
      params.slug,
      language
    );

    if (!pageData) {
      return NextResponse.json(
        {
          error: "Page not found",
          slug: params.slug,
          language,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      page: pageData,
      slug: params.slug,
      language,
      status: "success",
    });
  } catch (error) {
    console.error("Page API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch page content",
        slug: params.slug,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
