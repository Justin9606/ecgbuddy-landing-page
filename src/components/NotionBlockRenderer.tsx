"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Quote,
  Code,
  FileText,
  Download,
} from "lucide-react";

// Types for Notion blocks
interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

interface NotionBlockRendererProps {
  block: NotionBlock;
  language: "ko" | "en";
}

// Helper function to render rich text
const renderRichText = (richText: any[] = []) => {
  if (!richText || richText.length === 0) return null;

  return richText.map((text, index) => {
    const { annotations, plain_text, href } = text;

    let element = plain_text;

    // Apply text formatting
    if (annotations?.bold) {
      element = <strong key={index}>{element}</strong>;
    }
    if (annotations?.italic) {
      element = <em key={index}>{element}</em>;
    }
    if (annotations?.strikethrough) {
      element = <del key={index}>{element}</del>;
    }
    if (annotations?.underline) {
      element = <u key={index}>{element}</u>;
    }
    if (annotations?.code) {
      element = (
        <code
          key={index}
          className="px-2 py-1 bg-gray-100 rounded text-sm font-mono"
        >
          {element}
        </code>
      );
    }
    if (annotations?.color && annotations.color !== "default") {
      const colorClass = getColorClass(annotations.color);
      element = (
        <span key={index} className={colorClass}>
          {element}
        </span>
      );
    }

    // Add link if present
    if (href) {
      element = (
        <a
          key={index}
          href={href}
          className="text-red-600 hover:text-red-800 underline"
          target={href.startsWith("http") ? "_blank" : "_self"}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {element}
          {href.startsWith("http") && (
            <ExternalLink className="w-3 h-3 ml-1 inline" />
          )}
        </a>
      );
    }

    return element;
  });
};

// Helper function to get color classes
const getColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    red: "text-red-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
    brown: "text-amber-600",
    gray: "text-gray-600",
    red_background: "bg-red-100 text-red-900 px-2 py-1 rounded",
    orange_background: "bg-orange-100 text-orange-900 px-2 py-1 rounded",
    yellow_background: "bg-yellow-100 text-yellow-900 px-2 py-1 rounded",
    green_background: "bg-green-100 text-green-900 px-2 py-1 rounded",
    blue_background: "bg-blue-100 text-blue-900 px-2 py-1 rounded",
    purple_background: "bg-purple-100 text-purple-900 px-2 py-1 rounded",
    pink_background: "bg-pink-100 text-pink-900 px-2 py-1 rounded",
    brown_background: "bg-amber-100 text-amber-900 px-2 py-1 rounded",
    gray_background: "bg-gray-100 text-gray-900 px-2 py-1 rounded",
  };
  return colorMap[color] || "";
};

