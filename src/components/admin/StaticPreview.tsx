"use client";

import React from "react";
import { Eye, EyeOff, Monitor, Smartphone, Tablet } from "lucide-react";
import { AdminSection } from "./AdminDashboard";
import { getSectionContent } from "@/lib/admin/contentProvider";

// Import section components - we'll create static versions
import { StaticHero } from "./preview/StaticHero";
import { StaticFeatures } from "./preview/StaticFeatures";
import { StaticMobileDownload } from "./preview/StaticMobileDownload";
import { StaticFAQ } from "./preview/StaticFAQ";
import { StaticAboutARPI } from "./preview/StaticAboutARPI";
import { StaticHeader } from "./preview/StaticHeader";
import { StaticFooter } from "./preview/StaticFooter";

interface StaticPreviewProps {
  section: AdminSection;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

export const StaticPreview: React.FC<StaticPreviewProps> = ({
  section,
  isVisible = true,
  onToggleVisibility,
}) => {
  const [viewportMode, setViewportMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop");

  const getViewportWidth = () => {
    switch (viewportMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  const viewportOptions = [
    { id: "desktop", name: "Desktop", icon: Monitor },
    { id: "tablet", name: "Tablet", icon: Tablet },
    { id: "mobile", name: "Mobile", icon: Smartphone },
  ];

  const renderStaticPreview = () => {
    try {
      switch (section) {
        case "header":
          return <StaticHeader />;
          
        case "hero":
          return <StaticHero />;
          
        case "features":
          return <StaticFeatures />;
          
        case "mobile-download":
          return <StaticMobileDownload />;
          
        case "faq":
          return <StaticFAQ />;
          
        case "about-arpi":
          return <StaticAboutARPI />;
          
        case "footer":
          return <StaticFooter />;
          
        default:
          return (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <div className="text-lg font-medium mb-2">Preview Not Available</div>
                <div className="text-sm">Section "{section}" preview is not implemented yet</div>
              </div>
            </div>
          );
      }
    } catch (error) {
      console.error(`Error rendering ${section} preview:`, error);
      return (
        <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg border-2 border-dashed border-red-300">
          <div className="text-center text-red-600">
            <div className="text-lg font-medium mb-2">Preview Error</div>
            <div className="text-sm">Failed to render {section} preview</div>
          </div>
        </div>
      );
    }
  };

  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Static Preview</h3>
          <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
            Admin Mode
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Viewport Selector */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {viewportOptions.map((viewport) => (
              <button
                key={viewport.id}
                onClick={() => setViewportMode(viewport.id as any)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewportMode === viewport.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <viewport.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{viewport.name}</span>
              </button>
            ))}
          </div>
          
          {onToggleVisibility && (
            <button
              onClick={onToggleVisibility}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
            >
              <EyeOff className="w-3 h-3" />
              <span>Hide</span>
            </button>
          )}
        </div>
      </div>

      {/* Static Preview Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Preview Overlay */}
        <div className="relative">
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm z-10">
            Static Preview
          </div>
          <div className="absolute bottom-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm z-10">
            {viewportMode.charAt(0).toUpperCase() + viewportMode.slice(1)} View
          </div>
        </div>

        {/* Viewport Container */}
        <div className="flex justify-center bg-gray-100 p-4">
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{ 
              width: getViewportWidth(),
              maxWidth: "100%",
              minHeight: section === "header" ? "auto" : "400px"
            }}
          >
            {/* Static Content - NO ANIMATIONS */}
            <div className="relative">
              {renderStaticPreview()}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <span>
            ⚡ Static preview - optimized for admin editing
          </span>
          <span className="font-medium">
            No animations for better performance
          </span>
        </div>
      </div>
    </div>
  );
};