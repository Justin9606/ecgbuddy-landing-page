"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, MousePointer, Edit3, Layers } from "lucide-react";
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
  onElementClick?: (elementPath: string, elementType: string) => void;
}

interface HighlightableElementProps {
  children: React.ReactNode;
  elementPath: string;
  elementType: string;
  label: string;
  onElementClick?: (elementPath: string, elementType: string) => void;
  className?: string;
}

const HighlightableElement: React.FC<HighlightableElementProps> = ({
  children,
  elementPath,
  elementType,
  label,
  onElementClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onElementClick) {
      onElementClick(elementPath, elementType);
    }
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-200 ${className} ${
        isHovered ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
      
      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Edit Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-8 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-lg z-50 whitespace-nowrap"
          >
            <Edit3 className="w-3 h-3 inline mr-1" />
            Edit {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SectionPreview: React.FC<SectionPreviewProps> = ({
  section,
  content,
  isVisible = true,
  onToggleVisibility,
  onElementClick,
}) => {
  const [highlightMode, setHighlightMode] = useState(true);

  const wrapWithHighlight = (element: React.ReactElement, path: string, type: string, label: string) => {
    if (!highlightMode) return element;
    
    return (
      <HighlightableElement
        elementPath={path}
        elementType={type}
        label={label}
        onElementClick={onElementClick}
      >
        {element}
      </HighlightableElement>
    );
  };

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
          return (
            <div className="bg-white">
              {wrapWithHighlight(
                <Header isAdminView={true} content={content} />,
                "header",
                "navigation",
                "Header Navigation"
              )}
            </div>
          );
        case "hero":
          return (
            <div className="space-y-4">
              {wrapWithHighlight(
                <div>
                  <Hero isAdminView={true} content={content} />
                </div>,
                "hero",
                "hero-section",
                "Hero Section"
              )}
            </div>
          );
        case "features":
          return wrapWithHighlight(
            <Features isAdminView={true} content={content} />,
            "features",
            "features-section",
            "Features Section"
          );
        case "mobile-download":
          return wrapWithHighlight(
            <MobileDownload isAdminView={true} content={content} />,
            "mobile-download",
            "mobile-section",
            "Mobile Download Section"
          );
        case "faq":
          return wrapWithHighlight(
            <FAQ isAdminView={true} content={content} />,
            "faq",
            "faq-section",
            "FAQ Section"
          );
        case "about-arpi":
          return wrapWithHighlight(
            <AboutARPI isAdminView={true} content={content} />,
            "about-arpi",
            "about-section",
            "About ARPI Section"
          );
        case "footer":
          return wrapWithHighlight(
            <Footer isAdminView={true} content={content} />,
            "footer",
            "footer-section",
            "Footer Section"
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

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Live Preview</h3>
          <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
            Static Mode
          </div>
          {highlightMode && (
            <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
              <MousePointer className="w-3 h-3" />
              <span>Interactive</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setHighlightMode(!highlightMode)}
            className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-md font-medium transition-colors ${
              highlightMode 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{highlightMode ? 'Disable' : 'Enable'} Highlights</span>
          </button>
          
          {onToggleVisibility && (
            <button
              onClick={onToggleVisibility}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
            >
              {isVisible ? (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Show</span>
                </>
              )}
            </button>
          )}
        </div>
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
            {highlightMode && (
              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center space-x-1">
                <MousePointer className="w-3 h-3" />
                <span>Click to Edit</span>
              </div>
            )}
          </div>

          {/* Section Content */}
          <div className="relative">
            {/* Enable interactions for highlighting */}
            <div className={highlightMode ? 'pointer-events-auto' : 'pointer-events-none select-none'}>
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
            {highlightMode ? 'Click elements to edit them' : 'Animations disabled for editing'}
          </span>
        </div>
      </div>
    </div>
  );
};