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
  Edit3,
  FileText,
  Image,
  Link,
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
        title: "Header",
        description: "Manage navigation, logo, and header elements",
        sections: [
          {
            id: "basic-info",
            title: "Basic Information",
            icon: Edit3,
            fields: [
              {
                id: "logoText",
                label: "Logo Text",
                type: "text",
                path: "logoText",
                description: "The main logo text displayed in the header",
              },
              {
                id: "tagline",
                label: "Tagline",
                type: "text",
                path: "tagline",
                description: "Short description below the logo",
              },
            ],
          },
          {
            id: "navigation",
            title: "Navigation Menu",
            icon: Link,
            fields: [
              {
                id: "nav-items",
                label: "Navigation Items",
                type: "repeatable",
                path: "navigationItems",
                itemFields: ["name", "href"],
                defaultItem: { name: "New Item", href: "#new" },
                description: "Main navigation menu items",
              },
            ],
          },
          {
            id: "cta-button",
            title: "Call-to-Action Button",
            icon: Settings,
            fields: [
              {
                id: "cta-text",
                label: "Button Text",
                type: "text",
                path: "ctaButton.text",
                description: "Text displayed on the CTA button",
              },
              {
                id: "cta-link",
                label: "Button Link",
                type: "text",
                path: "ctaButton.link",
                description: "URL or anchor link for the button",
              },
            ],
          },
        ],
      },
      hero: {
        title: "Hero Section",
        description: "Manage the main landing area content",
        sections: [
          {
            id: "basic-info",
            title: "Main Content",
            icon: Edit3,
            fields: [
              {
                id: "main-heading-line1",
                label: "Main Heading Line 1",
                type: "text",
                path: "mainHeading.line1",
                description: "First line of the main heading",
              },
              {
                id: "main-heading-line2",
                label: "Main Heading Line 2",
                type: "text",
                path: "mainHeading.line2",
                description: "Second line of the main heading",
              },
              {
                id: "subtitle",
                label: "Subtitle",
                type: "textarea",
                path: "subtitle",
                description: "Supporting text below the main heading",
              },
            ],
          },
          {
            id: "testimonials",
            title: "Testimonials",
            icon: FileText,
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
                description: "Customer testimonials and reviews",
              },
            ],
          },
          {
            id: "cta-buttons",
            title: "Call-to-Action Buttons",
            icon: Link,
            fields: [
              {
                id: "primary-cta",
                label: "Primary Button Text",
                type: "text",
                path: "ctaButtons.primary.text",
                description: "Text for the primary action button",
              },
              {
                id: "secondary-cta",
                label: "Secondary Button Text",
                type: "text",
                path: "ctaButtons.secondary.text",
                description: "Text for the secondary action button",
              },
            ],
          },
        ],
      },
      features: {
        title: "Features",
        description: "Manage product features and capabilities",
        sections: [
          {
            id: "basic-info",
            title: "Section Header",
            icon: Edit3,
            fields: [
              {
                id: "section-title",
                label: "Section Title",
                type: "textarea",
                path: "sectionHeader.title",
                description: "Main title for the features section",
              },
              {
                id: "section-description",
                label: "Section Description",
                type: "textarea",
                path: "sectionHeader.description",
                description: "Description text for the features section",
              },
            ],
          },
          {
            id: "feature-list",
            title: "Features",
            icon: Settings,
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
                description: "Individual feature items and their details",
              },
            ],
          },
        ],
      },
    };

    return (
      configs[section] || {
        title: "Content",
        description: "Manage this section's content",
        sections: [],
      }
    );
  };

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj) || '';
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case "text":
        return Type;
      case "textarea":
        return FileText;
      case "repeatable":
        return Settings;
      default:
        return Edit3;
    }
  };

  const renderField = (field: any) => {
    const FieldIcon = getFieldIcon(field.type);
    
    switch (field.type) {
      case "text":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FieldIcon className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-900">
                {field.label}
              </label>
            </div>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <input
              type="text"
              value={getValueByPath(localContent, field.path)}
              onChange={(e) => handleFieldChange(field.path, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FieldIcon className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-900">
                {field.label}
              </label>
            </div>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <textarea
              value={getValueByPath(localContent, field.path)}
              onChange={(e) => handleFieldChange(field.path, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
            />
          </div>
        );

      case "repeatable":
        const items = getValueByPath(localContent, field.path) || [];
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FieldIcon className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-900">
                  {field.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">{items.length} items</span>
            </div>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            
            {items.map((item: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-gray-700">
                      {field.label.slice(0, -1)} {index + 1}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleRemoveArrayItem(field.path, index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {field.itemFields.map((fieldName: string) => (
                    <div key={fieldName}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, " $1").trim()}
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button 
              onClick={() => handleAddArrayItem(field.path, field.defaultItem)}
              className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add {field.label.slice(0, -1)}</span>
            </button>
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-500 italic">
            Field type not implemented: {field.type}
          </div>
        );
    }
  };

  const config = getSectionConfig(section);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {config.title}
            </h1>
            <p className="text-sm text-gray-600">{config.description}</p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleReset}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>

            <motion.button
              onClick={onPreview}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </motion.button>

            <motion.button
              onClick={onSave}
              className="flex items-center space-x-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </motion.button>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-4">
          {hasUnsavedChanges ? (
            <div className="flex items-center space-x-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Unsaved changes</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">All changes saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {config.sections.map((configSection, index) => (
          <motion.div
            key={configSection.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(configSection.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <configSection.icon className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  {configSection.title}
                </h3>
              </div>
              {expandedSections.includes(configSection.id) ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections.includes(configSection.id) && (
              <motion.div
                className="p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-6">
                  {configSection.fields.map((field, fieldIndex) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fieldIndex * 0.05 }}
                    >
                      {renderField(field)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};