"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  User,
  LogOut,
  Save,
  Eye,
  RefreshCw,
  Menu,
  Globe,
  Clock,
  CheckCircle,
  ChevronDown,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";

interface AdminHeaderProps {
  activeSection: AdminSection;
  onToggleSidebar: () => void;
  onSave?: () => void;
  onPreview?: () => void;
  lastSaved?: Date | null;
  isLoading?: boolean;
  saveError?: string | null;
}

export const AdminHeader: React.FC<AdminHeaderProps> = memo(({
  activeSection,
  onToggleSidebar,
  onSave,
  onPreview,
  lastSaved,
  isLoading = false,
  saveError = null,
}) => {
  const getSectionTitle = (section: AdminSection) => {
    const titles = {
      dashboard: "Dashboard",
      header: "Header",
      hero: "Hero Section",
      features: "Features",
      "mobile-download": "Mobile Apps",
      faq: "FAQ",
      "about-arpi": "About ARPI",
      footer: "Footer",
      "page-builder": "Page Builder",
      "media-library": "Media Library",
      settings: "Settings",
      users: "Users",
    };
    return titles[section] || "Content Management";
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return "Never";
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const getStatusIndicator = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Saving...</span>
        </div>
      );
    }

    if (saveError) {
      return (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Save failed</span>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm">All changes saved</span>
      </div>
    );
  };

  return (
    <motion.header
      className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-4 h-4 text-gray-600" />
        </button>

        <div>
          <motion.h1
            className="text-lg font-semibold text-gray-900"
            key={activeSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getSectionTitle(activeSection)}
          </motion.h1>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-0.5">
            {lastSaved && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Last saved {formatLastSaved(lastSaved)}</span>
              </div>
            )}
            {getStatusIndicator()}
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Action Buttons */}
        {activeSection !== "dashboard" && (
          <div className="hidden sm:flex items-center space-x-2">
            <motion.button
              onClick={onPreview}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>

            <motion.button
              onClick={onSave}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </motion.button>
          </div>
        )}

        {/* Notifications */}
        <motion.button
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </motion.button>

        {/* User Menu */}
        <div className="relative group">
          <motion.button
            className="flex items-center space-x-2 p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium">Admin</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </motion.button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-1">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
});

AdminHeader.displayName = 'AdminHeader';