"use client";

import React from "react";
import { 
  Home, 
  Star, 
  MessageSquare, 
  HelpCircle, 
  Building, 
  Phone 
} from "lucide-react";
import { ContentSection } from "./AdminDashboard";

interface AdminSidebarProps {
  activeSection: ContentSection;
  onSectionChange: (section: ContentSection) => void;
}

const menuItems = [
  { id: 'hero' as ContentSection, label: 'Hero Section', icon: Home },
  { id: 'features' as ContentSection, label: 'Features', icon: Star },
  { id: 'testimonials' as ContentSection, label: 'Testimonials', icon: MessageSquare },
  { id: 'faq' as ContentSection, label: 'FAQ', icon: HelpCircle },
  { id: 'about' as ContentSection, label: 'About Us', icon: Building },
  { id: 'contact' as ContentSection, label: 'Contact', icon: Phone },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">ECG Buddy CMS</h1>
        <p className="text-sm text-gray-500">Content Management</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>ARPI Inc. Admin Panel</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};