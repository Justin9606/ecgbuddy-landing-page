"use client";

import React, { useState } from "react";
import { useAdminEditing } from "@/lib/contexts/AdminEditingContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Eye,
  Settings,
  Type,
  Image,
  Layers,
  CreditCard,
  Edit3,
  Palette,
  Link,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Crown,
  Building2,
  Zap,
} from "lucide-react";

export const EditingSidebar: React.FC = () => {
  const {
    selectedElement,
    setSelectedElement,
    updateElement,
    saveChanges,
    publishChanges,
    isPublished,
    hasUnsavedChanges,
  } = useAdminEditing();

  const [activeTab, setActiveTab] = useState<"content" | "style" | "settings">("content");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    content: true,
    style: false,
    settings: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleContentChange = (field: string, value: any) => {
    if (!selectedElement) return;
    
    updateElement(selectedElement.id, {
      content: { ...selectedElement.content, [field]: value }
    });
  };

  const handleStyleChange = (field: string, value: any) => {
    if (!selectedElement) return;
    
    updateElement(selectedElement.id, {
      styles: { ...selectedElement.styles, [field]: value }
    });
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case "text": return Type;
      case "image": return Image;
      case "section": return Layers;
      case "card": return CreditCard;
      default: return Edit3;
    }
  };

  const getIconOptions = () => [
    { value: "Zap", label: "Zap", icon: Zap },
    { value: "Crown", label: "Crown", icon: Crown },
    { value: "Building2", label: "Building", icon: Building2 },
    { value: "Sparkles", label: "Sparkles", icon: Sparkles },
  ];

  const renderContentEditor = () => {
    if (!selectedElement) return null;

    const { type, content } = selectedElement;

    switch (type) {
      case "text":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={content?.text || ""}
                onChange={(e) => handleContentChange("text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Enter text content..."
              />
            </div>
          </div>
        );

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={content?.text || ""}
                onChange={(e) => handleContentChange("text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Button text..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link URL
              </label>
              <input
                type="text"
                value={content?.href || ""}
                onChange={(e) => handleContentChange("href", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>
        );

      case "card":
        return (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Card Information
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={content?.name || ""}
                  onChange={(e) => handleContentChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Plan name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={content?.description || ""}
                  onChange={(e) => handleContentChange("description", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                  placeholder="Plan description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={content?.badge || ""}
                  onChange={(e) => handleContentChange("badge", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Badge text (optional)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={content?.buttonText || ""}
                  onChange={(e) => handleContentChange("buttonText", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Button text..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={content?.buttonLink || ""}
                  onChange={(e) => handleContentChange("buttonLink", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Button link..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={content?.isPopular || false}
                  onChange={(e) => handleContentChange("isPopular", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">
                  Popular Plan
                </label>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Features</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features List (one per line)
                </label>
                <textarea
                  value={content?.features?.join('\n') || ""}
                  onChange={(e) => handleContentChange("features", e.target.value.split('\n').filter(f => f.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={6}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3..."
                />
              </div>
            </div>

            {/* Icon Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Icon</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Icon
                </label>
                <select
                  value={content?.icon || "Zap"}
                  onChange={(e) => handleContentChange("icon", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getIconOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <Edit3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Select an element to edit its content</p>
          </div>
        );
    }
  };

  const renderStyleEditor = () => {
    if (!selectedElement) return null;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gradient Colors
          </label>
          <select
            value={selectedElement.styles?.gradient || ""}
            onChange={(e) => handleStyleChange("gradient", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="from-red-500 to-pink-600">Red to Pink</option>
            <option value="from-blue-500 to-indigo-600">Blue to Indigo</option>
            <option value="from-green-500 to-emerald-600">Green to Emerald</option>
            <option value="from-purple-500 to-violet-600">Purple to Violet</option>
            <option value="from-slate-500 to-slate-600">Slate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={selectedElement.styles?.fontSize || ""}
            onChange={(e) => handleStyleChange("fontSize", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="text-xs">Extra Small</option>
            <option value="text-sm">Small</option>
            <option value="text-base">Base</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
            <option value="text-2xl">2X Large</option>
            <option value="text-3xl">3X Large</option>
            <option value="text-4xl">4X Large</option>
            <option value="text-5xl">5X Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Weight
          </label>
          <select
            value={selectedElement.styles?.fontWeight || ""}
            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="font-light">Light</option>
            <option value="font-normal">Normal</option>
            <option value="font-medium">Medium</option>
            <option value="font-semibold">Semibold</option>
            <option value="font-bold">Bold</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
          {selectedElement && (
            <button
              onClick={() => setSelectedElement(null)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Save/Publish Actions */}
        <div className="space-y-2">
          <button
            onClick={saveChanges}
            disabled={!hasUnsavedChanges}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              hasUnsavedChanges
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>

          <button
            onClick={publishChanges}
            disabled={!hasUnsavedChanges}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              hasUnsavedChanges
                ? "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Publish Live</span>
          </button>

          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 text-xs">
            {isPublished ? (
              <>
                <Check className="w-3 h-3 text-green-500" />
                <span className="text-green-600">Published</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-orange-500" />
                <span className="text-orange-600">Draft</span>
              </>
            )}
            {hasUnsavedChanges && (
              <span className="text-orange-600">• Unsaved changes</span>
            )}
          </div>
        </div>
      </div>

      {/* Selected Element Info */}
      {selectedElement && (
        <div className="p-6 border-b border-gray-200 bg-blue-50/50">
          <div className="flex items-center space-x-3">
            {React.createElement(getElementIcon(selectedElement.type), {
              className: "w-5 h-5 text-blue-600"
            })}
            <div>
              <h3 className="font-medium text-gray-900">{selectedElement.label}</h3>
              <p className="text-sm text-gray-500 capitalize">{selectedElement.type} element</p>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {selectedElement ? (
          <div className="p-6">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              {[
                { id: "content", label: "Content", icon: Type },
                { id: "style", label: "Style", icon: Palette },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "content" && renderContentEditor()}
                {activeTab === "style" && renderStyleEditor()}
                {activeTab === "settings" && (
                  <div className="text-center py-8 text-gray-500">
                    <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Settings panel coming soon</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-gray-500">
              <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Element Selected</h3>
              <p className="text-sm">Click on any element in the page to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};