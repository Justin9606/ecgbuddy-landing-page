"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  GripVertical,
  Image,
  Type,
  Link,
  Palette,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AdminSection } from "../AdminDashboard";

interface ContentEditorProps {
  section: AdminSection;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ section }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "basic-info",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getSectionConfig = (section: AdminSection) => {
    const configs = {
      header: {
        title: "Header Configuration",
        description: "Manage navigation, logo, and header elements",
        sections: [
          {
            id: "basic-info",
            title: "Basic Information",
            fields: [
              {
                id: "logo-text",
                label: "Logo Text",
                type: "text",
                value: "ECG Buddy",
                placeholder: "Enter logo text",
              },
              {
                id: "tagline",
                label: "Tagline",
                type: "text",
                value: "AI-powered ECG analysis",
                placeholder: "Enter tagline",
              },
            ],
          },
          {
            id: "navigation",
            title: "Navigation Menu",
            fields: [
              {
                id: "nav-items",
                label: "Navigation Items",
                type: "repeatable",
                items: [
                  { name: "Product", href: "#product" },
                  { name: "Solutions", href: "#solutions" },
                  { name: "Resources", href: "#resources" },
                  { name: "FAQ", href: "#faq" },
                  { name: "About Us", href: "#about" },
                ],
              },
            ],
          },
          {
            id: "cta-button",
            title: "Call-to-Action Button",
            fields: [
              {
                id: "cta-text",
                label: "Button Text",
                type: "text",
                value: "Try ECG Buddy",
                placeholder: "Enter button text",
              },
              {
                id: "cta-link",
                label: "Button Link",
                type: "text",
                value: "#mobile-download",
                placeholder: "Enter button link",
              },
            ],
          },
        ],
      },
      hero: {
        title: "Hero Section Configuration",
        description: "Manage the main landing area content",
        sections: [
          {
            id: "basic-info",
            title: "Main Content",
            fields: [
              {
                id: "main-heading",
                label: "Main Heading",
                type: "textarea",
                value: "Revolutionize\nECG Analysis",
                placeholder: "Enter main heading",
              },
              {
                id: "subtitle",
                label: "Subtitle",
                type: "textarea",
                value:
                  "Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide.",
                placeholder: "Enter subtitle",
              },
            ],
          },
          {
            id: "testimonials",
            title: "Testimonials",
            fields: [
              {
                id: "testimonial-list",
                label: "Testimonials",
                type: "repeatable",
                items: [
                  {
                    text: "ECG Buddy has revolutionized our emergency department workflow",
                    author: "Dr. Sarah Kim",
                    role: "Emergency Medicine, Seoul National University Hospital",
                    avatar: "👩‍⚕️",
                    rating: 5,
                  },
                  {
                    text: "The AI accuracy is remarkable - it's like having a cardiologist available 24/7",
                    author: "Dr. Michael Chen",
                    role: "Cardiology, Samsung Medical Center",
                    avatar: "👨‍⚕️",
                    rating: 5,
                  },
                ],
              },
            ],
          },
          {
            id: "cta-buttons",
            title: "Call-to-Action Buttons",
            fields: [
              {
                id: "primary-cta",
                label: "Primary Button Text",
                type: "text",
                value: "Start Analysis",
                placeholder: "Enter primary button text",
              },
              {
                id: "secondary-cta",
                label: "Secondary Button Text",
                type: "text",
                value: "Watch Demo",
                placeholder: "Enter secondary button text",
              },
            ],
          },
        ],
      },
      features: {
        title: "Features Section Configuration",
        description: "Manage product features and capabilities",
        sections: [
          {
            id: "basic-info",
            title: "Section Header",
            fields: [
              {
                id: "section-title",
                label: "Section Title",
                type: "textarea",
                value: "Professional-grade tools\nfor modern healthcare",
                placeholder: "Enter section title",
              },
              {
                id: "section-description",
                label: "Section Description",
                type: "textarea",
                value:
                  "Comprehensive suite of advanced features designed to enhance diagnostic accuracy and streamline cardiac care workflows for healthcare professionals.",
                placeholder: "Enter section description",
              },
            ],
          },
          {
            id: "feature-list",
            title: "Features",
            fields: [
              {
                id: "features",
                label: "Feature Items",
                type: "repeatable",
                items: [
                  {
                    title: "AI-Powered Analysis",
                    description:
                      "Advanced machine learning algorithms trained on millions of ECG patterns for unprecedented accuracy and reliability.",
                    icon: "Brain",
                    category: "ai",
                    badge: "Most Popular",
                  },
                  {
                    title: "Real-time Processing",
                    description:
                      "Get comprehensive ECG analysis results in under 30 seconds with our optimized cloud processing engine.",
                    icon: "Clock",
                    category: "performance",
                    badge: "Speed Champion",
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    return (
      configs[section] || {
        title: "Content Configuration",
        description: "Manage this section's content",
        sections: [],
      }
    );
  };

  const config = getSectionConfig(section);

  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={field.value}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500"
          />
        );

      case "textarea":
        return (
          <textarea
            value={field.value}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500 resize-none"
          />
        );

      case "repeatable":
        return (
          <div className="space-y-4">
            {field.items?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
                    <span className="text-sm font-medium text-slate-700">
                      Item {index + 1}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-red-100/50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="text"
                        value={String(value)}
                        className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-slate-300 rounded-2xl hover:border-slate-400 hover:bg-slate-50/50 transition-all duration-300 text-slate-600 hover:text-slate-700">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add New Item</span>
            </button>
          </div>
        );

      default:
        return (
          <div className="text-sm text-slate-500 italic">
            Field type not implemented: {field.type}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {config.title}
            </h2>
            <p className="text-slate-600 text-lg">{config.description}</p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/70 transition-all duration-300 text-slate-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Reset</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/70 transition-all duration-300 text-slate-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save Changes</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-6">
        {config.sections.map((configSection, index) => (
          <motion.div
            key={configSection.id}
            className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(configSection.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {configSection.title}
                </h3>
              </div>
              {expandedSections.includes(configSection.id) ? (
                <ChevronUp className="w-5 h-5 text-slate-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections.includes(configSection.id) && (
              <motion.div
                className="px-6 pb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {configSection.fields.map((field, fieldIndex) => (
                    <motion.div
                      key={field.id}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fieldIndex * 0.05 }}
                    >
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                        <Type className="w-4 h-4" />
                        <span>{field.label}</span>
                      </label>
                      {renderField(field)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Save Actions */}
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <p>
              <strong>Note:</strong> Changes will be applied to the live site
              immediately after saving.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors">
              Cancel
            </button>
            <motion.button
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white rounded-2xl hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              <span className="font-medium">Publish Changes</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};