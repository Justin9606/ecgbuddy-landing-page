"use client";

import React from "react";
import { Calendar, User, Tag, Clock } from "lucide-react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import NotionBlockRenderer from "./NotionBlockRenderer";

// Types for the page data
interface PageData {
  id: string;
  title: string;
  slug: string;
  description: string;
  language: string; // Dynamic from Notion
  published: boolean;
  publishDate: string;
  lastEdited: string;
  blocks: any[];
  metadata: {
    seoTitle: string;
    seoDescription: string;
    ogImage: string;
    author: string;
    category: string;
    tags: string[];
  };
}

interface NotionPageRendererProps {
  pageData: PageData;
  language: string; // Dynamic from Notion
}

const NotionPageRenderer: React.FC<NotionPageRendererProps> = ({
  pageData,
  language,
}) => {
  const { title, description, blocks, metadata, publishDate, lastEdited } =
    pageData;

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Dynamic locale mapping
    const localeMap: { [key: string]: string } = {
      Korean: "ko-KR",
      English: "en-US",
      Japanese: "ja-JP",
      Chinese: "zh-CN",
    };
    const locale = localeMap[language] || "en-US";

    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Content */}
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6 py-16">
            {/* Category Badge */}
            {metadata.category && (
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  <Tag className="w-3 h-3 mr-1" />
                  {metadata.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {description}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              {/* Publish Date */}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {language === "Korean" ? "발행일" : "Published"}:{" "}
                  {formatDate(publishDate)}
                </span>
              </div>

              {/* Last Edited */}
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {language === "Korean" ? "최종 수정" : "Last updated"}:{" "}
                  {formatDate(lastEdited)}
                </span>
              </div>

              {/* Author */}
              {metadata.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>
                    {language === "Korean" ? "작성자" : "Author"}:{" "}
                    {metadata.author}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none">
            {blocks.map((block, index) => (
              <div
                key={block.id || index}
                className="p-4 bg-gray-100 rounded mb-4"
              >
                <strong>Block Type:</strong> {block.type || "unknown"}
                <br />
                <strong>Content:</strong>{" "}
                {JSON.stringify(block).substring(0, 100)}...
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotionPageRenderer;
