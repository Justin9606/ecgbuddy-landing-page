"use client";

import React, { useState } from "react";
import { useAdminEditing } from "@/lib/contexts/AdminEditingContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Type,
  Image,
  MousePointer,
  Palette,
  Settings,
  Save,
  X,
  Eye,
  EyeOff,
  Layers,
  Code,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

export const EditingSidebar: React.FC = () => {
  const {
    selectedElement,
    setSelectedElement,
    isEditMode,
    setIsEditMode,
    updateElement,
  } = useAdminEditing();

  const [activeTab, setActiveTab] = useState<"content" | "style" | "settings">("content");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const handleContentChange = (field: string, value: any) => {
    if (!selectedElement) return;
    
    const updatedContent = {
      ...selectedElement.content,
      [field]: value,
    };
    
    updateElement(selectedElement.id, { content: updatedContent });
  };

  const handleStyleChange = (property: string, value: string) => {
    if (!selectedElement) return;
    
    const updatedStyles = {
      ...selectedElement.styles,
      [property]: value,
    };
    
    updateElement(selectedElement.id, { styles: updatedStyles });
  };

  const tabs = [
    { id: "content", label: "Content", icon: Type },
    { id: "style", label: "Style", icon: Palette },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const previewModes = [
    { id: "desktop", icon: Monitor, label: "Desktop" },
    { id: "tablet", icon: Tablet, label: "Tablet" },
    { id: "mobile", icon: Smartphone, label: "Mobile" },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Editor</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`p-2 rounded-lg transition-colors ${
                isEditMode
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            >
              {isEditMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Preview Mode Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          {previewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setPreviewMode(mode.id as any)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                previewMode === mode.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <mode.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedElement ? (
          <div className="h-full flex flex-col">
            {/* Element Info */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{selectedElement.label}</h3>
                  <p className="text-sm text-gray-500 capitalize">{selectedElement.type} element</p>
                </div>
                <button
                  onClick={() => setSelectedElement(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === "content" && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {selectedElement.type === "text" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Text Content
                          </label>
                          <textarea
                            value={selectedElement.content?.text || ""}
                            onChange={(e) => handleContentChange("text", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="Enter text content..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Font Size
                          </label>
                          <select
                            value={selectedElement.styles?.fontSize || ""}
                            onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Default</option>
                            <option value="text-sm">Small</option>
                            <option value="text-base">Base</option>
                            <option value="text-lg">Large</option>
                            <option value="text-xl">Extra Large</option>
                            <option value="text-2xl">2X Large</option>
                            <option value="text-3xl">3X Large</option>
                          </select>
                        </div>
                      </>
                    )}

                    {selectedElement.type === "button" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Button Text
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.text || ""}
                            onChange={(e) => handleContentChange("text", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Button text..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link URL
                          </label>
                          <input
                            type="url"
                            value={selectedElement.content?.href || ""}
                            onChange={(e) => handleContentChange("href", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                      </>
                    )}

                    {selectedElement.type === "image" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                          </label>
                          <input
                            type="url"
                            value={selectedElement.content?.src || ""}
                            onChange={(e) => handleContentChange("src", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.alt || ""}
                            onChange={(e) => handleContentChange("alt", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Image description..."
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {activeTab === "style" && (
                  <motion.div
                    key="style"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={selectedElement.styles?.backgroundColor || "#ffffff"}
                          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          value={selectedElement.styles?.backgroundColor || ""}
                          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={selectedElement.styles?.color || "#000000"}
                          onChange={(e) => handleStyleChange("color", e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          value={selectedElement.styles?.color || ""}
                          onChange={(e) => handleStyleChange("color", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Padding
                      </label>
                      <select
                        value={selectedElement.styles?.padding || ""}
                        onChange={(e) => handleStyleChange("padding", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Default</option>
                        <option value="p-2">Small</option>
                        <option value="p-4">Medium</option>
                        <option value="p-6">Large</option>
                        <option value="p-8">Extra Large</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Border Radius
                      </label>
                      <select
                        value={selectedElement.styles?.borderRadius || ""}
                        onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">None</option>
                        <option value="rounded-sm">Small</option>
                        <option value="rounded">Medium</option>
                        <option value="rounded-lg">Large</option>
                        <option value="rounded-xl">Extra Large</option>
                        <option value="rounded-full">Full</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Element ID
                      </label>
                      <input
                        type="text"
                        value={selectedElement.id}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Element Type
                      </label>
                      <input
                        type="text"
                        value={selectedElement.type}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 capitalize"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedElement.metadata?.visible !== false}
                          onChange={(e) => {
                            const updatedMetadata = {
                              ...selectedElement.metadata,
                              visible: e.target.checked,
                            };
                            updateElement(selectedElement.id, { metadata: updatedMetadata });
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Visible</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom CSS Classes
                      </label>
                      <textarea
                        value={selectedElement.styles?.customClasses || ""}
                        onChange={(e) => handleStyleChange("customClasses", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="custom-class another-class"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Button */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Element Selected</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Click on any element in the preview to start editing its content, style, and settings.
              </p>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 mb-2">
                  <Layers className="w-4 h-4" />
                  <span className="text-sm font-medium">Quick Tips</span>
                </div>
                <ul className="text-xs text-blue-600 space-y-1 text-left">
                  <li>• Hover over elements to see edit options</li>
                  <li>• Use the preview modes to test responsiveness</li>
                  <li>• Changes are saved automatically</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};