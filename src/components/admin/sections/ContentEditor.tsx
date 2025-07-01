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
  Palette,
  Globe,
  Smartphone,
  Users,
  HelpCircle,
  Building2,
  Layout,
  Monitor,
} from "lucide-react";
import { AdminSection } from "../AdminDashboard";
import { RichTextEditor } from "../fields/RichTextEditor";
import { ImagePreview } from "../fields/ImagePreview";
import { DraggableList } from "../fields/DraggableList";
import { SectionPreview } from "../SectionPreview";

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(true);

  // Update local content when initialContent changes
  useEffect(() => {
    setLocalContent(initialContent);
    setHasUnsavedChanges(false);
    setValidationErrors({});
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

  const validateField = (fieldPath: string, value: any, fieldType: string) => {
    const errors: Record<string, string> = {};
    
    if (fieldType === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[fieldPath] = "Please enter a valid email address";
      }
    }
    
    if (fieldType === "url" && value) {
      try {
        new URL(value);
      } catch {
        errors[fieldPath] = "Please enter a valid URL";
      }
    }
    
    return errors;
  };

  const handleFieldChange = (fieldPath: string, value: any, fieldType: string = "text") => {
    // Validate field
    const fieldErrors = validateField(fieldPath, value, fieldType);
    setValidationErrors(prev => ({
      ...prev,
      ...fieldErrors,
      [fieldPath]: fieldErrors[fieldPath] || undefined
    }));

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

  const handleArrayUpdate = (arrayPath: string, newArray: any[]) => {
    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      const pathArray = arrayPath.split('.');
      let current = newContent;
      
      // Navigate to the parent of the array
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      
      // Set the new array
      current[pathArray[pathArray.length - 1]] = newArray;
      return newContent;
    });
  };

  const handleReset = () => {
    setLocalContent(initialContent);
    setHasUnsavedChanges(false);
    setValidationErrors({});
  };

  const getSectionConfig = (section: AdminSection) => {
    const configs = {
      header: {
        title: "Header",
        description: "Manage navigation, logo, and header elements",
        icon: Globe,
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
                type: "richtext",
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
                type: "draggable",
                path: "navigationItems",
                itemFields: ["name", "href", "description"],
                defaultItem: { name: "New Item", href: "#new", description: "Menu item description" },
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
                type: "url",
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
        icon: Smartphone,
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
                type: "richtext",
                path: "subtitle",
                description: "Supporting text below the main heading",
              },
            ],
          },
          {
            id: "testimonials",
            title: "Testimonials",
            icon: Users,
            fields: [
              {
                id: "testimonial-list",
                label: "Testimonials",
                type: "draggable",
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
        icon: Settings,
        sections: [
          {
            id: "basic-info",
            title: "Section Header",
            icon: Edit3,
            fields: [
              {
                id: "section-title",
                label: "Section Title",
                type: "richtext",
                path: "sectionHeader.title",
                description: "Main title for the features section",
              },
              {
                id: "section-description",
                label: "Section Description",
                type: "richtext",
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
                type: "draggable",
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
      "mobile-download": {
        title: "Mobile Apps",
        description: "Manage mobile app download section",
        icon: Smartphone,
        sections: [
          {
            id: "basic-info",
            title: "Section Header",
            icon: Edit3,
            fields: [
              {
                id: "section-title",
                label: "Section Title",
                type: "richtext",
                path: "sectionHeader.title",
                description: "Main title for the mobile download section",
              },
              {
                id: "section-description",
                label: "Section Description",
                type: "richtext",
                path: "sectionHeader.description",
                description: "Description text for the mobile download section",
              },
            ],
          },
          {
            id: "apps",
            title: "Mobile Apps",
            icon: Smartphone,
            fields: [
              {
                id: "apps-list",
                label: "App Information",
                type: "draggable",
                path: "apps",
                itemFields: ["name", "platform", "version", "storeLink"],
                defaultItem: {
                  name: "New App",
                  platform: "Platform",
                  version: "v1.0.0",
                  storeLink: "#",
                },
                description: "Mobile app download information",
              },
            ],
          },
        ],
      },
      faq: {
        title: "FAQ",
        description: "Manage frequently asked questions",
        icon: HelpCircle,
        sections: [
          {
            id: "basic-info",
            title: "Section Header",
            icon: Edit3,
            fields: [
              {
                id: "section-title",
                label: "Section Title",
                type: "richtext",
                path: "sectionHeader.title",
                description: "Main title for the FAQ section",
              },
              {
                id: "section-description",
                label: "Section Description",
                type: "richtext",
                path: "sectionHeader.description",
                description: "Description text for the FAQ section",
              },
            ],
          },
          {
            id: "faq-categories",
            title: "FAQ Categories",
            icon: HelpCircle,
            fields: [
              {
                id: "categories",
                label: "FAQ Categories",
                type: "draggable",
                path: "categories",
                itemFields: ["title", "icon", "gradient"],
                defaultItem: {
                  title: "New Category",
                  icon: "HelpCircle",
                  gradient: "from-blue-500 to-blue-600",
                  questions: [],
                },
                description: "FAQ category groups",
              },
            ],
          },
        ],
      },
      "about-arpi": {
        title: "About ARPI",
        description: "Manage company information and team details",
        icon: Building2,
        sections: [
          {
            id: "basic-info",
            title: "Company Information",
            icon: Building2,
            fields: [
              {
                id: "company-name",
                label: "Company Name",
                type: "text",
                path: "companyInfo.name",
                description: "Official company name",
              },
              {
                id: "company-description",
                label: "Company Description",
                type: "richtext",
                path: "companyInfo.description",
                description: "Brief description of the company",
              },
              {
                id: "founded",
                label: "Founded Year",
                type: "text",
                path: "companyInfo.founded",
                description: "Year the company was founded",
              },
              {
                id: "location",
                label: "Location",
                type: "text",
                path: "companyInfo.location",
                description: "Company headquarters location",
              },
            ],
          },
          {
            id: "team",
            title: "Team Members",
            icon: Users,
            fields: [
              {
                id: "team-list",
                label: "Team Members",
                type: "draggable",
                path: "team",
                itemFields: ["name", "role", "bio"],
                defaultItem: {
                  name: "Team Member",
                  role: "Position",
                  bio: "Brief bio",
                  avatar: "👤",
                },
                description: "Company team members",
              },
            ],
          },
        ],
      },
      footer: {
        title: "Footer",
        description: "Manage footer content and links",
        icon: FileText,
        sections: [
          {
            id: "basic-info",
            title: "Company Information",
            icon: Building2,
            fields: [
              {
                id: "company-name",
                label: "Company Name",
                type: "text",
                path: "companyInfo.name",
                description: "Company name in footer",
              },
              {
                id: "company-description",
                label: "Company Description",
                type: "richtext",
                path: "companyInfo.description",
                description: "Brief company description in footer",
              },
            ],
          },
          {
            id: "contact",
            title: "Contact Information",
            icon: Link,
            fields: [
              {
                id: "email",
                label: "Email Address",
                type: "email",
                path: "contactInfo.email",
                description: "Contact email address",
              },
              {
                id: "phone",
                label: "Phone Number",
                type: "text",
                path: "contactInfo.phone",
                description: "Contact phone number",
              },
              {
                id: "address",
                label: "Address",
                type: "text",
                path: "contactInfo.address",
                description: "Company address",
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
        icon: Edit3,
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
      case "richtext":
        return FileText;
      case "email":
        return Link;
      case "url":
        return Link;
      case "image":
        return Image;
      case "draggable":
        return Settings;
      default:
        return Edit3;
    }
  };

  const renderField = (field: any) => {
    const FieldIcon = getFieldIcon(field.type);
    const fieldError = validationErrors[field.path];
    
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
              onChange={(e) => handleFieldChange(field.path, e.target.value, field.type)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                fieldError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldError && (
              <p className="text-xs text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError}</span>
              </p>
            )}
          </div>
        );

      case "email":
      case "url":
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
              type={field.type}
              value={getValueByPath(localContent, field.path)}
              onChange={(e) => handleFieldChange(field.path, e.target.value, field.type)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                fieldError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldError && (
              <p className="text-xs text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{fieldError}</span>
              </p>
            )}
          </div>
        );

      case "richtext":
        return (
          <RichTextEditor
            label={field.label}
            value={getValueByPath(localContent, field.path)}
            onChange={(value) => handleFieldChange(field.path, value)}
            description={field.description}
            placeholder={field.placeholder}
          />
        );

      case "image":
        return (
          <ImagePreview
            label={field.label}
            value={getValueByPath(localContent, field.path)}
            onChange={(value) => handleFieldChange(field.path, value)}
            description={field.description}
            placeholder={field.placeholder}
          />
        );

      case "draggable":
        const items = getValueByPath(localContent, field.path) || [];
        return (
          <DraggableList
            label={field.label}
            items={items}
            itemFields={field.itemFields}
            defaultItem={field.defaultItem}
            onUpdate={(newItems) => handleArrayUpdate(field.path, newItems)}
            description={field.description}
          />
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
  const hasErrors = Object.keys(validationErrors).some(key => validationErrors[key]);

  return (
    <div className="h-full flex">
      {/* Left Side - Live Preview */}
      <div className="w-1/2 pr-3 border-r border-gray-200">
        <div className="sticky top-0 h-full overflow-y-auto">
          <SectionPreview
            section={section}
            content={localContent}
            isVisible={showPreview}
            onToggleVisibility={() => setShowPreview(!showPreview)}
          />
        </div>
      </div>

      {/* Right Side - Content Editor */}
      <div className="w-1/2 pl-3">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <config.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    {config.title}
                  </h1>
                  <p className="text-sm text-gray-600">{config.description}</p>
                </div>
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
                  <Monitor className="w-4 h-4" />
                  <span>Full Preview</span>
                </motion.button>

                <motion.button
                  onClick={onSave}
                  disabled={hasErrors}
                  className={`flex items-center space-x-2 px-4 py-1.5 text-sm font-medium text-white border rounded-lg transition-all duration-200 ${
                    hasErrors 
                      ? 'bg-gray-400 border-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 border-blue-600 hover:bg-blue-700'
                  }`}
                  whileHover={!hasErrors ? { scale: 1.02 } : {}}
                  whileTap={!hasErrors ? { scale: 0.98 } : {}}
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </motion.button>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
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
                
                {hasErrors && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Please fix validation errors</span>
                  </div>
                )}
              </div>
              
              {lastSaved && (
                <div className="text-xs text-gray-500">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 pb-8">
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
      </div>
    </div>
  );
};