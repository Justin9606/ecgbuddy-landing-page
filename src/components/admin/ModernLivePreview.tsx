"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Eye, 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw, 
  Maximize2,
  Target,
  MousePointer,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";

// Import ACTUAL landing page components
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MobileDownload from "@/components/sections/MobileDownload";
import FAQ from "@/components/sections/FAQ";
import AboutARPI from "@/components/sections/AboutARPI";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ModernLivePreviewProps {
  section: AdminSection;
  content: any;
  onElementClick?: (elementPath: string, elementType: string) => void;
}

export const ModernLivePreview: React.FC<ModernLivePreviewProps> = memo(({
  section,
  content,
  onElementClick,
}) => {
  const [viewportMode, setViewportMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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

  const renderPreviewContent = useMemo(() => {
    try {
      switch (section) {
        case "header":
          return (
            <div className="min-h-screen bg-white">
              <Header onElementClick={onElementClick} />
              <div className="px-6 py-12">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Header Preview</h2>
                  <p className="text-gray-600">This shows how your header will appear on the live site</p>
                </div>
              </div>
            </div>
          );
          
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
          return (
            <div className="min-h-screen bg-white flex flex-col">
              <div className="flex-1"></div>
              <Footer onElementClick={onElementClick} />
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
  }, [section, content, onElementClick]);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Eye className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Live Preview</h3>
            <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              Real-time
            </div>
            {onElementClick && (
              <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span>Click to Edit</span>
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
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
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

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Refresh */}
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh preview"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden p-4">
        <motion.div
          className="h-full bg-white rounded-lg shadow-sm overflow-hidden"
          layout
          transition={{ duration: 0.3 }}
        >
          <div className="h-full flex justify-center">
            <div 
              className="h-full overflow-y-auto transition-all duration-300"
              style={{ 
                width: getViewportWidth(),
                maxWidth: "100%",
              }}
            >
              {/* Live Preview Content */}
              <div className="admin-preview-container">
                {renderPreviewContent}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preview Info */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live preview from actual components</span>
          </span>
          <span className="font-medium">
            {onElementClick ? 'Click elements to edit them' : 'Real-time updates'}
          </span>
        </div>
      </div>

      {/* Enhanced Admin Preview Styles */}
      <style jsx global>{`
        .admin-preview-container {
          pointer-events: auto;
          overflow: visible;
        }
        
        .admin-preview-container header {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
        }

        .admin-preview-container .absolute {
          position: absolute !important;
          z-index: 9999 !important;
        }

        .admin-preview-container .fixed {
          position: relative !important;
        }
      `}</style>
    </div>
  );
});

ModernLivePreview.displayName = 'ModernLivePreview';