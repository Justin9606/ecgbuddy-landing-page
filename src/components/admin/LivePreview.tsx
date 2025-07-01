"use client";

import React, { memo, useMemo } from "react";
import { Eye, EyeOff, Monitor, Smartphone, Tablet, RefreshCw, Target } from "lucide-react";
import { AdminSection } from "./AdminDashboard";
import { useAdminContentData } from "@/lib/admin/contentProvider";

// Import ACTUAL landing page components
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MobileDownload from "@/components/sections/MobileDownload";
import FAQ from "@/components/sections/FAQ";
import AboutARPI from "@/components/sections/AboutARPI";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LivePreviewProps {
  section: AdminSection;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  onElementClick?: (elementPath: string, elementType: string) => void;
}

// Memoized component wrapper to prevent unnecessary re-renders
const ComponentWrapper = memo(({ 
  children, 
  onElementClick 
}: { 
  children: React.ReactNode;
  onElementClick?: (elementPath: string, elementType: string) => void;
}) => (
  <div className="admin-preview-wrapper">
    {React.cloneElement(children as React.ReactElement, { onElementClick })}
  </div>
));

ComponentWrapper.displayName = 'ComponentWrapper';

export const LivePreview: React.FC<LivePreviewProps> = memo(({
  section,
  isVisible = true,
  onToggleVisibility,
  onElementClick,
}) => {
  const [viewportMode, setViewportMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const { content, triggerUpdate } = useAdminContentData();

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

  // Memoized component renderer to prevent unnecessary re-renders
  const renderLivePreview = useMemo(() => {
    try {
      switch (section) {
        case "header":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <Header />
            </ComponentWrapper>
          );
          
        case "hero":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <Hero />
            </ComponentWrapper>
          );
          
        case "features":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <Features />
            </ComponentWrapper>
          );
          
        case "mobile-download":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <MobileDownload />
            </ComponentWrapper>
          );
          
        case "faq":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <FAQ />
            </ComponentWrapper>
          );
          
        case "about-arpi":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <AboutARPI />
            </ComponentWrapper>
          );
          
        case "footer":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <Footer />
            </ComponentWrapper>
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
  }, [section, content, onElementClick]); // Re-render when content or onElementClick changes

  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Live Preview</h3>
          <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
            Interactive
          </div>
          {onElementClick && (
            <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>Click to Edit</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Manual Refresh Button */}
          <button
            onClick={triggerUpdate}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
            title="Refresh preview"
          >
            <RefreshCw className="w-3 h-3" />
          </button>

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

      {/* Live Preview Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Preview Overlay */}
        <div className="relative">
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm z-10">
            Live Preview
          </div>
          {onElementClick && (
            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm z-10 flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>Click to Edit</span>
            </div>
          )}
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
            {/* LIVE Content from Landing Page Components */}
            <div className="relative admin-preview-container">
              {renderLivePreview}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <span>
            🔴 Live preview from actual landing page components
          </span>
          <span className="font-medium">
            {onElementClick ? 'Click elements to edit them' : 'Real-time content updates'}
          </span>
        </div>
      </div>

      {/* Admin Preview Styles - Enable interactions for editing */}
      <style jsx global>{`
        .admin-preview-container {
          /* Reduce animations in admin preview for better performance */
          * {
            animation-duration: 0.2s !important;
            animation-delay: 0s !important;
            transition-duration: 0.2s !important;
            transition-delay: 0s !important;
          }
          
          /* Enable pointer events for interactive editing */
          pointer-events: auto;
        }
        
        .admin-preview-wrapper {
          /* Ensure proper scaling */
          transform-origin: top left;
          width: 100%;
          overflow: hidden;
          /* Enable interactions for editing */
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
});

LivePreview.displayName = 'LivePreview';