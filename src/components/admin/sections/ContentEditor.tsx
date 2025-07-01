"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Download,
  Users,
  HelpCircle,
  Building2,
  Layout,
  Monitor,
  Target,
  Zap,
} from "lucide-react";
import { AdminSection } from "../AdminDashboard";
import { RichTextEditor } from "../fields/RichTextEditor";
import { ImagePreview } from "../fields/ImagePreview";
import { DraggableList } from "../fields/DraggableList";
import { SectionPreview } from "../SectionPreview";
import { getSectionSchema, validateFieldValue, FieldSchema } from "@/lib/admin/contentSchemas";
import { getIconComponent } from "@/lib/utils/icons";

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [showPreview, setShowPreview] = useState(true);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const editorRefs = useRef<Record<string, HTMLElement>>({});

  // Get schema for current section
  const sectionSchema = getSectionSchema(section);

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

  const getValueByPath = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj) || '';
  };

  const setValueByPath = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  const handleFieldChange = (field: FieldSchema, value: any) => {
    // Validate field
    const fieldErrors = validateFieldValue(value, field);
    setValidationErrors(prev => ({
      ...prev,
      [field.id]: fieldErrors.length > 0 ? fieldErrors : undefined
    }));

    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      setValueByPath(newContent, field.path, value);
      return newContent;
    });
  };

  const handleArrayUpdate = (field: FieldSchema, newArray: any[]) => {
    setLocalContent((prev: any) => {
      const newContent = { ...prev };
      setValueByPath(newContent, field.path, newArray);
      return newContent;
    });
  };

  const handleReset = () => {
    setLocalContent(initialContent);
    setHasUnsavedChanges(false);
    setValidationErrors({});
    setHighlightedElement(null);
  };

  // Handle element click from preview
  const handleElementClick = (elementPath: string, elementType: string) => {
    setHighlightedElement(elementPath);
    
    // Find and expand the relevant section
    for (const schemaSection of sectionSchema.sections) {
      for (const field of schemaSection.fields) {
        if (field.path.includes(elementPath) || elementPath.includes(field.path)) {
          if (!expandedSections.includes(schemaSection.id)) {
            setExpandedSections(prev => [...prev, schemaSection.id]);
          }
          
          // Scroll to the field
          setTimeout(() => {
            const fieldElement = editorRefs.current[field.id];
            if (fieldElement) {
              fieldElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
              
              // Add highlight effect
              fieldElement.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
              setTimeout(() => {
                fieldElement.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
              }, 2000);
            }
          }, 300);
          break;
        }
      }
    }
  };

  const renderField = (field: FieldSchema) => {
    const FieldIcon = getIconComponent(field.type === 'richtext' ? 'FileText' : field.type === 'email' || field.type === 'url' ? 'Link' : field.type === 'image' ? 'Image' : field.type === 'draggable' ? 'Settings' : 'Type');
    const fieldErrors = validationErrors[field.id];
    const isHighlighted = highlightedElement === field.path;
    const fieldValue = getValueByPath(localContent, field.path);
    
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return (
          <div 
            className={`space-y-2 transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
            <div className="flex items-center space-x-2">
              <FieldIcon className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-900">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {isHighlighted && (
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Selected from preview
                </div>
              )}
            </div>
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
            <input
              type={field.type}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field, e.target.value)}
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
          <div 
            className={`transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
            <RichTextEditor
              label={field.label + (field.required ? ' *' : '')}
              value={fieldValue}
              onChange={(value) => handleFieldChange(field, value)}
              description={field.description}
              placeholder={field.placeholder}
            />
            {isHighlighted && (
              <div className="mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium inline-block">
                Selected from preview
              </div>
            )}
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="mt-2 space-y-1">
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
          <div 
            className={`transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
            <ImagePreview
              label={field.label + (field.required ? ' *' : '')}
              value={fieldValue}
              onChange={(value) => handleFieldChange(field, value)}
              description={field.description}
              placeholder={field.placeholder}
            />
            {isHighlighted && (
              <div className="mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium inline-block">
                Selected from preview
              </div>
            )}
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="mt-2 space-y-1">
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
          <div 
            className={`transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
            <DraggableList
              label={field.label + (field.required ? ' *' : '')}
              items={items}
              itemFields={field.itemFields || []}
              defaultItem={field.defaultItem || {}}
              onUpdate={(newItems) => handleArrayUpdate(field, newItems)}
              description={field.description}
            />
            {isHighlighted && (
              <div className="mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium inline-block">
                Selected from preview
              </div>
            )}
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="mt-2 space-y-1">
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

      case "select":
        return (
          <div 
            className={`space-y-2 transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
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
            <select
              value={fieldValue}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm ${
                fieldErrors ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

      case "number":
        return (
          <div 
            className={`space-y-2 transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
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
              type="number"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              min={field.min}
              max={field.max}
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

      case "boolean":
        return (
          <div 
            className={`space-y-2 transition-all duration-300 ${isHighlighted ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-2' : ''}`}
            ref={(el) => { if (el) editorRefs.current[field.id] = el; }}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={fieldValue || false}
                onChange={(e) => handleFieldChange(field, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-900">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {field.description && (
              <p className="text-xs text-gray-500 ml-7">{field.description}</p>
            )}
            {fieldErrors && fieldErrors.length > 0 && (
              <div className="ml-7 space-y-1">
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
          <div className="text-sm text-gray-500 italic">
            Field type not implemented: {field.type}
          </div>
        );
    }
  };

  const hasErrors = Object.values(validationErrors).some(errors => errors && errors.length > 0);
  const SectionIcon = getIconComponent(sectionSchema.icon);

  return (
    <div className="h-full flex">
      {/* Left Side - Live Preview */}
      <div className="w-1/2 pr-3 border-r border-gray-200">
        <div className="sticky top-0 h-full overflow-y-auto">
          <SectionPreview
            section={section}
            isVisible={showPreview}
            onToggleVisibility={() => setShowPreview(!showPreview)}
            onElementClick={handleElementClick}
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
                  <SectionIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    {sectionSchema.title}
                  </h1>
                  <p className="text-sm text-gray-600">{sectionSchema.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={onPreview}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <Monitor className="w-4 h-4" />
                  <span>Full Preview</span>
                </button>

                <button
                  onClick={onSave}
                  disabled={hasErrors}
                  className={`flex items-center space-x-2 px-4 py-1.5 text-sm font-medium text-white border rounded-lg transition-all duration-200 ${
                    hasErrors 
                      ? 'bg-gray-400 border-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 border-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
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

                {highlightedElement && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">Element selected from preview</span>
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
            {sectionSchema.sections.map((schemaSection, index) => {
              const SchemaSectionIcon = getIconComponent(schemaSection.icon);
              return (
                <div
                  key={schemaSection.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(schemaSection.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <SchemaSectionIcon className="w-4 h-4 text-gray-600" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        {schemaSection.title}
                      </h3>
                    </div>
                    {expandedSections.includes(schemaSection.id) ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {/* Section Content */}
                  {expandedSections.includes(schemaSection.id) && (
                    <div className="p-4">
                      <div className="space-y-6">
                        {schemaSection.fields.map((field) => (
                          <div key={field.id}>
                            {renderField(field)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};