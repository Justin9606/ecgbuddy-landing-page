"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, MousePointer, Edit3, Layers, Monitor, Smartphone, Tablet } from "lucide-react";
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
        isHovered ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg' : ''
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
            className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg pointer-events-none z-10"
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
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

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

  const renderHeaderPreview = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header Preview Container */}
        <div className="relative">
          {/* Logo Section */}
          {wrapWithHighlight(
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-sm">❤️</span>
                </div>
                <span className="text-xl font-bold text-slate-800">
                  {content?.logoText || "ECG Buddy"}
                </span>
              </div>
              {content?.tagline && (
                <p className="text-sm text-gray-600 mt-2">{content.tagline}</p>
              )}
            </div>,
            "logoText",
            "logo",
            "Logo & Tagline"
          )}

          {/* Navigation Section */}
          {wrapWithHighlight(
            <div className="p-4 border-b border-gray-100">
              <div className="flex flex-wrap gap-2">
                {(content?.navigationItems || []).map((item: any, index: number) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>,
            "navigationItems",
            "navigation",
            "Navigation Menu"
          )}

          {/* CTA Button Section */}
          {wrapWithHighlight(
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {(content?.languages || []).map((lang: any, index: number) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        lang.isActive
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {lang.name}
                    </span>
                  ))}
                </div>
                <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {content?.ctaButton?.text || "Try ECG Buddy"}
                </button>
              </div>
            </div>,
            "ctaButton",
            "cta",
            "CTA Button"
          )}
        </div>
      </div>
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
          return renderHeaderPreview();
          
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
          return (
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              {wrapWithHighlight(
                <Footer isAdminView={true} content={content} />,
                "footer",
                "footer-section",
                "Footer Section"
              )}
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

  const viewportOptions = [
    { id: "desktop", name: "Desktop", icon: Monitor },
    { id: "tablet", name: "Tablet", icon: Tablet },
    { id: "mobile", name: "Mobile", icon: Smartphone },
  ];

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
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
              Preview Mode
            </div>
            {highlightMode && (
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center space-x-1">
                <MousePointer className="w-3 h-3" />
                <span>Click to Edit</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
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
              {/* Section Content */}
              <div className="relative">
                {/* Enable interactions for highlighting */}
                <div className={highlightMode ? 'pointer-events-auto' : 'pointer-events-none select-none'}>
                  {renderSectionComponent()}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/10 to-transparent h-6 pointer-events-none" />
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