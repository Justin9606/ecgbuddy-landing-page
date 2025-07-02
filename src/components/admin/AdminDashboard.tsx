"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardHome } from "./sections/DashboardHome";
import { EnhancedContentEditor } from "./EnhancedContentEditor";
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
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const savedContent = loadSiteContent();
        if (savedContent) {
          setSiteContent(savedContent);
          console.log('Loaded existing content from localStorage');
        } else {
          console.log('No existing content found, using defaults');
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

  // Memoized content change handler to prevent unnecessary re-renders
  const handleContentChange = useCallback((section: AdminSection, newSectionContent: any) => {
    setSiteContent(prevContent => {
      const updatedContent = {
        ...prevContent,
        [section]: newSectionContent
      };
      
      // Auto-save to localStorage with debouncing
      const timeoutId = setTimeout(() => {
        try {
          saveSiteContent(updatedContent);
          setLastSaved(new Date());
          setSaveError(null);
        } catch (error) {
          console.error('Auto-save failed:', error);
          setSaveError('Auto-save failed');
        }
      }, 1000); // 1 second debounce
      
      // Clear previous timeout
      return updatedContent;
    });
  }, []);

  // Memoized save handler
  const handleSaveAllChanges = useCallback(async () => {
    try {
      setIsLoading(true);
      setSaveError(null);
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
      saveSiteContent(siteContent);
      setLastSaved(new Date());
      
      console.log('All changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveError('Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  }, [siteContent]);

  // Memoized preview handler
  const handlePreview = useCallback(() => {
    try {
      savePreviewDraft(siteContent);
      // Open preview in new tab
      window.open('/', '_blank');
    } catch (error) {
      console.error('Error creating preview:', error);
      setSaveError('Failed to create preview');
    }
  }, [siteContent]);

  // Memoized section change handler
  const handleSectionChange = useCallback((section: AdminSection) => {
    setActiveSection(section);
  }, []);

  // Memoized content for current section
  const currentSectionContent = useMemo(() => {
    return siteContent[activeSection as keyof SiteContent];
  }, [siteContent, activeSection]);

  // Memoized render function for better performance
  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading content...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return <DashboardHome onSectionChange={handleSectionChange} />;
      case "page-builder":
        return <PageBuilder />;
      case "media-library":
        return <MediaLibrary />;
      case "settings":
        return <Settings />;
      case "users":
        return <Users />;
      default:
        // Content editing sections
        return (
          <EnhancedContentEditor 
            section={activeSection}
            initialContent={currentSectionContent}
            onContentChange={(newContent) => handleContentChange(activeSection, newContent)}
            onSave={handleSaveAllChanges}
            onPreview={handlePreview}
            lastSaved={lastSaved}
          />
        );
    }
  }, [
    isLoading,
    activeSection,
    currentSectionContent,
    handleSectionChange,
    handleContentChange,
    handleSaveAllChanges,
    handlePreview,
    lastSaved
  ]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {/* Header */}
          <AdminHeader 
            activeSection={activeSection}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onSave={handleSaveAllChanges}
            onPreview={handlePreview}
            lastSaved={lastSaved}
            isLoading={isLoading}
            saveError={saveError}
          />

          {/* Content Area */}
          <main className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {renderContent}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};