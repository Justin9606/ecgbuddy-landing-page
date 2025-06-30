"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Settings, 
  Eye, 
  Save, 
  Maximize2, 
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Grid,
  Layers
} from "lucide-react";
import { SiteContent } from "@/lib/admin/types";
import { LiveEditor } from "./LiveEditor";
import { EditableContentWrapper } from "./EditableContentWrapper";

// Import your existing components
import { Header, Footer } from "@/components/layout";
import { Hero, Features, MobileDownload, FAQ, AboutARPI } from "@/components/sections";

interface LiveEditingInterfaceProps {
  siteContent: SiteContent;
  onContentChange: (path: string, value: any) => void;
  onSave: () => void;
  onPreview: () => void;
  onClose: () => void;
}

export const LiveEditingInterface: React.FC<LiveEditingInterfaceProps> = ({
  siteContent,
  onContentChange,
  onSave,
  onPreview,
  onClose,
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.7);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showGrid, setShowGrid] = useState(false);

  // Device dimensions
  const deviceDimensions = {
    desktop: { width: "100%", maxWidth: "1200px" },
    tablet: { width: "768px", maxWidth: "768px" },
    mobile: { width: "375px", maxWidth: "375px" }
  };

  // Handle content change with path
  const handleContentChange = (path: string, value: any) => {
    onContentChange(path, value);
  };

  // Handle element selection
  const handleElementSelect = (path: string) => {
    setSelectedPath(path);
  };

  // Close editor
  const handleCloseEditor = () => {
    setSelectedPath(null);
  };

  // Zoom controls
  const zoomIn = () => setPreviewScale(Math.min(1, previewScale + 0.1));
  const zoomOut = () => setPreviewScale(Math.max(0.3, previewScale - 0.1));
  const resetZoom = () => setPreviewScale(0.7);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center space-x-6">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Exit Live Editor</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            {/* Device Mode Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {[
                { id: "desktop", icon: Monitor, label: "Desktop" },
                { id: "tablet", icon: Tablet, label: "Tablet" },
                { id: "mobile", icon: Smartphone, label: "Mobile" }
              ].map((device) => (
                <button
                  key={device.id}
                  onClick={() => setDeviceMode(device.id as any)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    deviceMode === device.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <device.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{device.label}</span>
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-300" />
            
            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-2 min-w-[120px]">
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.05"
                  value={previewScale}
                  onChange={(e) => setPreviewScale(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 font-mono min-w-[45px]">
                  {Math.round(previewScale * 100)}%
                </span>
              </div>
              
              <button
                onClick={zoomIn}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
              
              <button
                onClick={resetZoom}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded transition-colors ${
                showGrid ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
              title="Toggle Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              {selectedPath ? (
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {selectedPath}
                </span>
              ) : (
                "Click any element to edit"
              )}
            </div>

            <div className="h-6 w-px bg-gray-300" />

            <button
              onClick={onPreview}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 overflow-auto bg-gray-200 p-6 relative">
          {/* Grid Overlay */}
          {showGrid && (
            <div 
              className="absolute inset-0 pointer-events-none z-10 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px"
              }}
            />
          )}

          <div 
            className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden origin-top transition-all duration-300 relative"
            style={{ 
              transform: `scale(${previewScale})`,
              width: deviceDimensions[deviceMode].width,
              maxWidth: deviceDimensions[deviceMode].maxWidth,
              minHeight: "100vh"
            }}
          >
            {/* Enhanced Editable Components */}
            
            {/* Header Section */}
            <EditableContentWrapper
              contentPath="header"
              onSelect={handleElementSelect}
              isSelected={selectedPath?.startsWith("header")}
              label="Website Header"
              type="section"
              className="relative z-20"
            >
              <div className="relative">
                <Header />
                
                {/* Nested editable elements for header */}
                <div className="absolute top-4 left-6 z-30">
                  <EditableContentWrapper
                    contentPath="header.logoText"
                    onSelect={handleElementSelect}
                    isSelected={selectedPath === "header.logoText"}
                    label="Logo Text"
                    type="text"
                  >
                    <div className="pointer-events-none">
                      <span className="text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                        {siteContent.header.logoText}
                      </span>
                    </div>
                  </EditableContentWrapper>
                </div>
              </div>
            </EditableContentWrapper>

            {/* Hero Section with Detailed Editing */}
            <EditableContentWrapper
              contentPath="hero"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "hero"}
              label="Hero Section"
              type="section"
              className="relative"
            >
              <div className="relative min-h-screen">
                <Hero />
                
                {/* Overlay editable elements */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Main Heading Line 1 */}
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                    <EditableContentWrapper
                      contentPath="hero.mainHeading.line1"
                      onSelect={handleElementSelect}
                      isSelected={selectedPath === "hero.mainHeading.line1"}
                      label="Main Heading - Line 1"
                      type="heading"
                    >
                      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent text-center">
                        {siteContent.hero.mainHeading.line1}
                      </h1>
                    </EditableContentWrapper>
                  </div>

                  {/* Main Heading Line 2 */}
                  <div className="absolute top-48 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                    <EditableContentWrapper
                      contentPath="hero.mainHeading.line2"
                      onSelect={handleElementSelect}
                      isSelected={selectedPath === "hero.mainHeading.line2"}
                      label="Main Heading - Line 2"
                      type="heading"
                    >
                      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent text-center">
                        {siteContent.hero.mainHeading.line2}
                      </h1>
                    </EditableContentWrapper>
                  </div>

                  {/* Subtitle */}
                  <div className="absolute top-80 left-1/2 transform -translate-x-1/2 max-w-4xl pointer-events-auto">
                    <EditableContentWrapper
                      contentPath="hero.subtitle"
                      onSelect={handleElementSelect}
                      isSelected={selectedPath === "hero.subtitle"}
                      label="Hero Subtitle"
                      type="paragraph"
                    >
                      <p className="text-xl md:text-2xl text-slate-600 text-center leading-relaxed font-light px-6">
                        {siteContent.hero.subtitle}
                      </p>
                    </EditableContentWrapper>
                  </div>
                </div>
              </div>
            </EditableContentWrapper>

            {/* Features Section */}
            <EditableContentWrapper
              contentPath="features"
              onSelect={handleElementSelect}
              isSelected={selectedPath?.startsWith("features")}
              label="Features Section"
              type="section"
            >
              <div className="relative">
                <Features />
                
                {/* Features section header overlay */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 max-w-3xl pointer-events-auto z-10">
                  <EditableContentWrapper
                    contentPath="features.sectionHeader.title"
                    onSelect={handleElementSelect}
                    isSelected={selectedPath === "features.sectionHeader.title"}
                    label="Features Section Title"
                    type="heading"
                  >
                    <h2 className="text-5xl md:text-6xl font-bold text-center leading-tight">
                      <span className="block text-slate-900 mb-2">
                        Professional-grade tools
                      </span>
                      <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        for modern healthcare
                      </span>
                    </h2>
                  </EditableContentWrapper>
                </div>
              </div>
            </EditableContentWrapper>

            {/* Mobile Download Section */}
            <EditableContentWrapper
              contentPath="mobileDownload"
              onSelect={handleElementSelect}
              isSelected={selectedPath?.startsWith("mobileDownload")}
              label="Mobile Download Section"
              type="section"
            >
              <MobileDownload />
            </EditableContentWrapper>

            {/* FAQ Section */}
            <EditableContentWrapper
              contentPath="faq"
              onSelect={handleElementSelect}
              isSelected={selectedPath?.startsWith("faq")}
              label="FAQ Section"
              type="section"
            >
              <FAQ />
            </EditableContentWrapper>

            {/* About ARPI Section */}
            <EditableContentWrapper
              contentPath="aboutARPI"
              onSelect={handleElementSelect}
              isSelected={selectedPath?.startsWith("aboutARPI")}
              label="About ARPI Section"
              type="section"
            >
              <AboutARPI />
            </EditableContentWrapper>

            {/* Footer */}
            <EditableContentWrapper
              contentPath="footer"
              onSelect={handleElementSelect}
              isSelected={selectedPath?.startsWith("footer")}
              label="Website Footer"
              type="section"
            >
              <Footer />
            </EditableContentWrapper>
          </div>
        </div>
      </div>

      {/* Enhanced Right Sidebar - Live Editor */}
      <AnimatePresence>
        {selectedPath && (
          <motion.div
            className={`bg-white border-l border-gray-200 shadow-xl ${
              isEditorExpanded ? "w-96" : "w-80"
            } transition-all duration-300`}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Live Editor</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setIsEditorExpanded(!isEditorExpanded)}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title={isEditorExpanded ? "Collapse" : "Expand"}
                  >
                    {isEditorExpanded ? (
                      <Minimize2 className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={handleCloseEditor}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title="Close Editor"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <LiveEditor
                selectedPath={selectedPath}
                siteContent={siteContent}
                onContentChange={handleContentChange}
                onSave={onSave}
                onPreview={onPreview}
                onClose={handleCloseEditor}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};