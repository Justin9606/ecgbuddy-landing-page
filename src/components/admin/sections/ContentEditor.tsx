"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  GripVertical,
  Type,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AdminSection } from "../AdminDashboard";

interface ContentEditorProps {
  section: AdminSection;
  initialContent: any;
  onContentChange: (newContent: any) => void;
  onSave: () => void;
  onPreview: () => void;
  lastSaved?: Date | null;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ 
  section, 
  initialContent, 
  onContentChange, 
  onSave, 
  onPreview,
  lastSaved 
}) => {
  const [localContent, setLocalContent] = useState(initialContent);
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic-info"]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update local content when initialContent changes
  useEffect(() => {
    setLocalContent(initialContent);
    setHasUnsavedChanges(false);
  }, [initialContent]);

  // Propagate changes to parent
  useEffect(() => {
    if (JSON.stringify(localContent) !== JSON.stringify(initialContent)) {
      onContentChange(localContent);
      setHasUnsavedChanges(true);
    }
  }, [localContent, initialContent, onContentChange]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFieldChange = (fieldPath: string, value: any) => {
    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      const pathArray = fieldPath.split('.');
      let current = newContent;
      
      // Navigate to the parent of the field to be changed
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      
      // Set the value
      current[pathArray[pathArray.length - 1]] = value;
      return newContent;
    });
  };

  const handleArrayItemChange = (arrayPath: string, index: number, field: string, value: any) => {
    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      const pathArray = arrayPath.split('.');
      let current = newContent;
      
      // Navigate to the array
      for (const path of pathArray) {
        current = current[path];
      }
      
      // Update the specific item
      if (current && Array.isArray(current) && current[index]) {
        current[index] = { ...current[index], [field]: value };
      }
      
      return newContent;
    });
  };

  const handleAddArrayItem = (arrayPath: string, defaultItem: any) => {
    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      const pathArray = arrayPath.split('.');
      let current = newContent;
      
      // Navigate to the array
      for (const path of pathArray) {
        if (!current[path]) {
          current[path] = [];
        }
        current = current[path];
      }
      
      // Add new item
      if (Array.isArray(current)) {
        current.push({ ...defaultItem });
      }
      
      return newContent;
    });
  };

  const handleRemoveArrayItem = (arrayPath: string, index: number) => {
    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      const pathArray = arrayPath.split('.');
      let current = newContent;
      
      // Navigate to the array
      for (const path of pathArray) {
        current = current[path];
      }
      
      // Remove item
      if (Array.isArray(current)) {
        current.splice(index, 1);
      }
      
      return newContent;
    });
  };

  const handleReset = () => {
    setLocalContent(initialContent);
    setHasUnsavedChanges(false);
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
                id: "logoText",
                label: "Logo Text",
                type: "text",
                path: "logoText",
              },
              {
                id: "tagline",
                label: "Tagline",
                type: "text",
                path: "tagline",
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
                path: "navigationItems",
                itemFields: ["name", "href"],
                defaultItem: { name: "New Item", href: "#new" },
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
                path: "ctaButton.text",
              },
              {
                id: "cta-link",
                label: "Button Link",
                type: "text",
                path: "ctaButton.link",
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
                id: "main-heading-line1",
                label: "Main Heading Line 1",
                type: "text",
                path: "mainHeading.line1",
              },
              {
                id: "main-heading-line2",
                label: "Main Heading Line 2",
                type: "text",
                path: "mainHeading.line2",
              },
              {
                id: "subtitle",
                label: "Subtitle",
                type: "textarea",
                path: "subtitle",
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
                path: "testimonials",
                itemFields: ["text", "author", "role", "avatar", "hospital", "rating"],
                defaultItem: {
                  text: "New testimonial",
                  author: "Dr. Name",
                  role: "Position, Hospital",
                  avatar: "👨‍⚕️",
                  hospital: "Hospital Name",
                  rating: 5,
                },
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
                path: "ctaButtons.primary.text",
              },
              {
                id: "secondary-cta",
                label: "Secondary Button Text",
                type: "text",
                path: "ctaButtons.secondary.text",
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
                path: "sectionHeader.title",
              },
              {
                id: "section-description",
                label: "Section Description",
                type: "textarea",
                path: "sectionHeader.description",
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
                path: "features",
                itemFields: ["title", "description", "icon", "category", "badge"],
                defaultItem: {
                  title: "New Feature",
                  description: "Feature description",
                  icon: "Star",
                  category: "general",
                  badge: "New",
                },
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

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj) || '';
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={getValueByPath(localContent, field.path)}
            onChange={(e) => handleFieldChange(field.path, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500"
          />
        );

      case "textarea":
        return (
          <textarea
            value={getValueByPath(localContent, field.path)}
            onChange={(e) => handleFieldChange(field.path, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            rows={4}
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 placeholder-slate-500 resize-none"
          />
        );

      case "repeatable":
        const items = getValueByPath(localContent, field.path) || [];
        return (
          <div className="space-y-4">
            {items.map((item: any, index: number) => (
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
                  <button 
                    onClick={() => handleRemoveArrayItem(field.path, index)}
                    className="p-1 hover:bg-red-100/50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="space-y-3">
                  {field.itemFields.map((fieldName: string) => (
                    <div key={fieldName}>
                      <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                        {fieldName.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type={fieldName === 'rating' ? 'number' : 'text'}
                        value={item[fieldName] || ''}
                        onChange={(e) => handleArrayItemChange(
                          field.path, 
                          index, 
                          fieldName, 
                          fieldName === 'rating' ? parseInt(e.target.value) || 0 : e.target.value
                        )}
                        className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400/50 transition-all duration-300 text-slate-800 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button 
              onClick={() => handleAddArrayItem(field.path, field.defaultItem)}
              className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-slate-300 rounded-2xl hover:border-slate-400 hover:bg-slate-50/50 transition-all duration-300 text-slate-600 hover:text-slate-700"
            >
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

  const config = getSectionConfig(section);

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
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-4 mt-4">
              {hasUnsavedChanges ? (
                <div className="flex items-center space-x-2 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">All changes saved</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/70 transition-all duration-300 text-slate-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Reset</span>
            </motion.button>

            <motion.button
              onClick={onPreview}
              className="flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:bg-white/70 transition-all duration-300 text-slate-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </motion.button>

            <motion.button
              onClick={onSave}
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
              <strong>Note:</strong> Changes are automatically saved locally. Click "Save Changes" to persist your edits.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={onSave}
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