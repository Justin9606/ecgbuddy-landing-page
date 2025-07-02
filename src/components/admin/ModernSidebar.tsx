"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Layout,
  Heart,
  Sparkles,
  Download,
  HelpCircle,
  Building2,
  FileText,
  Layers,
  Image,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";

interface ModernSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({
  activeSection,
  onSectionChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const menuItems = [
    {
      id: "dashboard" as AdminSection,
      label: "Dashboard",
      icon: Home,
      category: "main",
      color: "blue",
    },
    {
      id: "header" as AdminSection,
      label: "Header",
      icon: Layout,
      category: "content",
      color: "purple",
    },
    {
      id: "hero" as AdminSection,
      label: "Hero",
      icon: Heart,
      category: "content",
      color: "red",
    },
    {
      id: "features" as AdminSection,
      label: "Features",
      icon: Sparkles,
      category: "content",
      color: "yellow",
    },
    {
      id: "mobile-download" as AdminSection,
      label: "Apps",
      icon: Download,
      category: "content",
      color: "green",
    },
    {
      id: "faq" as AdminSection,
      label: "FAQ",
      icon: HelpCircle,
      category: "content",
      color: "indigo",
    },
    {
      id: "about-arpi" as AdminSection,
      label: "About",
      icon: Building2,
      category: "content",
      color: "pink",
    },
    {
      id: "footer" as AdminSection,
      label: "Footer",
      icon: FileText,
      category: "content",
      color: "gray",
    },
    {
      id: "page-builder" as AdminSection,
      label: "Page Builder",
      icon: Layers,
      category: "tools",
      color: "cyan",
    },
    {
      id: "media-library" as AdminSection,
      label: "Media",
      icon: Image,
      category: "tools",
      color: "orange",
    },
    {
      id: "settings" as AdminSection,
      label: "Settings",
      icon: Settings,
      category: "admin",
      color: "slate",
    },
    {
      id: "users" as AdminSection,
      label: "Users",
      icon: Users,
      category: "admin",
      color: "emerald",
    },
  ];

  const categories = [
    { id: "main", label: "Overview" },
    { id: "content", label: "Content" },
    { id: "tools", label: "Tools" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 shadow-sm"
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">ARPI Admin</h1>
              <p className="text-xs text-gray-500">Content Manager</p>
            </div>
          </motion.div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {categories.map((category) => {
          const categoryItems = menuItems.filter(
            (item) => item.category === category.id
          );

          return (
            <div key={category.id} className="mb-6">
              {!isCollapsed && (
                <motion.div
                  className="px-4 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {category.label}
                  </h3>
                </motion.div>
              )}
              <div className="space-y-1 px-3">
                {categoryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      activeSection === item.id
                        ? `bg-${item.color}-50 text-${item.color}-700`
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      activeSection === item.id
                        ? `bg-${item.color}-100`
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}>
                      <item.icon className={`w-4 h-4 ${
                        activeSection === item.id
                          ? `text-${item.color}-600`
                          : "text-gray-500 group-hover:text-gray-700"
                      }`} />
                    </div>
                    
                    {!isCollapsed && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}

                    {activeSection === item.id && !isCollapsed && (
                      <div className={`w-1.5 h-1.5 bg-${item.color}-500 rounded-full`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            v2.1.0 • Last updated 2 min ago
          </div>
        </div>
      )}
    </motion.div>
  );
};