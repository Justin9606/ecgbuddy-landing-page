"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { AdminSection } from "./AdminDashboard";

// Import section components
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MobileDownload from "@/components/sections/MobileDownload";
import FAQ from "@/components/sections/FAQ";
import AboutARPI from "@/components/sections/AboutARPI";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface SectionPreviewProps {
  section: AdminSection;
  content: any;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

export const SectionPreview: React.FC<SectionPreviewProps> = ({
  section,
  content,
  isVisible = true,
  onToggleVisibility,
}) => {
  const renderSectionComponent = () => {
    // Ensure content exists
    if (!content) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">No Content Available</div>
            <div className="text-sm">Configure content in the editor to see preview</div>
          </div>
        </div>
      );
    }

    try {
      switch (section) {
        case "header":
          return <Header isAdminView={true} content={content} />;
        case "hero":
          return <Hero isAdminView={true} content={content} />;
        case "features":
          return <Features isAdminView={true} content={content} />;
        case "mobile-download":
          return <MobileDownload isAdminView={true} content={content} />;
        case "faq":
          return <FAQ isAdminView={true} content={content} />;
        case "about-arpi":
          return <AboutARPI isAdminView={true} content={content} />;
        case "footer":
          return <Footer isAdminView={true} content={content} />;
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

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Live Preview</h3>
          <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
            Static Mode
          </div>
        </div>
        
        {onToggleVisibility && (
          <button
            onClick={onToggleVisibility}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isVisible ? (
              <>
                <EyeOff className="w-3 h-3" />
                <span>Hide Preview</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                <span>Show Preview</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Preview Container */}
      {isVisible && (
        <motion.div
          className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Preview Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
              Preview Mode
            </div>
          </div>

          {/* Section Content */}
          <div className="relative">
            {/* Disable all interactions in preview */}
            <div className="pointer-events-none select-none">
              {renderSectionComponent()}
            </div>
          </div>

          {/* Preview Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-8 pointer-events-none" />
        </motion.div>
      )}

      {/* Preview Info */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <span>
            ✨ This preview shows how your content will appear on the live site
          </span>
          <span className="font-medium">
            Animations disabled for editing
          </span>
        </div>
      </div>
    </div>
  );
};