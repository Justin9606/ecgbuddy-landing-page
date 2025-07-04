import { NextResponse } from "next/server";
import { getInterfaceTranslations } from "@/lib/notion";

const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID || "22571cd270d480b8868df2e02b6dde5e";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = (searchParams.get("lang") as "ko" | "en") || "en";

    const translations = await getInterfaceTranslations(
      NOTION_DATABASE_ID,
      language
    );

    return NextResponse.json({
      success: true,
      data: translations,
      language,
    });
  } catch (error) {
    console.error("Error fetching translations:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch translations",
        data: {},
      },
      { status: 500 }
    );
  }
}
