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
          return <Header onElementClick={onElementClick} />;
          
        case "hero":
          return <Hero onElementClick={onElementClick} />;
          
        case "features":
          return <Features onElementClick={onElementClick} />;
          
        case "mobile-download":
          return <MobileDownload onElementClick={onElementClick} />;
          
        case "faq":
          return <FAQ onElementClick={onElementClick} />;
          
        case "about-arpi":
          return <AboutARPI onElementClick={onElementClick} />;
          
        case "footer":
          return <Footer onElementClick={onElementClick} />;
          
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
  }, [section, content, onElementClick]);

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

      {/* Live Preview Container */}
      <div className="flex-1 overflow-auto">
        <div 
          className={`h-full overflow-y-auto transition-all duration-300 mx-auto ${
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
  );
});

LivePreview.displayName = 'LivePreview';