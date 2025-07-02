"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Type,
  Image,
  Settings,
  Edit3,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";
import { RichTextEditor } from "./fields/RichTextEditor";
import { ImagePreview } from "./fields/ImagePreview";
import { DraggableList } from "./fields/DraggableList";
import { getSectionSchema } from "@/lib/admin/contentSchemas";
import { getIconComponent } from "@/lib/utils/icons";

interface ModernContentEditorProps {
  section: AdminSection;
  content: any;
  onContentChange: (newContent: any) => void;
  onSave: () => void;
  isLoading?: boolean;
}

export const ModernContentEditor: React.FC<ModernContentEditorProps> = ({
  section,
  content,
  onContentChange,
  onSave,
  isLoading = false,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic-info"]);
  const [searchQuery, setSearchQuery] = useState("");

  const sectionSchema = getSectionSchema(section);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const getValueByPath = useCallback((obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj) || '';
  }, []);

  const setValueByPath = useCallback((obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }, []);

  const handleFieldChange = useCallback((fieldPath: string, value: any) => {
    const newContent = { ...content };
    setValueByPath(newContent, fieldPath, value);
    onContentChange(newContent);
  }, [content, onContentChange]);

  const renderField = (field: any) => {
    const FieldIcon = getIconComponent(
      field.type === 'richtext' ? 'FileText' : 
      field.type === 'email' || field.type === 'url' ? 'Link' : 
      field.type === 'image' ? 'Image' : 
      field.type === 'draggable' ? 'Settings' : 'Type'
    );
    
    const fieldValue = getValueByPath(content, field.path);
    
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FieldIcon className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-900">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <input
              type={field.type}
              value={fieldValue || ''}
              onChange={(e) => handleFieldChange(field.path, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
        );

      case "richtext":
        return (
          <RichTextEditor
            label={field.label + (field.required ? ' *' : '')}
            value={fieldValue || ''}
            onChange={(value) => handleFieldChange(field.path, value)}
            description={field.description}
            placeholder={field.placeholder}
          />
        );

      case "image":
        return (
          <ImagePreview
            label={field.label + (field.required ? ' *' : '')}
            value={fieldValue || ''}
            onChange={(value) => handleFieldChange(field.path, value)}
            description={field.description}
            placeholder={field.placeholder}
          />
        );

      case "draggable":
        const items = fieldValue || [];
        return (
          <DraggableList
            label={field.label + (field.required ? ' *' : '')}
            items={items}
            itemFields={field.itemFields || []}
            defaultItem={field.defaultItem || {}}
            onUpdate={(newItems) => handleFieldChange(field.path, newItems)}
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

  const filteredSections = sectionSchema.sections.filter(section => 
    !searchQuery || 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.fields.some(field => 
      field.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Editor Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
            <p className="text-sm text-gray-600">Edit {sectionSchema.title.toLowerCase()} content</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No fields found</h3>
              <p className="text-gray-500">Try adjusting your search query</p>
            </div>
          ) : (
            filteredSections.map((schemaSection) => {
              const SchemaSectionIcon = getIconComponent(schemaSection.icon);
              const isExpanded = expandedSections.includes(schemaSection.id);

              return (
                <motion.div
                  key={schemaSection.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(schemaSection.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <SchemaSectionIcon className="w-4 h-4 text-gray-600" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        {schemaSection.title}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {schemaSection.fields.length} fields
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {/* Section Content */}
                  {isExpanded && (
                    <motion.div
                      className="p-4 space-y-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {schemaSection.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          {renderField(field)}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};