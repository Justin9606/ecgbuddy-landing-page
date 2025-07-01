"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Layout,
  Heart,
  Sparkles,
  Smartphone,
  HelpCircle,
  Building2,
  Menu,
  Layers,
  Image,
  Settings,
  Users,
  ChevronRight,
  Activity,
  FileText,
  Globe,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
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
    },
    {
      id: "header" as AdminSection,
      label: "Header",
      icon: Layout,
      category: "content",
    },
    {
      id: "hero" as AdminSection,
      label: "Hero Section",
      icon: Heart,
      category: "content",
    },
    {
      id: "features" as AdminSection,
      label: "Features",
      icon: Sparkles,
      category: "content",
    },
    {
      id: "mobile-download" as AdminSection,
      label: "Mobile Apps",
      icon: Smartphone,
      category: "content",
    },
    {
      id: "faq" as AdminSection,
      label: "FAQ",
      icon: HelpCircle,
      category: "content",
    },
    {
      id: "about-arpi" as AdminSection,
      label: "About ARPI",
      icon: Building2,
      category: "content",
    },
    {
      id: "footer" as AdminSection,
      label: "Footer",
      icon: FileText,
      category: "content",
    },
    {
      id: "page-builder" as AdminSection,
      label: "Page Builder",
      icon: Layers,
      category: "tools",
    },
    {
      id: "media-library" as AdminSection,
      label: "Media Library",
      icon: Image,
      category: "tools",
    },
    {
      id: "settings" as AdminSection,
      label: "Settings",
      icon: Settings,
      category: "admin",
    },
    {
      id: "users" as AdminSection,
      label: "Users",
      icon: Users,
      category: "admin",
    },
  ];

  const categories = [
    { id: "main", label: "General" },
    { id: "content", label: "Content Manager" },
    { id: "tools", label: "Tools" },
    { id: "admin", label: "Settings" },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">ARPI Admin</h1>
            </div>
          </motion.div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-4 h-4 text-gray-600" />
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
                  className="px-4 mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {category.label}
                  </h3>
                </motion.div>
              )}
              <div className="space-y-1 px-2">
                {categoryItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 2 }}
                  >
                    <item.icon 
                      className={`w-4 h-4 mr-3 ${
                        activeSection === item.id ? "text-blue-600" : "text-gray-500"
                      }`} 
                    />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {activeSection === item.id && (
                          <ChevronRight className="w-3 h-3 text-blue-600" />
                        )}
                      </>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All systems operational</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};