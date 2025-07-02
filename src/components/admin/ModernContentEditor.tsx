"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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
  FileText,
  Link,
  AlertCircle,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";
import { RichTextEditor } from "./fields/RichTextEditor";
import { ImagePreview } from "./fields/ImagePreview";
import { DraggableList } from "./fields/DraggableList";
import { getSectionSchema, FieldSchema } from "@/lib/admin/contentSchemas";
import { getIconComponent } from "@/lib/utils/icons";

interface ModernContentEditorProps {
  section: AdminSection;
  content: any;
  onContentChange: (newContent: any) => void;
  onSave: () => void;
  isLoading?: boolean;
  highlightedElement?: string | null;
}

export const ModernContentEditor: React.FC<ModernContentEditorProps> = ({
  section,
  content,
  onContentChange,
  onSave,
  isLoading = false,
  highlightedElement = null,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic-info"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const fieldRefs = useRef<Record<string, HTMLDivElement>>({});

  const sectionSchema = getSectionSchema(section);

  // Scroll to highlighted element when it changes
  useEffect(() => {
    if (highlightedElement) {
      // Find the field that matches the highlighted element path
      for (const schemaSection of sectionSchema.sections) {
        for (const field of schemaSection.fields) {
          if (field.path.includes(highlightedElement) || highlightedElement.includes(field.path)) {
            // Expand the section if it's not already expanded
            if (!expandedSections.includes(schemaSection.id)) {
              setExpandedSections(prev => [...prev, schemaSection.id]);
            }
            
            // Scroll to the field after a short delay to allow for expansion
            setTimeout(() => {
              const fieldElement = fieldRefs.current[field.id];
              if (fieldElement) {
                fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Add highlight effect
                fieldElement.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2', 'rounded-lg');
                setTimeout(() => {
                  fieldElement.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2', 'rounded-lg');
                }, 3000);
              }
            }, 300);
            break;
          }
        }
      }
    }
  }, [highlightedElement, expandedSections, sectionSchema.sections]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const getValueByPath = useCallback((obj: any, path: string) => {
    return path.split('.').reduce((current, key) => {
      if (current === undefined) return '';
      return current[key];
    }, obj) || '';
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
    const newContent = JSON.parse(JSON.stringify(content)); // Deep clone
    setValueByPath(newContent, fieldPath, value);
    onContentChange(newContent);
  }, [content, onContentChange, setValueByPath]);

  const handleArrayUpdate = useCallback((fieldPath: string, newArray: any[]) => {
    const newContent = JSON.parse(JSON.stringify(content)); // Deep clone
    setValueByPath(newContent, fieldPath, newArray);
    onContentChange(newContent);
  }, [content, onContentChange, setValueByPath]);

  const renderField = (field: FieldSchema) => {
    const FieldIcon = getIconComponent(
      field.type === 'richtext' ? 'FileText' : 
      field.type === 'email' || field.type === 'url' ? 'Link' : 
      field.type === 'image' ? 'Image' : 
      field.type === 'draggable' ? 'Settings' : 'Type'
    );
    
    const fieldValue = getValueByPath(content, field.path);
    const isHighlighted = highlightedElement && (field.path.includes(highlightedElement) || highlightedElement.includes(field.path));
    const fieldErrors = validationErrors[field.id];
    
    const commonProps = {
      className: `space-y-3 p-4 rounded-lg transition-all duration-300 ${
        isHighlighted ? 'bg-blue-50 ring-2 ring-blue-500 ring-offset-2' : 'hover:bg-gray-50'
      }`,
      ref: (el: HTMLDivElement) => {
        if (el) fieldRefs.current[field.id] = el;
      }
    };
    
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <div {...commonProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FieldIcon className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-900">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
              {isHighlighted && (
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Selected
                </div>
              )}
            </div>
            
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            
            <input
              type={field.type}
              value={fieldValue || ''}
              onChange={(e) => handleFieldChange(field.path, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                fieldErrors ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="space-y-1">
                {fieldErrors.map((error, index) => (
                  <p key={index} className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        );

      case "richtext":
        return (
          <div {...commonProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FieldIcon className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-900">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
              {isHighlighted && (
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Selected
                </div>
              )}
            </div>
            
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            
            <RichTextEditor
              label=""
              value={fieldValue || ''}
              onChange={(value) => handleFieldChange(field.path, value)}
              placeholder={field.placeholder}
              height="150px"
            />
            
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="space-y-1">
                {fieldErrors.map((error, index) => (
                  <p key={index} className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        );

      case "image":
        return (
          <div {...commonProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FieldIcon className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-900">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
              {isHighlighted && (
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Selected
                </div>
              )}
            </div>
            
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            
            <ImagePreview
              label=""
              value={fieldValue || ''}
              onChange={(value) => handleFieldChange(field.path, value)}
              placeholder={field.placeholder}
              maxWidth="100%"
              maxHeight="200px"
            />
            
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="space-y-1">
                {fieldErrors.map((error, index) => (
                  <p key={index} className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        );

      case "draggable":
        const items = fieldValue || [];
        return (
          <div {...commonProps}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FieldIcon className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-900">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
              {isHighlighted && (
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Selected
                </div>
              )}
            </div>
            
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            
            <DraggableList
              label=""
              items={items}
              itemFields={field.itemFields || []}
              defaultItem={field.defaultItem || {}}
              onUpdate={(newItems) => handleArrayUpdate(field.path, newItems)}
            />
            
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="space-y-1">
                {fieldErrors.map((error, index) => (
                  <p key={index} className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-500 italic p-4">
            Field type not implemented: {field.type}
          </div>
        );
    }
  };

  // Filter sections and fields based on search query
  const filteredSections = sectionSchema.sections
    .map(section => ({
      ...section,
      fields: section.fields.filter(field => 
        !searchQuery || 
        field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.path.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(section => section.fields.length > 0);

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
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
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
              const hasHighlightedField = schemaSection.fields.some(field => 
                highlightedElement && (field.path.includes(highlightedElement) || highlightedElement.includes(field.path))
              );

              return (
                <motion.div
                  key={schemaSection.id}
                  className={`border border-gray-200 rounded-lg overflow-hidden ${
                    hasHighlightedField ? 'ring-2 ring-blue-300' : ''
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(schemaSection.id)}
                    className={`w-full flex items-center justify-between p-4 transition-colors ${
                      hasHighlightedField 
                        ? 'bg-blue-50 hover:bg-blue-100' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <SchemaSectionIcon className={`w-4 h-4 ${hasHighlightedField ? 'text-blue-600' : 'text-gray-600'}`} />
                      <h3 className={`text-sm font-semibold ${hasHighlightedField ? 'text-blue-900' : 'text-gray-900'}`}>
                        {schemaSection.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        hasHighlightedField 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {schemaSection.fields.length} fields
                      </span>
                      
                      {hasHighlightedField && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Contains selected element
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className={`w-4 h-4 ${hasHighlightedField ? 'text-blue-500' : 'text-gray-500'}`} />
                    ) : (
                      <ChevronDown className={`w-4 h-4 ${hasHighlightedField ? 'text-blue-500' : 'text-gray-500'}`} />
                    )}
                  </button>

                  {/* Section Content */}
                  {isExpanded && (
                    <motion.div
                      className="divide-y divide-gray-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {schemaSection.fields.map((field) => (
                        <div key={field.id}>
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