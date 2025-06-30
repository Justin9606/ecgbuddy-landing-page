"use client";

import React from "react";
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
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";

interface AdminHeaderProps {
  activeSection: AdminSection;
  onToggleSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeSection,
  onToggleSidebar,
}) => {
  const getSectionTitle = (section: AdminSection) => {
    const titles = {
      dashboard: "Dashboard",
      header: "Header Management",
      hero: "Hero Section",
      features: "Features Management",
      "mobile-download": "Mobile Apps",
      faq: "FAQ Management",
      "about-arpi": "About ARPI",
      footer: "Footer Management",
      "page-builder": "Page Builder",
      "media-library": "Media Library",
      settings: "Settings",
      users: "User Management",
    };
    return titles[section] || "Content Management";
  };

  return (
    <motion.header
      className="bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-slate-100/50 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <div>
            <motion.h1
              className="text-2xl font-bold text-slate-800"
              key={activeSection}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {getSectionTitle(activeSection)}
            </motion.h1>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>Last updated: 2 minutes ago</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Globe className="w-4 h-4" />
                <span>Live site</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search content, sections, or settings..."
              className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Action Buttons */}
          {activeSection !== "dashboard" && (
            <div className="hidden sm:flex items-center space-x-2">
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/70 transition-all duration-300 text-slate-700 hover:text-slate-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </motion.button>

              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Save Changes</span>
              </motion.button>
            </div>
          )}

          {/* Notifications */}
          <motion.button
            className="relative p-2 hover:bg-slate-100/50 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">2</span>
            </div>
          </motion.button>

          {/* Refresh */}
          <motion.button
            className="p-2 hover:bg-slate-100/50 rounded-xl transition-colors"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <RefreshCw className="w-5 h-5 text-slate-600" />
          </motion.button>

          {/* User Menu */}
          <div className="relative group">
            <motion.button
              className="flex items-center space-x-3 p-2 hover:bg-slate-100/50 rounded-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-slate-800">
                  Admin User
                </div>
                <div className="text-xs text-slate-500">ARPI Team</div>
              </div>
            </motion.button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="p-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-slate-100/50 rounded-xl transition-colors">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-slate-100/50 rounded-xl transition-colors">
                  <LogOut className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};