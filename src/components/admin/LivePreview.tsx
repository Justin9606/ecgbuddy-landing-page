"use client";

import React, { memo, useMemo } from "react";
import { Eye, EyeOff, Monitor, Smartphone, Tablet, RefreshCw, Target, Maximize2, Minimize2 } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = React.useState(false);
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
            <div className="min-h-screen">
              {/* Header with proper z-index and positioning */}
              <div className="relative">
                <ComponentWrapper onElementClick={onElementClick}>
                  <Header onElementClick={onElementClick} />
                </ComponentWrapper>
              </div>
              
              {/* Content below header to show context */}
              <div className="px-6 py-12 bg-white">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Header Preview</h2>
                    <p className="text-gray-600 mb-6">This shows how your header will appear on the live site</p>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-500">Page content would appear below the header...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
          
        case "hero":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <Hero onElementClick={onElementClick} />
            </ComponentWrapper>
          );
          
        case "features":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <Features onElementClick={onElementClick} />
            </ComponentWrapper>
          );
          
        case "mobile-download":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <MobileDownload onElementClick={onElementClick} />
            </ComponentWrapper>
          );
          
        case "faq":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <FAQ onElementClick={onElementClick} />
            </ComponentWrapper>
          );
          
        case "about-arpi":
          return (
            <ComponentWrapper onElementClick={onElementClick}>
              <AboutARPI onElementClick={onElementClick} />
            </ComponentWrapper>
          );
          
        case "footer":
          return (
            <div className="min-h-screen bg-white flex flex-col">
              <div className="flex-1"></div>
              <ComponentWrapper onElementClick={onElementClick}>
                <Footer onElementClick={onElementClick} />
              </ComponentWrapper>
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
  }, [section, content, onElementClick]); // Re-render when content or onElementClick changes

  if (!isVisible) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Compact Preview Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-3 h-3 text-gray-500" />
            <h3 className="text-xs font-semibold text-gray-900">Live Preview</h3>
            <div className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
              Interactive
            </div>
            {onElementClick && (
              <div className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-medium flex items-center space-x-1">
                <Target className="w-2 h-2" />
                <span>Click to Edit</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Manual Refresh Button */}
            <button
              onClick={triggerUpdate}
              className="p-1 text-xs text-gray-500 hover:text-gray-700 transition-colors rounded hover:bg-gray-100"
              title="Refresh preview"
            >
              <RefreshCw className="w-3 h-3" />
            </button>

            {/* Viewport Selector */}
            <div className="flex items-center bg-gray-100 rounded p-0.5">
              {viewportOptions.map((viewport) => (
                <button
                  key={viewport.id}
                  onClick={() => setViewportMode(viewport.id as any)}
                  className={`flex items-center px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                    viewportMode === viewport.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title={viewport.name}
                >
                  <viewport.icon className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 text-xs text-gray-500 hover:text-gray-700 transition-colors rounded hover:bg-gray-100"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
            
            {onToggleVisibility && (
              <button
                onClick={onToggleVisibility}
                className="p-1 text-xs text-gray-500 hover:text-gray-700 transition-colors rounded hover:bg-gray-100"
                title="Hide preview"
              >
                <EyeOff className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview Container - Clean and minimal */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full">
          <div 
            className={`h-full overflow-y-auto transition-all duration-300 ${
              isFullscreen ? 'w-full' : ''
            }`}
            style={{ 
              width: isFullscreen ? '100%' : getViewportWidth(),
              maxWidth: "100%",
            }}
          >
            {/* PURE Landing Page Content - NO extra styling */}
            <div className="admin-preview-container">
              {renderLivePreview}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Admin Preview Styles */}
      <style jsx global>{`
        /* Clean preview container - no interference with original styles */
        .admin-preview-container {
          /* Enable pointer events for interactive editing */
          pointer-events: auto;
          /* Ensure proper overflow for dropdowns */
          overflow: visible;
        }
        
        .admin-preview-wrapper {
          /* Ensure proper scaling */
          transform-origin: top left;
          width: 100%;
          /* Enable interactions for editing */
          pointer-events: auto;
          /* Allow overflow for dropdowns */
          overflow: visible;
        }

        /* Fix header positioning in preview */
        .admin-preview-container header {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
        }

        /* Ensure dropdowns work properly in preview */
        .admin-preview-container .absolute {
          position: absolute !important;
          z-index: 9999 !important;
        }

        /* Fix mega menu visibility */
        .admin-preview-container [class*="dropdown"],
        .admin-preview-container [class*="menu"] {
          z-index: 9999 !important;
        }

        /* Ensure hover states work */
        .admin-preview-container .group:hover > div[class*="absolute"] {
          z-index: 9999 !important;
        }

        /* Remove any fixed positioning that might interfere */
        .admin-preview-container .fixed {
          position: relative !important;
        }
      `}</style>
    </div>
  );
});

LivePreview.displayName = 'LivePreview';