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
      description: "Navigation & branding",
    },
    {
      id: "hero" as AdminSection,
      label: "Hero Section",
      icon: Heart,
      category: "content",
      description: "Main landing area",
    },
    {
      id: "features" as AdminSection,
      label: "Features",
      icon: Sparkles,
      category: "content",
      description: "Product features",
    },
    {
      id: "mobile-download" as AdminSection,
      label: "Mobile Apps",
      icon: Smartphone,
      category: "content",
      description: "App download section",
    },
    {
      id: "faq" as AdminSection,
      label: "FAQ",
      icon: HelpCircle,
      category: "content",
      description: "Questions & answers",
    },
    {
      id: "about-arpi" as AdminSection,
      label: "About ARPI",
      icon: Building2,
      category: "content",
      description: "Company information",
    },
    {
      id: "footer" as AdminSection,
      label: "Footer",
      icon: Menu,
      category: "content",
      description: "Footer links & info",
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
    { id: "main", label: "Overview" },
    { id: "content", label: "Content Management" },
    { id: "tools", label: "Tools" },
    { id: "admin", label: "Administration" },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-white/60 backdrop-blur-2xl border-r border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-50 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">ARPI Admin</h1>
                <p className="text-xs text-slate-500">Content Management</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-slate-100/50 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {categories.map((category) => {
          const categoryItems = menuItems.filter(
            (item) => item.category === category.id
          );

          return (
            <div key={category.id}>
              {!isCollapsed && (
                <motion.h3
                  className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {category.label}
                </motion.h3>
              )}
              <div className="space-y-1">
                {categoryItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      activeSection === item.id
                        ? "bg-slate-100/80 border border-slate-200/50 shadow-sm"
                        : "hover:bg-slate-50/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glassy hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />

                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-slate-700 text-white shadow-lg"
                          : "bg-slate-100/50 text-slate-600 group-hover:bg-slate-200/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>

                    {!isCollapsed && (
                      <div className="flex-1 text-left relative z-10">
                        <div
                          className={`font-medium transition-colors ${
                            activeSection === item.id
                              ? "text-slate-800"
                              : "text-slate-700 group-hover:text-slate-800"
                          }`}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-slate-500 mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}

                    {!isCollapsed && activeSection === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1 h-6 bg-slate-700 rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {!isCollapsed && (
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          activeSection === item.id
                            ? "text-slate-600 opacity-100"
                            : "text-slate-400 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-slate-200/50">
        {!isCollapsed ? (
          <div className="bg-green-50/50 backdrop-blur-sm border border-green-200/50 rounded-2xl p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700">
                System Online
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              All services operational
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
};