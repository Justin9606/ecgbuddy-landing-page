import { Client } from "@notionhq/client";

// Initialize the client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Types for our Notion content
export interface NotionPage {
  id: string;
  title: string;
  slug: string;
  content: any;
  language: "ko" | "en";
  category: "arpi" | "ecg-buddy" | "research";
  published: boolean;
  created_time: string;
  last_edited_time: string;
}

export interface NotionDatabase {
  id: string;
  title: string;
  description?: string;
}

// Fetch all pages from a database
export async function getNotionDatabase(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    return [];
  }
}

// Fetch a specific page by ID
export async function getNotionPage(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    return {
      page,
      blocks: blocks.results,
    };
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    return null;
  }
}

// Get pages by category and language
export async function getPagesByCategory(
  databaseId: string,
  category: string,
  language: "ko" | "en" = "en"
) {
  try {
    // Map our language codes to database values
    const languageMapping = {
      ko: "Korean",
      en: "English",
    };

    // Map our category codes to database values
    const categoryMapping = {
      arpi: "ARPI",
      "ecg-buddy": "ECG Buddy",
      research: "Research",
    };

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Parent",
            select: {
              equals:
                categoryMapping[category as keyof typeof categoryMapping] ||
                category,
            },
          },
          {
            property: "Language",
            select: {
              equals: languageMapping[language],
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error("Error fetching pages by category:", error);
    return [];
  }
}

// Get navigation data for header
export async function getNavigationData(
  databaseId: string,
  language: "ko" | "en" = "en"
) {
  try {
    const languageMapping = {
      ko: "Korean",
      en: "English",
    };

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Type",
            select: {
              equals: "Navigation",
            },
          },
          {
            property: "Section",
            select: {
              equals: "Header",
            },
          },
          {
            property: "Language",
            select: {
              equals: languageMapping[language],
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return [];
  }
}

// Format navigation data for Header component
export function formatNavigationData(pages: any[]) {
  const navigation = {
    mainItems: [] as any[],
    dropdownItems: {
      ARPI: [] as any[],
      "ECG Buddy": [] as any[],
      Research: [] as any[],
    },
  };

  pages.forEach((page) => {
    const properties = page.properties;
    const title = properties.Title?.title?.[0]?.plain_text || "";
    const parent = properties.Parent?.select?.name || "None";
    const component = properties.Component?.select?.name || "";
    const url = properties.URL?.url || "";
    const content = properties.Content?.rich_text?.[0]?.plain_text || "";
    const order = properties.Order?.number || 0;

    const item = {
      id: page.id,
      title,
      url,
      description: content,
      order,
      parent,
      component,
    };

    if (component === "nav-main") {
      navigation.mainItems.push(item);
    } else if (component === "nav-item" && parent !== "None") {
      if (parent === "ARPI") {
        navigation.dropdownItems.ARPI.push(item);
      } else if (parent === "ECG Buddy") {
        navigation.dropdownItems["ECG Buddy"].push(item);
      } else if (parent === "Research") {
        navigation.dropdownItems.Research.push(item);
      }
    }
  });

  // Sort all arrays by order
  navigation.mainItems.sort((a, b) => a.order - b.order);
  navigation.dropdownItems.ARPI.sort((a, b) => a.order - b.order);
  navigation.dropdownItems["ECG Buddy"].sort((a, b) => a.order - b.order);
  navigation.dropdownItems.Research.sort((a, b) => a.order - b.order);

  return navigation;
}

// Convert Notion page properties to our format
export function formatNotionPage(page: any): NotionPage {
  const properties = page.properties;

  // Map database values back to our format
  const languageMapping: { [key: string]: "ko" | "en" } = {
    Korean: "ko",
    English: "en",
  };

  const categoryMapping: { [key: string]: "arpi" | "ecg-buddy" | "research" } =
    {
      ARPI: "arpi",
      "ECG Buddy": "ecg-buddy",
      Research: "research",
    };

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || "",
    slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
    content: page,
    language: languageMapping[properties.Language?.select?.name] || "en",
    category: categoryMapping[properties.Parent?.select?.name] || "arpi",
    published: properties.Published?.checkbox || false,
    created_time: page.created_time,
    last_edited_time: page.last_edited_time,
  };
}

// ===== INDIVIDUAL PAGES APPROACH =====
// For when you have separate Notion pages instead of a database

// Get page ID from Notion URL
export function getPageIdFromUrl(url: string): string | null {
  const match = url.match(
    /([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/
  );
  return match ? match[0].replace(/-/g, "") : null;
}

// Predefined page IDs for individual pages approach
export const NOTION_PAGES = {
  // ARPI
  "about-arpi-en": process.env.NOTION_ABOUT_ARPI_EN_ID,
  "about-arpi-ko": process.env.NOTION_ABOUT_ARPI_KO_ID,
  blog: process.env.NOTION_BLOG_ID,
  media: process.env.NOTION_MEDIA_ID,

  // ECG Buddy
  "how-to-use-en": process.env.NOTION_HOW_TO_USE_EN_ID,
  "how-to-use-ko": process.env.NOTION_HOW_TO_USE_KO_ID,
  "report-interpretation": process.env.NOTION_REPORT_INTERPRETATION_ID,
  "reliability-form": process.env.NOTION_RELIABILITY_FORM_ID,
  "faq-en": process.env.NOTION_FAQ_EN_ID,
  "faq-ko": process.env.NOTION_FAQ_KO_ID,

  // Research
  publications: process.env.NOTION_PUBLICATIONS_ID,
  "conference-talks": process.env.NOTION_CONFERENCE_TALKS_ID,
  "researcher-network": process.env.NOTION_RESEARCHER_NETWORK_ID,
  "apply-researcher": process.env.NOTION_APPLY_RESEARCHER_ID,
};

// Get page by category and item (individual pages)
export function getPageIdByRoute(
  category: string,
  item: string,
  language: "ko" | "en" = "en"
): string | null {
  const key = `${item}-${language}`;
  const fallbackKey = item;

  return (
    NOTION_PAGES[key as keyof typeof NOTION_PAGES] ||
    NOTION_PAGES[fallbackKey as keyof typeof NOTION_PAGES] ||
    null
  );
}
