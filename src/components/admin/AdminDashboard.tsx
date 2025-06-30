"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { ContentEditor } from "./ContentEditor";
import { SiteContent } from "@/lib/admin/content-types";
import { loadContent, saveContent } from "@/lib/admin/storage";

export type ContentSection = 'hero' | 'features' | 'testimonials' | 'faq' | 'about' | 'contact';

export const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ContentSection>('hero');
  const [content, setContent] = useState<SiteContent>(loadContent());

  const handleContentChange = (section: ContentSection, newContent: any) => {
    const updatedContent = {
      ...content,
      [section]: newContent
    };
    setContent(updatedContent);
    saveContent(updatedContent);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <ContentEditor
          section={activeSection}
          content={content[activeSection]}
          onContentChange={(newContent) => handleContentChange(activeSection, newContent)}
        />
      </div>
    </div>
  );
};