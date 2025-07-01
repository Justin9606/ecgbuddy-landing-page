"use client";

import React from "react";
import { AdminSection } from "./AdminDashboard";
import { getSectionContent } from "@/lib/admin/contentProvider";

// Import section components
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MobileDownload from "@/components/sections/MobileDownload";
import FAQ from "@/components/sections/FAQ";
import AboutARPI from "@/components/sections/AboutARPI";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  const renderStaticPreview = () => {
    try {
      switch (section) {
        case "header":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">Header Preview</h3>
              </div>
              <div className="p-4">
                <Header />
              </div>
            </div>
          );
          
        case "hero":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">Hero Section Preview</h3>
              </div>
              <div className="bg-gradient-to-br from-red-50/30 via-white to-pink-50/20">
                <Hero />
              </div>
            </div>
          );
          
        case "features":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">Features Section Preview</h3>
              </div>
              <Features />
            </div>
          );
          
        case "mobile-download":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">Download App Section Preview</h3>
              </div>
              <MobileDownload />
            </div>
          );
          
        case "faq":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">FAQ Section Preview</h3>
              </div>
              <FAQ />
            </div>
          );
          
        case "about-arpi":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">About ARPI Section Preview</h3>
              </div>
              <AboutARPI />
            </div>
          );
          
        case "footer":
          return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-sm font-medium text-gray-700">Footer Section Preview</h3>
              </div>
              <div className="bg-gray-900 text-white">
                <Footer />
              </div>
            </div>
          );
          
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
          <h3 className="text-sm font-semibold text-gray-900">Static Preview</h3>
          <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
            Admin Mode
          </div>
        </div>
        
        {onToggleVisibility && (
          <button
            onClick={onToggleVisibility}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
          >
            Hide Preview
          </button>
        )}
      </div>

      {/* Static Preview Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="max-h-[600px] overflow-y-auto">
          {renderStaticPreview()}
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