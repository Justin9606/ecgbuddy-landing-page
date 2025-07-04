import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNotionPageWithBlocks, getContentAvailability } from "@/lib/notion";
import NotionPageRenderer from "@/components/NotionPageRenderer";
import LanguageFallback from "@/components/LanguageFallback";

// Type for page props
interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    lang?: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const language = searchParams.lang || "English"; // Dynamic language

  if (!process.env.NOTION_DATABASE_ID) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const pageData = await getNotionPageWithBlocks(
    process.env.NOTION_DATABASE_ID,
    params.slug,
    language
  );

  if (!pageData) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const { title, description, metadata } = pageData;

  return {
    title: metadata.seoTitle || title,
    description: metadata.seoDescription || description,
    openGraph: {
      title: metadata.seoTitle || title,
      description: metadata.seoDescription || description,
      images: metadata.ogImage ? [metadata.ogImage] : [],
      type: "article",
      publishedTime: pageData.publishDate,
      modifiedTime: pageData.lastEdited,
      authors: metadata.author ? [metadata.author] : [],
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.seoTitle || title,
      description: metadata.seoDescription || description,
      images: metadata.ogImage ? [metadata.ogImage] : [],
    },
    keywords: metadata.tags,
    authors: metadata.author ? [{ name: metadata.author }] : [],
  };
}

// Main page component
export default async function DynamicPage({ params, searchParams }: PageProps) {
  const language = searchParams.lang || "English"; // Dynamic language

  // Check if Notion is configured
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Configuration Required
          </h1>
          <p className="text-gray-600">
            Notion CMS is not configured. Please set up your environment
            variables.
          </p>
        </div>
      </div>
    );
  }

  // Fetch page data from Notion
  const pageData = await getNotionPageWithBlocks(
    process.env.NOTION_DATABASE_ID,
    params.slug,
    language
  );

  // Handle page not found
  if (!pageData) {
    // Check if content exists in other languages
    try {
      const contentAvailability = await getContentAvailability(
        process.env.NOTION_DATABASE_ID
      );
      const availableLanguages = contentAvailability[`/${params.slug}`] || [];

      if (availableLanguages.length > 0) {
        // Content exists in other languages, show fallback
        const availableLanguageCodes = availableLanguages; // Use language names directly from Notion

        return (
          <LanguageFallback
            requestedUrl={`/${params.slug}`}
            availableLanguages={availableLanguageCodes}
            fallbackLanguage="en"
          />
        );
      }
    } catch (error) {
      console.error("Error checking content availability:", error);
    }

    // Content doesn't exist at all
    notFound();
  }

  // Render the page
  return (
    <div className="min-h-screen bg-gray-50">
      <NotionPageRenderer pageData={pageData} language={language} />
    </div>
  );
}

// Optional: Generate static params for better performance
export async function generateStaticParams() {
  // This would generate static pages for all published pages
  // For now, we'll use dynamic rendering
  return [];
}
