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
  language: string; // Dynamic from Notion
  category: string; // Dynamic from Notion
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
  language: string = "en"
) {
  try {
    // Use language directly from Notion - no hardcoded mapping

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
              equals: language,
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
  language: string = "en"
) {
  try {
    // Use language directly from Notion - no hardcoded mapping

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
              equals: language,
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
  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || "",
    slug: properties.URL?.rich_text?.[0]?.plain_text || "",
    content: properties.Content?.rich_text?.[0]?.plain_text || "",
    language: properties.Language?.select?.name || "", // Dynamic from Notion
    category: properties.Category?.select?.name || "", // Dynamic from Notion
    published: properties.Published?.checkbox || false,
    created_time: page.created_time,
    last_edited_time: page.last_edited_time,
  };
}

// ===== DYNAMIC PAGE CONTENT FUNCTIONS =====

// Get page content by URL slug
export async function getNotionPageBySlug(
  databaseId: string,
  slug: string,
  language: string = "en"
) {
  try {
    // Use language directly from Notion - no hardcoded mapping

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "URL",
            rich_text: {
              equals: slug.startsWith("/") ? slug : `/${slug}`,
            },
          },
          {
            property: "Language",
            select: {
              equals: language,
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
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];

    // Get the page content blocks
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
      page_size: 100,
    });

    return {
      page,
      blocks: blocks.results,
      hasMore: blocks.has_more,
    };
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

// Get all published page slugs for static generation
export async function getAllPageSlugs(
  databaseId: string,
  language: string = "en"
) {
  try {
    // Use language directly from Notion - no hardcoded mapping

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Type",
            select: {
              equals: "Page",
            },
          },
          {
            property: "Language",
            select: {
              equals: language,
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
    });

    return response.results
      .map((page: any) => {
        const url = page.properties.URL?.rich_text?.[0]?.plain_text || "";
        return url.startsWith("/") ? url.slice(1) : url;
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error fetching all page slugs:", error);
    return [];
  }
}

// Format Notion page content for rendering
export function formatNotionPageContent(page: any, blocks: any[]) {
  const properties = page.properties;

  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || "",
    slug: properties.URL?.rich_text?.[0]?.plain_text || "",
    description: properties.Content?.rich_text?.[0]?.plain_text || "",
    language: properties.Language?.select?.name || "", // Dynamic from Notion
    published: properties.Published?.checkbox || false,
    publishDate: properties.Publish_Date?.date?.start || page.created_time,
    lastEdited: page.last_edited_time,
    blocks: blocks,
    metadata: {
      seoTitle: properties.SEO_Title?.rich_text?.[0]?.plain_text || "",
      seoDescription:
        properties.SEO_Description?.rich_text?.[0]?.plain_text || "",
      ogImage: properties.OG_Image?.files?.[0]?.file?.url || "",
      author: properties.Author?.rich_text?.[0]?.plain_text || "",
      category: properties.Category?.select?.name || "",
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    },
  };
}

// Get page content with full blocks recursively
export async function getNotionPageWithBlocks(
  databaseId: string,
  slug: string,
  language: string = "en"
) {
  try {
    const pageData = await getNotionPageBySlug(databaseId, slug, language);

    if (!pageData) {
      return null;
    }

    // Get all blocks recursively (including nested blocks)
    const allBlocks = await getAllBlocksRecursively(pageData.page.id);

    return {
      ...formatNotionPageContent(pageData.page, allBlocks),
      rawPage: pageData.page,
    };
  } catch (error) {
    console.error("Error fetching page with blocks:", error);
    return null;
  }
}

// Get all blocks recursively including nested blocks
async function getAllBlocksRecursively(blockId: string): Promise<any[]> {
  const blocks = [];
  let cursor;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      blocks.push(block);

      // If block has children, get them recursively
      if ("has_children" in block && block.has_children) {
        const childBlocks = await getAllBlocksRecursively(block.id);
        blocks.push(...childBlocks);
      }
    }

    cursor = response.next_cursor;
  } while (cursor);

  return blocks;
}

// Get all available languages from database
export async function getAvailableLanguages(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
    });

    // Extract unique languages from the results
    const languages = new Set<string>();

    response.results.forEach((page: any) => {
      const languageProperty = page.properties.Language;
      if (
        languageProperty &&
        languageProperty.select &&
        languageProperty.select.name
      ) {
        languages.add(languageProperty.select.name);
      }
    });

    // Convert to array - completely dynamic from Notion
    return Array.from(languages).map((lang) => ({
      code: lang.toLowerCase(),
      name: lang,
    }));
  } catch (error) {
    console.error("Error fetching available languages:", error);
    return []; // No fallback - let Notion determine languages
  }
}

// Get interface translations from Notion database
export async function getInterfaceTranslations(
  databaseId: string,
  language: string = "en"
) {
  try {
    // Use language directly from Notion - no hardcoded mapping

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Type",
            select: {
              equals: "Interface",
            },
          },
          {
            property: "Language",
            select: {
              equals: language,
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
    });

    // Convert Notion results to translation object structure
    const translations: any = {};

    response.results.forEach((page: any) => {
      const properties = page.properties;
      const key = properties.Key?.rich_text?.[0]?.plain_text || "";
      const value = properties.Value?.rich_text?.[0]?.plain_text || "";
      const section =
        properties.Section?.rich_text?.[0]?.plain_text || "general";

      if (key && value) {
        // Create nested structure based on section and key
        const keyParts = key.split(".");
        let current = translations;

        // Navigate to the correct nested level
        for (let i = 0; i < keyParts.length - 1; i++) {
          if (!current[keyParts[i]]) {
            current[keyParts[i]] = {};
          }
          current = current[keyParts[i]];
        }

        // Set the final value
        current[keyParts[keyParts.length - 1]] = value;
      }
    });

    return translations;
  } catch (error) {
    console.error("Error fetching interface translations:", error);
    return {}; // Return empty object as fallback
  }
}

// Get content availability by language (for filtering)
export async function getContentAvailability(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
    });

    const availability: { [key: string]: string[] } = {};

    response.results.forEach((page: any) => {
      const properties = page.properties;
      const url = properties.URL?.rich_text?.[0]?.plain_text || "";
      const language = properties.Language?.select?.name || "";
      const type = properties.Type?.select?.name || "";

      if (url && language && (type === "Navigation" || type === "Page")) {
        if (!availability[url]) {
          availability[url] = [];
        }
        if (!availability[url].includes(language)) {
          availability[url].push(language);
        }
      }
    });

    return availability;
  } catch (error) {
    console.error("Error fetching content availability:", error);
    return {};
  }
}