const NotionBlockRenderer: React.FC<NotionBlockRendererProps> = ({
  block,
  language,
}) => {
  const { type } = block;

  // Handle different block types
  switch (type) {
    case "paragraph":
      const paragraphText = renderRichText(block.paragraph?.rich_text);
      return paragraphText ? (
        <p className="mb-4 text-gray-700 leading-relaxed">{paragraphText}</p>
      ) : null;

    case "heading_1":
      const h1Text = renderRichText(block.heading_1?.rich_text);
      return h1Text ? (
        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{h1Text}</h1>
      ) : null;

    case "heading_2":
      const h2Text = renderRichText(block.heading_2?.rich_text);
      return h2Text ? (
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-6">
          {h2Text}
        </h2>
      ) : null;

    case "heading_3":
      const h3Text = renderRichText(block.heading_3?.rich_text);
      return h3Text ? (
        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5">
          {h3Text}
        </h3>
      ) : null;

    case "bulleted_list_item":
      const bulletText = renderRichText(block.bulleted_list_item?.rich_text);
      return bulletText ? (
        <li className="mb-2 text-gray-700 ml-6 list-disc">{bulletText}</li>
      ) : null;

    case "numbered_list_item":
      const numberText = renderRichText(block.numbered_list_item?.rich_text);
      return numberText ? (
        <li className="mb-2 text-gray-700 ml-6 list-decimal">{numberText}</li>
      ) : null;

    case "image":
      const imageData = block.image;
      const imageUrl = imageData?.file?.url || imageData?.external?.url;
      const caption = renderRichText(imageData?.caption);

      return imageUrl ? (
        <div className="my-6">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={imageUrl}
              alt={caption ? caption.toString() : ""}
              width={800}
              height={400}
              className="w-full h-auto"
              priority={false}
            />
          </div>
          {caption && (
            <p className="text-sm text-gray-500 text-center mt-2 italic">
              {caption}
            </p>
          )}
        </div>
      ) : null;

    case "callout":
      const calloutIcon = block.callout?.icon?.emoji || "💡";
      const calloutText = renderRichText(block.callout?.rich_text);
      const calloutColor = block.callout?.color || "gray";

      return calloutText ? (
        <div
          className={`my-6 p-4 rounded-lg border-l-4 ${
            calloutColor === "red"
              ? "bg-red-50 border-red-400"
              : calloutColor === "orange"
              ? "bg-orange-50 border-orange-400"
              : calloutColor === "yellow"
              ? "bg-yellow-50 border-yellow-400"
              : calloutColor === "green"
              ? "bg-green-50 border-green-400"
              : calloutColor === "blue"
              ? "bg-blue-50 border-blue-400"
              : calloutColor === "purple"
              ? "bg-purple-50 border-purple-400"
              : "bg-gray-50 border-gray-400"
          }`}
        >
          <div className="flex items-start">
            <span className="text-lg mr-3 flex-shrink-0">{calloutIcon}</span>
            <div className="flex-1">{calloutText}</div>
          </div>
        </div>
      ) : null;

    case "quote":
      const quoteText = renderRichText(block.quote?.rich_text);
      return quoteText ? (
        <blockquote className="my-6 pl-6 border-l-4 border-gray-300 italic text-gray-600 text-lg">
          <Quote className="w-5 h-5 inline mr-2 text-gray-400" />
          {quoteText}
        </blockquote>
      ) : null;

    case "code":
      const codeText = renderRichText(block.code?.rich_text);
      const language_code = block.code?.language || "text";

      return codeText ? (
        <div className="my-6">
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{language_code}</span>
              <Code className="w-4 h-4 text-gray-400" />
            </div>
            <pre className="text-green-400 text-sm font-mono">
              <code>{codeText}</code>
            </pre>
          </div>
        </div>
      ) : null;

    case "divider":
      return <hr className="my-8 border-gray-200" />;

    case "file":
      const fileData = block.file;
      const fileUrl = fileData?.file?.url || fileData?.external?.url;
      const fileName = fileData?.name || "Download File";

      return fileUrl ? (
        <div className="my-6">
          <a
            href={fileUrl}
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            download
          >
            <FileText className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-gray-700">{fileName}</span>
            <Download className="w-4 h-4 ml-2 text-gray-500" />
          </a>
        </div>
      ) : null;

    case "video":
      const videoData = block.video;
      const videoUrl = videoData?.file?.url || videoData?.external?.url;

      return videoUrl ? (
        <div className="my-6">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <video controls className="w-full h-auto" src={videoUrl}>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : null;

    case "table":
      // Basic table support - would need more complex handling for full tables
      return (
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <tbody>
              {/* Table content would be rendered here */}
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                  Table content coming soon...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "toggle":
      const toggleText = renderRichText(block.toggle?.rich_text);
      return toggleText ? (
        <details className="my-4 p-4 border border-gray-200 rounded-lg">
          <summary className="cursor-pointer font-medium text-gray-900 hover:text-red-600">
            {toggleText}
          </summary>
          <div className="mt-3 text-gray-700">
            {/* Child blocks would be rendered here */}
          </div>
        </details>
      ) : null;

    default:
      // Handle unsupported blocks
      return (
        <div className="my-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800 text-sm">
              Unsupported block type: {type}
            </span>
          </div>
        </div>
      );
  }
};

export default NotionBlockRenderer;
