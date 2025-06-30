"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Eye,
  RotateCcw,
  Type,
  Image,
  Palette,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { SiteContent } from "@/lib/admin/types";

interface LiveEditorProps {
  selectedPath: string | null;
  siteContent: SiteContent;
  onContentChange: (path: string, value: any) => void;
  onSave: () => void;
  onPreview: () => void;
  onClose: () => void;
}

export const LiveEditor: React.FC<LiveEditorProps> = ({
  selectedPath,
  siteContent,
  onContentChange,
  onSave,
  onPreview,
  onClose,
}) => {
  const [localValue, setLocalValue] = useState<any>("");
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["content"]);

  // Get current value from path
  const getCurrentValue = (path: string) => {
    const pathArray = path.split('.');
    let current: any = siteContent;
    
    for (const key of pathArray) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return "";
      }
    }
    
    return current || "";
  };

  // Update local value when selected path changes
  useEffect(() => {
    if (selectedPath) {
      const currentValue = getCurrentValue(selectedPath);
      setLocalValue(currentValue);
      setHasChanges(false);
    }
  }, [selectedPath, siteContent]);

  // Handle value change
  const handleValueChange = (value: any) => {
    setLocalValue(value);
    setHasChanges(true);
  };

  // Apply changes
  const applyChanges = () => {
    if (selectedPath && hasChanges) {
      onContentChange(selectedPath, localValue);
      setHasChanges(false);
    }
  };

  // Reset changes
  const resetChanges = () => {
    if (selectedPath) {
      const currentValue = getCurrentValue(selectedPath);
      setLocalValue(currentValue);
      setHasChanges(false);
    }
  };

  // Toggle section
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Get field type based on path and value
  const getFieldType = (path: string, value: any) => {
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (path.includes('color') || path.includes('gradient')) return 'color';
    if (path.includes('image') || path.includes('avatar') || path.includes('icon')) return 'select';
    if (typeof value === 'string' && value.length > 100) return 'textarea';
    return 'text';
  };

  // Get field label from path
  const getFieldLabel = (path: string) => {
    const pathArray = path.split('.');
    const lastKey = pathArray[pathArray.length - 1];
    return lastKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Render field based on type
  const renderField = (type: string, value: any, onChange: (value: any) => void) => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
            rows={4}
            placeholder="Enter text..."
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            placeholder="Enter number..."
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Enable</span>
          </label>
        );

      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              placeholder="#000000"
            />
          </div>
        );

      case 'select':
        const options = ['Heart', 'Brain', 'Shield', 'Zap', 'Activity', 'Users', 'Star', 'Target', 'Clock'];
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            placeholder="Enter text..."
          />
        );
    }
  };

  if (!selectedPath) {
    return (
      <div className="h-full flex items-center justify-center text-center p-6">
        <div>
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Element Selected</h3>
          <p className="text-gray-500">Click on any element in the preview to start editing</p>
        </div>
      </div>
    );
  }

  const fieldType = getFieldType(selectedPath, localValue);
  const fieldLabel = getFieldLabel(selectedPath);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Type className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Edit Content</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content Path */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="text-xs text-gray-500 font-mono">{selectedPath}</div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Content Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("content")}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Content</span>
            </div>
            {expandedSections.includes("content") ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes("content") && (
            <div className="px-4 pb-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  {fieldLabel}
                </label>
                {renderField(fieldType, localValue, handleValueChange)}
                
                {hasChanges && (
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-600">Unsaved changes</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Style Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("style")}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Style</span>
            </div>
            {expandedSections.includes("style") ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes("style") && (
            <div className="px-4 pb-4">
              <div className="text-sm text-gray-500">
                Style options coming soon...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="flex space-x-2">
          <button
            onClick={applyChanges}
            disabled={!hasChanges}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              hasChanges
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Apply</span>
          </button>
          
          <button
            onClick={resetChanges}
            disabled={!hasChanges}
            className={`flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              hasChanges
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onPreview}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={onSave}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>
    </div>
  );
};