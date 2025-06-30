"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Eye, Save, Maximize2, Minimize2 } from "lucide-react";
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
  const [previewScale, setPreviewScale] = useState(0.8);

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

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Exit Editor</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Scale:</span>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.1"
                value={previewScale}
                onChange={(e) => setPreviewScale(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600">{Math.round(previewScale * 100)}%</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onPreview}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 overflow-auto bg-gray-200 p-4">
          <div 
            className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden origin-top transition-transform duration-300"
            style={{ 
              transform: `scale(${previewScale})`,
              width: `${100 / previewScale}%`,
              maxWidth: '1200px'
            }}
          >
            {/* Editable Header */}
            <EditableContentWrapper
              contentPath="header"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "header"}
              label="Header"
              type="section"
            >
              <Header />
            </EditableContentWrapper>

            {/* Editable Hero */}
            <EditableContentWrapper
              contentPath="hero"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "hero"}
              label="Hero Section"
              type="section"
            >
              <div className="relative">
                {/* Main Heading */}
                <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10">
                  <EditableContentWrapper
                    contentPath="hero.mainHeading.line1"
                    onSelect={handleElementSelect}
                    isSelected={selectedPath === "hero.mainHeading.line1"}
                    label="Main Heading Line 1"
                    type="text"
                  >
                    <div className="pointer-events-none">
                      <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                        {siteContent.hero.mainHeading.line1}
                      </span>
                    </div>
                  </EditableContentWrapper>
                </div>

                <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-10">
                  <EditableContentWrapper
                    contentPath="hero.mainHeading.line2"
                    onSelect={handleElementSelect}
                    isSelected={selectedPath === "hero.mainHeading.line2"}
                    label="Main Heading Line 2"
                    type="text"
                  >
                    <div className="pointer-events-none">
                      <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                        {siteContent.hero.mainHeading.line2}
                      </span>
                    </div>
                  </EditableContentWrapper>
                </div>

                <div className="absolute top-80 left-1/2 transform -translate-x-1/2 z-10 max-w-4xl">
                  <EditableContentWrapper
                    contentPath="hero.subtitle"
                    onSelect={handleElementSelect}
                    isSelected={selectedPath === "hero.subtitle"}
                    label="Subtitle"
                    type="text"
                  >
                    <div className="pointer-events-none">
                      <p className="text-xl md:text-2xl text-slate-600 text-center leading-relaxed font-light">
                        {siteContent.hero.subtitle}
                      </p>
                    </div>
                  </EditableContentWrapper>
                </div>

                <Hero />
              </div>
            </EditableContentWrapper>

            {/* Editable Features */}
            <EditableContentWrapper
              contentPath="features"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "features"}
              label="Features Section"
              type="section"
            >
              <Features />
            </EditableContentWrapper>

            {/* Editable Mobile Download */}
            <EditableContentWrapper
              contentPath="mobileDownload"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "mobileDownload"}
              label="Mobile Download Section"
              type="section"
            >
              <MobileDownload />
            </EditableContentWrapper>

            {/* Editable FAQ */}
            <EditableContentWrapper
              contentPath="faq"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "faq"}
              label="FAQ Section"
              type="section"
            >
              <FAQ />
            </EditableContentWrapper>

            {/* Editable About ARPI */}
            <EditableContentWrapper
              contentPath="aboutARPI"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "aboutARPI"}
              label="About ARPI Section"
              type="section"
            >
              <AboutARPI />
            </EditableContentWrapper>

            {/* Editable Footer */}
            <EditableContentWrapper
              contentPath="footer"
              onSelect={handleElementSelect}
              isSelected={selectedPath === "footer"}
              label="Footer"
              type="section"
            >
              <Footer />
            </EditableContentWrapper>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Live Editor */}
      <AnimatePresence>
        {selectedPath && (
          <motion.div
            className={`bg-white border-l border-gray-200 ${
              isEditorExpanded ? "w-96" : "w-80"
            } transition-all duration-300`}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Live Editor</h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setIsEditorExpanded(!isEditorExpanded)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {isEditorExpanded ? (
                      <Minimize2 className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Maximize2 className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={handleCloseEditor}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
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