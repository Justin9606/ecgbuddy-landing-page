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
  Copy,
  Trash2,
  Plus,
  Edit3,
  Layers,
  Code,
  Sparkles
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
  const [expandedSections, setExpandedSections] = useState<string[]>(["content", "properties"]);
  const [editMode, setEditMode] = useState<"visual" | "code">("visual");

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
    if (path.includes('email')) return 'email';
    if (path.includes('url') || path.includes('href') || path.includes('link')) return 'url';
    if (typeof value === 'string' && value.length > 100) return 'textarea';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object' && value !== null) return 'object';
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

  // Get field description
  const getFieldDescription = (path: string) => {
    const descriptions: Record<string, string> = {
      'hero.mainHeading.line1': 'First line of the main hero heading',
      'hero.mainHeading.line2': 'Second line of the main hero heading',
      'hero.subtitle': 'Supporting text below the main heading',
      'header.logoText': 'Main logo text displayed in the header',
      'features.sectionHeader.title': 'Main title for the features section',
      'features.sectionHeader.description': 'Description text for the features section',
    };
    return descriptions[path] || 'Edit this content';
  };

  // Render field based on type
  const renderField = (type: string, value: any, onChange: (value: any) => void) => {
    switch (type) {
      case 'textarea':
        return (
          <div className="space-y-2">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm resize-none font-medium"
              rows={6}
              placeholder="Enter text..."
            />
            <div className="text-xs text-gray-500">
              {value?.length || 0} characters
            </div>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium"
            placeholder="Enter number..."
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable this option</span>
          </label>
        );

      case 'color':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-mono"
                placeholder="#000000"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'].map(color => (
                <button
                  key={color}
                  onClick={() => onChange(color)}
                  className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        );

      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium"
            placeholder="Enter email address..."
          />
        );

      case 'url':
        return (
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium"
            placeholder="https://example.com"
          />
        );

      case 'select':
        const options = ['Heart', 'Brain', 'Shield', 'Zap', 'Activity', 'Users', 'Star', 'Target', 'Clock', 'Award', 'Building2'];
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'array':
        return (
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Array with {Array.isArray(value) ? value.length : 0} items
            </div>
            <button className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm">
              <Plus className="w-4 h-4 inline mr-2" />
              Add Item (Coming Soon)
            </button>
          </div>
        );

      case 'object':
        return (
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Object with {Object.keys(value || {}).length} properties
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-xs font-mono text-gray-600 max-h-32 overflow-y-auto">
              {JSON.stringify(value, null, 2)}
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium"
            placeholder="Enter text..."
          />
        );
    }
  };

  if (!selectedPath) {
    return (
      <div className="h-full flex items-center justify-center text-center p-6">
        <div>
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Element Selected</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Click on any element in the preview to start editing its content and properties.
          </p>
        </div>
      </div>
    );
  }

  const fieldType = getFieldType(selectedPath, localValue);
  const fieldLabel = getFieldLabel(selectedPath);
  const fieldDescription = getFieldDescription(selectedPath);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Content Path */}
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
        <div className="text-xs text-blue-600 font-mono mb-1">{selectedPath}</div>
        <div className="text-sm text-blue-800 font-medium">{fieldLabel}</div>
      </div>

      {/* Edit Mode Toggle */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setEditMode("visual")}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              editMode === "visual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Visual</span>
          </button>
          <button
            onClick={() => setEditMode("code")}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              editMode === "code"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code</span>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        {editMode === "visual" ? (
          <>
            {/* Content Section */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("content")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Type className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Content</div>
                    <div className="text-xs text-gray-500">{fieldDescription}</div>
                  </div>
                </div>
                {expandedSections.includes("content") ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expandedSections.includes("content") && (
                <div className="px-4 pb-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {fieldLabel}
                      </label>
                      {renderField(fieldType, localValue, handleValueChange)}
                    </div>
                    
                    {hasChanges && (
                      <motion.div
                        className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-700 font-medium">Unsaved changes</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Properties Section */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("properties")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Properties</div>
                    <div className="text-xs text-gray-500">Element attributes and settings</div>
                  </div>
                </div>
                {expandedSections.includes("properties") ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expandedSections.includes("properties") && (
                <div className="px-4 pb-4">
                  <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Advanced properties coming soon...
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
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-pink-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Styling</div>
                    <div className="text-xs text-gray-500">Colors, fonts, and layout</div>
                  </div>
                </div>
                {expandedSections.includes("style") ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {expandedSections.includes("style") && (
                <div className="px-4 pb-4">
                  <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Style options coming soon...
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Code Mode */
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Raw JSON Value
                </label>
                <textarea
                  value={JSON.stringify(localValue, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      handleValueChange(parsed);
                    } catch {
                      // Invalid JSON, don't update
                    }
                  }}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-mono resize-none"
                  rows={12}
                  placeholder="Enter valid JSON..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
        <div className="flex space-x-2">
          <motion.button
            onClick={applyChanges}
            disabled={!hasChanges}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              hasChanges
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={hasChanges ? { scale: 1.02 } : {}}
            whileTap={hasChanges ? { scale: 0.98 } : {}}
          >
            <Check className="w-4 h-4" />
            <span>Apply Changes</span>
          </motion.button>
          
          <button
            onClick={resetChanges}
            disabled={!hasChanges}
            className={`flex items-center justify-center px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              hasChanges
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            title="Reset Changes"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onPreview}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={onSave}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>
    </div>
  );
};