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
            <div className="min-h-screen bg-white relative">
              {/* Override the fixed positioning for preview */}
              <div className="relative z-10">
                <ComponentWrapper onElementClick={onElementClick}>
                  <div className="relative">
                    {/* Remove fixed positioning and make it static for preview */}
                    <div className="bg-white border-b border-gray-200 shadow-sm">
                      <Header onElementClick={onElementClick} />
                    </div>
                  </div>
                </ComponentWrapper>
              </div>
              
              {/* Add some content below header to show context */}
              <div className="px-6 py-20">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Header Preview</h2>
                    <p className="text-gray-600 mb-8">This shows how your header will appear on the live site</p>
                    <div className="bg-gray-50 rounded-lg p-8">
                      <p className="text-gray-500">Page content would appear below the header...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
          
        case "hero":
          return (
            <div className="min-h-screen bg-white">
              <ComponentWrapper onElementClick={onElementClick}>
                <Hero onElementClick={onElementClick} />
              </ComponentWrapper>
            </div>
          );
          
        case "features":
          return (
            <div className="min-h-screen bg-white">
              <ComponentWrapper onElementClick={onElementClick}>
                <Features />
              </ComponentWrapper>
            </div>
          );
          
        case "mobile-download":
          return (
            <div className="min-h-screen bg-white">
              <ComponentWrapper onElementClick={onElementClick}>
                <MobileDownload />
              </ComponentWrapper>
            </div>
          );
          
        case "faq":
          return (
            <div className="min-h-screen bg-white">
              <ComponentWrapper onElementClick={onElementClick}>
                <FAQ />
              </ComponentWrapper>
            </div>
          );
          
        case "about-arpi":
          return (
            <div className="min-h-screen bg-white">
              <ComponentWrapper onElementClick={onElementClick}>
                <AboutARPI />
              </ComponentWrapper>
            </div>
          );
          
        case "footer":
          return (
            <div className="min-h-screen bg-white flex flex-col">
              <div className="flex-1"></div>
              <ComponentWrapper onElementClick={onElementClick}>
                <Footer />
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
      {/* Preview Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
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
      </div>

      {/* Live Preview Container */}
      <div className="flex-1 bg-gray-100 overflow-hidden">
        <div className="h-full flex items-center justify-center p-4">
          <div 
            className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 h-full"
            style={{ 
              width: getViewportWidth(),
              maxWidth: "100%",
              minHeight: "600px"
            }}
          >
            {/* LIVE Content from Landing Page Components */}
            <div className="relative admin-preview-container h-full overflow-y-auto">
              {renderLivePreview}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 p-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            🔴 Live preview from actual landing page components
          </span>
          <span className="font-medium">
            {onElementClick ? 'Click elements to edit them' : 'Real-time content updates'}
          </span>
        </div>
      </div>

      {/* Admin Preview Styles - Override fixed positioning for header preview */}
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

        /* Override fixed positioning for header in preview */
        .admin-preview-container header {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          z-index: auto !important;
        }

        /* Ensure header content is visible */
        .admin-preview-container .fixed {
          position: relative !important;
        }
      `}</style>
    </div>
  );
});

LivePreview.displayName = 'LivePreview';