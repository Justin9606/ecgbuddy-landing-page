"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import {
  Save,
  Eye,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Edit3,
  Monitor,
  Target,
  Search,
  Filter,
  Keyboard,
  Clock,
  Undo,
  Redo,
  Copy,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { AdminSection } from "./AdminDashboard";
import { RichTextEditor } from "./fields/RichTextEditor";
import { ImagePreview } from "./fields/ImagePreview";
import { DraggableList } from "./fields/DraggableList";
import { StaticPreview } from "./StaticPreview";
import { getSectionSchema, validateFieldValue, FieldSchema } from "@/lib/admin/contentSchemas";
import { getIconComponent } from "@/lib/utils/icons";
import { useAutoSave } from "@/lib/admin/autoSave";
import { useKeyboardShortcuts, createAdminShortcuts } from "@/lib/admin/keyboardShortcuts";
import { useToast, createToastHelpers } from "./Toast";

interface EnhancedContentEditorProps {
  section: AdminSection;
  initialContent: any;
  onContentChange: (newContent: any) => void;
  onSave: () => void;
  onPreview: () => void;
  lastSaved?: Date | null;
}

// Memoized field renderer to prevent unnecessary re-renders
const FieldRenderer = memo(({ 
  field, 
  fieldValue, 
  fieldErrors, 
  onFieldChange, 
  onArrayUpdate 
}: {
  field: FieldSchema;
  fieldValue: any;
  fieldErrors?: string[];
  onFieldChange: (field: FieldSchema, value: any) => void;
  onArrayUpdate: (field: FieldSchema, newArray: any[]) => void;
}) => {
  const FieldIcon = getIconComponent(
    field.type === 'richtext' ? 'FileText' : 
    field.type === 'email' || field.type === 'url' ? 'Link' : 
    field.type === 'image' ? 'Image' : 
    field.type === 'draggable' ? 'Settings' : 'Type'
  );
  
  const commonProps = {
    className: "space-y-2 transition-all duration-200",
  };
  
  switch (field.type) {
    case "text":
    case "email":
    case "url":
      return (
        <div {...commonProps}>
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
            onChange={(e) => onFieldChange(field, e.target.value)}
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
          <RichTextEditor
            label={field.label + (field.required ? ' *' : '')}
            value={fieldValue || ''}
            onChange={(value) => onFieldChange(field, value)}
            description={field.description}
            placeholder={field.placeholder}
          />
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
        <div {...commonProps}>
          <ImagePreview
            label={field.label + (field.required ? ' *' : '')}
            value={fieldValue || ''}
            onChange={(value) => onFieldChange(field, value)}
            description={field.description}
            placeholder={field.placeholder}
          />
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
        <div {...commonProps}>
          <DraggableList
            label={field.label + (field.required ? ' *' : '')}
            items={items}
            itemFields={field.itemFields || []}
            defaultItem={field.defaultItem || {}}
            onUpdate={(newItems) => onArrayUpdate(field, newItems)}
            description={field.description}
          />
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

    default:
      return (
        <div className="text-sm text-gray-500 italic">
          Field type not implemented: {field.type}
        </div>
      );
  }
});

FieldRenderer.displayName = 'FieldRenderer';

export const EnhancedContentEditor: React.FC<EnhancedContentEditorProps> = ({ 
  section, 
  initialContent, 
  onContentChange, 
  onSave, 
  onPreview,
  lastSaved 
}) => {
  const [localContent, setLocalContent] = useState(initialContent);
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic-info"]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [showPreview, setShowPreview] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [contentHistory, setContentHistory] = useState<any[]>([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const editorRefs = useRef<Record<string, HTMLElement>>({});

  // Toast notifications
  const { showToast } = useToast();
  const toast = createToastHelpers(showToast);

  // Get schema for current section
  const sectionSchema = getSectionSchema(section);

  // Content history management functions
  const addToHistory = useCallback((content: any) => {
    setContentHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(content))); // Deep clone
      
      // Limit history to 20 items for performance
      if (newHistory.length > 20) {
        newHistory.shift();
        return newHistory;
      } else {
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      }
    });
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setLocalContent(contentHistory[newIndex]);
      setIsDirty(true);
      toast.info("Undone");
    }
  }, [historyIndex, contentHistory, toast]);

  const handleRedo = useCallback(() => {
    if (historyIndex < contentHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setLocalContent(contentHistory[newIndex]);
      setIsDirty(true);
      toast.info("Redone");
    }
  }, [historyIndex, contentHistory, toast]);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      await onSave();
      setIsDirty(false);
      toast.saveSuccess();
    } catch (error) {
      toast.saveError("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  }, [onSave, toast]);

  // Auto-save functionality with enhanced debouncing
  const autoSaveCallback = useCallback((content: any) => {
    onContentChange(content);
    setIsDirty(false);
  }, [onContentChange]);

  const { isSaving, lastSaved: autoSaveLastSaved, saveError } = useAutoSave(
    localContent,
    autoSaveCallback,
    true
  );

  // Enhanced keyboard shortcuts
  const shortcuts = useMemo(() => createAdminShortcuts({
    onSave: handleSave,
    onPreview,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onSearch: () => {
      const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement;
      searchInput?.focus();
    },
    onHelp: () => setShowKeyboardHelp(true),
  }), [handleSave, onPreview, handleUndo, handleRedo]);

  useKeyboardShortcuts(shortcuts);

  // Update local content when initialContent changes
  useEffect(() => {
    setLocalContent(initialContent);
    setValidationErrors({});
    setContentHistory([initialContent]);
    setHistoryIndex(0);
    setIsDirty(false);
  }, [initialContent]);

  // Show save error toast
  useEffect(() => {
    if (saveError) {
      toast.saveError(saveError);
    }
  }, [saveError, toast]);

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

  const handleFieldChange = useCallback((field: FieldSchema, value: any) => {
    // Validate field
    const fieldErrors = validateFieldValue(value, field);
    setValidationErrors(prev => ({
      ...prev,
      [field.id]: fieldErrors.length > 0 ? fieldErrors : undefined
    }));

    if (fieldErrors.length > 0) {
      toast.validationError(fieldErrors[0]);
    }

    setLocalContent((prev: any) => {
      const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
      setValueByPath(newContent, field.path, value);
      
      // Add to history for undo/redo (debounced)
      setTimeout(() => addToHistory(newContent), 100);
      
      setIsDirty(true);
      return newContent;
    });
  }, [addToHistory, toast]);

  const handleArrayUpdate = useCallback((field: FieldSchema, newArray: any[]) => {
    setLocalContent((prev: any) => {
      const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
      setValueByPath(newContent, field.path, newArray);
      
      // Add to history for undo/redo (debounced)
      setTimeout(() => addToHistory(newContent), 100);
      
      setIsDirty(true);
      return newContent;
    });
  }, [addToHistory]);

  const handleReset = useCallback(() => {
    setLocalContent(initialContent);
    setValidationErrors({});
    setContentHistory([initialContent]);
    setHistoryIndex(0);
    setIsDirty(false);
    toast.info("Content reset to last saved version");
  }, [initialContent, toast]);

  const handleDuplicateSection = useCallback(() => {
    const duplicatedContent = JSON.parse(JSON.stringify(localContent));
    setLocalContent(duplicatedContent);
    addToHistory(duplicatedContent);
    setIsDirty(true);
    toast.success("Section duplicated");
  }, [localContent, addToHistory, toast]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  // Filter fields based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sectionSchema.sections;
    
    return sectionSchema.sections.map(section => ({
      ...section,
      fields: section.fields.filter(field => 
        field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.fields.length > 0);
  }, [sectionSchema.sections, searchQuery]);

  const hasErrors = Object.values(validationErrors).some(errors => errors && errors.length > 0);
  const SectionIcon = getIconComponent(sectionSchema.icon);

  return (
    <div className="h-full flex">
      {/* Left Side - Live Preview */}
      <div className="w-1/2 pr-3 border-r border-gray-200">
        <div className="sticky top-0 h-full overflow-y-auto">
          <StaticPreview
            section={section}
            isVisible={showPreview}
            onToggleVisibility={() => setShowPreview(!showPreview)}
          />
        </div>
      </div>

      {/* Right Side - Enhanced Content Editor */}
      <div className="w-1/2 pl-3">
        <div className="h-full overflow-y-auto">
          {/* Enhanced Header */}
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

              <div className="flex items-center space-x-2">
                {/* Undo/Redo */}
                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo className="w-3 h-3" />
                </button>

                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= contentHistory.length - 1}
                  className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo className="w-3 h-3" />
                </button>

                {/* Utility Actions */}
                <button
                  onClick={handleDuplicateSection}
                  className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  title="Duplicate Section"
                >
                  <Copy className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setShowKeyboardHelp(true)}
                  className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  title="Keyboard shortcuts"
                >
                  <Keyboard className="w-3 h-3" />
                </button>

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
                  onClick={handleSave}
                  disabled={hasErrors || isLoading}
                  className={`flex items-center space-x-2 px-4 py-1.5 text-sm font-medium text-white border rounded-lg transition-all duration-200 ${
                    hasErrors || isLoading
                      ? 'bg-gray-400 border-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 border-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isLoading ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search fields..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-search-input
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

            {/* Enhanced Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isSaving ? (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Auto-saving...</span>
                  </div>
                ) : isDirty ? (
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

                {/* History Status */}
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {historyIndex + 1}/{contentHistory.length} changes
                  </span>
                </div>
              </div>
              
              {(lastSaved || autoSaveLastSaved) && (
                <div className="text-xs text-gray-500">
                  Last saved: {(autoSaveLastSaved || lastSaved)?.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 pb-8">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No fields found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </div>
            ) : (
              filteredSections.map((schemaSection, index) => {
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
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                          {schemaSection.fields.length} fields
                        </span>
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
                            <FieldRenderer
                              key={field.id}
                              field={field}
                              fieldValue={getValueByPath(localContent, field.path)}
                              fieldErrors={validationErrors[field.id]}
                              onFieldChange={handleFieldChange}
                              onArrayUpdate={handleArrayUpdate}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-2">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                    {shortcut.ctrlKey && 'Ctrl + '}{shortcut.key.toUpperCase()}
                  </kbd>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};