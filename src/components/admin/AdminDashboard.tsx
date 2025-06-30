"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardHome } from "./sections/DashboardHome";
import { ContentEditor } from "./sections/ContentEditor";
import { PageBuilder } from "./sections/PageBuilder";
import { MediaLibrary } from "./sections/MediaLibrary";
import { Settings } from "./sections/Settings";
import { Users } from "./sections/Users";
import { LiveEditingDashboard } from "./sections/LiveEditingDashboard";
import { LiveEditingInterface } from "./LiveEditingInterface";
import { SiteContent } from "@/lib/admin/types";
import { loadSiteContent, saveSiteContent, getDefaultSiteContent, savePreviewDraft } from "@/lib/admin/storage";

export type AdminSection = 
  | "dashboard" 
  | "live-editor"
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
  const [siteContent, setSiteContent] = useState<SiteContent>(getDefaultSiteContent());
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isLiveEditing, setIsLiveEditing] = useState(false);

  // Load content from localStorage on mount
  useEffect(() => {
    const loadContent = () => {
      try {
        const savedContent = loadSiteContent();
        if (savedContent) {
          setSiteContent(savedContent);
          console.log('Loaded existing content from localStorage');
        } else {
          console.log('No existing content found, using defaults');
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Handle content changes from ContentEditor
  const handleContentChange = (section: AdminSection, newSectionContent: any) => {
    setSiteContent(prevContent => {
      const updatedContent = {
        ...prevContent,
        [section]: newSectionContent
      };
      
      // Auto-save to localStorage after a short delay
      setTimeout(() => {
        saveSiteContent(updatedContent);
        setLastSaved(new Date());
      }, 500);
      
      return updatedContent;
    });
  };

  // Handle live editing content changes
  const handleLiveContentChange = (path: string, value: any) => {
    setSiteContent(prevContent => {
      const pathArray = path.split('.');
      const updatedContent = { ...prevContent };
      let current: any = updatedContent;
      
      // Navigate to the parent of the field to be changed
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      
      // Set the value
      current[pathArray[pathArray.length - 1]] = value;
      
      // Auto-save to localStorage after a short delay
      setTimeout(() => {
        saveSiteContent(updatedContent);
        setLastSaved(new Date());
      }, 500);
      
      return updatedContent;
    });
  };

  // Handle manual save
  const handleSaveAllChanges = () => {
    try {
      saveSiteContent(siteContent);
      setLastSaved(new Date());
      console.log('All changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Handle preview
  const handlePreview = () => {
    try {
      savePreviewDraft(siteContent);
      // Open preview in new tab
      window.open('/', '_blank');
    } catch (error) {
      console.error('Error creating preview:', error);
    }
  };

  // Handle section change from dashboard quick actions
  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
  };

  // Start live editing
  const handleStartLiveEditing = () => {
    setIsLiveEditing(true);
  };

  // Exit live editing
  const handleExitLiveEditing = () => {
    setIsLiveEditing(false);
  };

  // If in live editing mode, show the live editing interface
  if (isLiveEditing) {
    return (
      <LiveEditingInterface
        siteContent={siteContent}
        onContentChange={handleLiveContentChange}
        onSave={handleSaveAllChanges}
        onPreview={handlePreview}
        onClose={handleExitLiveEditing}
      />
    );
  }

  const renderContent = () => {
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
      case "live-editor":
        return <LiveEditingDashboard onStartLiveEditing={handleStartLiveEditing} />;
      case "page-builder":
        return <PageBuilder />;
      case "media-library":
        return <MediaLibrary />;
      case "settings":
        return <Settings />;
      case "users":
        return <Users />;
      default:
        // Get the relevant section content
        const sectionContent = siteContent[activeSection as keyof SiteContent];
        return (
          <ContentEditor 
            section={activeSection}
            initialContent={sectionContent}
            onContentChange={(newContent) => handleContentChange(activeSection, newContent)}
            onSave={handleSaveAllChanges}
            onPreview={handlePreview}
            lastSaved={lastSaved}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        {/* Header */}
        <AdminHeader 
          activeSection={activeSection}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onSave={handleSaveAllChanges}
          onPreview={handlePreview}
          lastSaved={lastSaved}
        />

        {/* Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};