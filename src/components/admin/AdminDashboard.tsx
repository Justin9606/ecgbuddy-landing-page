"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ModernSidebar } from "./ModernSidebar";
import { ModernHeader } from "./ModernHeader";
import { ModernContentEditor } from "./ModernContentEditor";
import { LivePreview } from "./LivePreview";
import { DashboardHome } from "./sections/DashboardHome";
import { PageBuilder } from "./sections/PageBuilder";
import { MediaLibrary } from "./sections/MediaLibrary";
import { Settings } from "./sections/Settings";
import { Users } from "./sections/Users";
import { ToastProvider } from "./Toast";
import { SiteContent } from "@/lib/admin/types";
import { loadSiteContent, saveSiteContent, getDefaultSiteContent, savePreviewDraft } from "@/lib/admin/storage";

export type AdminSection = 
  | "dashboard" 
  | "header" 
  | "hero" 
  | "features" 
  | "mobile-download" 
  | "faq" 
  | "about-arpi" 
  | "footer"
  | "page-builder"
  | "media-library"
  | "settings"
  | "users";

export const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(() => getDefaultSiteContent());
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const savedContent = loadSiteContent();
        if (savedContent) {
          setSiteContent(savedContent);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setSaveError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleContentChange = useCallback((section: AdminSection, newSectionContent: any) => {
    setSiteContent(prevContent => {
      const updatedContent = {
        ...prevContent,
        [section]: newSectionContent
      };
      
      // Auto-save to localStorage
      try {
        saveSiteContent(updatedContent);
        setLastSaved(new Date());
        setSaveError(null);
      } catch (error) {
        console.error('Auto-save failed:', error);
        setSaveError('Auto-save failed');
      }
      
      return updatedContent;
    });
  }, []);

  const handleSaveAllChanges = useCallback(async () => {
    try {
      setIsLoading(true);
      setSaveError(null);
      
      saveSiteContent(siteContent);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveError('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  }, [siteContent]);

  const handlePreview = useCallback(() => {
    try {
      savePreviewDraft(siteContent);
      window.open('/', '_blank');
    } catch (error) {
      console.error('Error creating preview:', error);
      setSaveError('Failed to create preview');
    }
  }, [siteContent]);

  const handleElementClick = useCallback((elementPath: string, elementType: string) => {
    console.log('Element clicked:', elementPath, elementType);
    setHighlightedElement(elementPath);
    
    // This will be used to scroll to and highlight the corresponding field in the editor
  }, []);

  const currentSectionContent = useMemo(() => {
    return siteContent[activeSection as keyof SiteContent];
  }, [siteContent, activeSection]);

  const isContentSection = !['dashboard', 'page-builder', 'media-library', 'settings', 'users'].includes(activeSection);

  return (
    <ToastProvider>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Modern Sidebar */}
        <ModernSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-0'}`}>
          {/* Modern Header */}
          <ModernHeader 
            activeSection={activeSection}
            onSave={handleSaveAllChanges}
            onPreview={handlePreview}
            lastSaved={lastSaved}
            isLoading={isLoading}
            saveError={saveError}
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="h-full"
              >
                {activeSection === "dashboard" && (
                  <div className="h-full overflow-y-auto p-6">
                    <DashboardHome onSectionChange={setActiveSection} />
                  </div>
                )}

                {activeSection === "page-builder" && (
                  <div className="h-full">
                    <PageBuilder />
                  </div>
                )}

                {activeSection === "media-library" && (
                  <div className="h-full overflow-y-auto p-6">
                    <MediaLibrary />
                  </div>
                )}

                {activeSection === "settings" && (
                  <div className="h-full overflow-y-auto p-6">
                    <Settings />
                  </div>
                )}

                {activeSection === "users" && (
                  <div className="h-full overflow-y-auto p-6">
                    <Users />
                  </div>
                )}

                {isContentSection && (
                  <div className="h-full">
                    {showPreview ? (
                      <PanelGroup direction="horizontal" className="h-full">
                        {/* Live Preview Panel */}
                        <Panel defaultSize={50} minSize={30} maxSize={70}>
                          <div className="h-full overflow-hidden">
                            <LivePreview
                              section={activeSection}
                              isVisible={true}
                              onElementClick={handleElementClick}
                            />
                          </div>
                        </Panel>

                        {/* Resize Handle */}
                        <PanelResizeHandle className="resize-handle w-2" />

                        {/* Content Editor Panel */}
                        <Panel defaultSize={50} minSize={30} maxSize={70}>
                          <div className="h-full overflow-hidden">
                            <ModernContentEditor
                              section={activeSection}
                              content={currentSectionContent}
                              onContentChange={(newContent) => handleContentChange(activeSection, newContent)}
                              onSave={handleSaveAllChanges}
                              isLoading={isLoading}
                              highlightedElement={highlightedElement}
                            />
                          </div>
                        </Panel>
                      </PanelGroup>
                    ) : (
                      <ModernContentEditor
                        section={activeSection}
                        content={currentSectionContent}
                        onContentChange={(newContent) => handleContentChange(activeSection, newContent)}
                        onSave={handleSaveAllChanges}
                        isLoading={isLoading}
                        highlightedElement={highlightedElement}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};