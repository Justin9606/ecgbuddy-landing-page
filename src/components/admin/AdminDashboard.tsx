"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { DashboardHome } from "./sections/DashboardHome";
import { ContentEditor } from "./sections/ContentEditor";
import { PageBuilder } from "./sections/PageBuilder";
import { MediaLibrary } from "./sections/MediaLibrary";
import { Settings } from "./sections/Settings";
import { Users } from "./sections/Users";

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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "page-builder":
        return <PageBuilder />;
      case "media-library":
        return <MediaLibrary />;
      case "settings":
        return <Settings />;
      case "users":
        return <Users />;
      default:
        return <ContentEditor section={activeSection} />;
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