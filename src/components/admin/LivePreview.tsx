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
            <div className="min-h-screen bg-white relative">
              {/* Header with proper z-index and positioning */}
              <div className="relative z-50">
                <ComponentWrapper onElementClick={onElementClick}>
                  <div className="bg-white border-b border-gray-200 shadow-sm">
                    <Header onElementClick={onElementClick} />
                  </div>
                </ComponentWrapper>
              </div>
              
              {/* Content below header to show context */}
              <div className="px-6 py-12">
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
    <div className="h-full flex flex-col bg-white">
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

      {/* Live Preview Container - Removed extra padding and spacing */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        <div className="h-full flex items-start justify-center">
          <div 
            className={`bg-white shadow-lg overflow-hidden transition-all duration-300 ${
              isFullscreen ? 'w-full h-full' : 'rounded-lg mt-2 mx-2 h-[calc(100%-1rem)]'
            }`}
            style={{ 
              width: isFullscreen ? '100%' : getViewportWidth(),
              maxWidth: isFullscreen ? '100%' : "100%",
            }}
          >
            {/* LIVE Content from Landing Page Components */}
            <div className="relative admin-preview-container h-full overflow-y-auto">
              {renderLivePreview}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Preview Info */}
      <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-3 py-1">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            🔴 Live preview
          </span>
          <span className="font-medium">
            {viewportMode.charAt(0).toUpperCase() + viewportMode.slice(1)} • {onElementClick ? 'Interactive' : 'Static'}
          </span>
        </div>
      </div>

      {/* Enhanced Admin Preview Styles */}
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
          overflow: visible; /* Changed from hidden to visible for dropdowns */
          /* Enable interactions for editing */
          pointer-events: auto;
        }

        /* Override fixed positioning for header in preview */
        .admin-preview-container header {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          z-index: 50 !important; /* High z-index for dropdowns */
        }

        /* Ensure header content is visible and dropdowns work */
        .admin-preview-container .fixed {
          position: relative !important;
        }

        /* Ensure dropdowns are visible in preview */
        .admin-preview-container [class*="dropdown"],
        .admin-preview-container [class*="menu"] {
          z-index: 9999 !important;
          position: absolute !important;
        }

        /* Make sure mega menus are visible */
        .admin-preview-container .absolute {
          z-index: 9999 !important;
        }

        /* Ensure proper stacking for interactive elements */
        .admin-preview-container .group:hover > div[class*="absolute"] {
          z-index: 9999 !important;
        }
      `}</style>
    </div>
  );
});

LivePreview.displayName = 'LivePreview';