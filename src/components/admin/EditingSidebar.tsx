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
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

export const EditingSidebar: React.FC = () => {
  const {
    selectedElement,
    setSelectedElement,
    isEditMode,
    setIsEditMode,
    updateElement,
    saveChanges,
    loadInitialContent,
    elements,
  } = useAdminEditing();

  const [activeTab, setActiveTab] = useState<"content" | "style" | "settings">("content");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveChanges();
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      setIsSaving(false);
    }
  };

  const handleExportContent = () => {
    const dataStr = JSON.stringify(elements, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ecg-buddy-content.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        Object.keys(content).forEach(id => {
          updateElement(id, content[id]);
        });
        alert('Content imported successfully!');
      } catch (error) {
        alert('Failed to import content. Please check the file format.');
      }
    };
    reader.readAsText(file);
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
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
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

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleExportContent}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Export Content"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <label className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer" title="Import Content">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".json"
              onChange={handleImportContent}
              className="hidden"
            />
          </label>
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
                  <p className="text-xs text-gray-400">ID: {selectedElement.id}</p>
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
                          <p className="text-xs text-gray-500 mt-1">
                            Tip: You can also double-click the text on the page to edit inline
                          </p>
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
                            <option value="text-xs">Extra Small</option>
                            <option value="text-sm">Small</option>
                            <option value="text-base">Base</option>
                            <option value="text-lg">Large</option>
                            <option value="text-xl">Extra Large</option>
                            <option value="text-2xl">2X Large</option>
                            <option value="text-3xl">3X Large</option>
                            <option value="text-4xl">4X Large</option>
                            <option value="text-5xl">5X Large</option>
                            <option value="text-6xl">6X Large</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Font Weight
                          </label>
                          <select
                            value={selectedElement.styles?.fontWeight || ""}
                            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Default</option>
                            <option value="font-light">Light</option>
                            <option value="font-normal">Normal</option>
                            <option value="font-medium">Medium</option>
                            <option value="font-semibold">Semibold</option>
                            <option value="font-bold">Bold</option>
                            <option value="font-extrabold">Extra Bold</option>
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

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Button Style
                          </label>
                          <select
                            value={selectedElement.styles?.buttonStyle || "primary"}
                            onChange={(e) => handleStyleChange("buttonStyle", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="outline">Outline</option>
                            <option value="ghost">Ghost</option>
                          </select>
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

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Size
                          </label>
                          <select
                            value={selectedElement.styles?.imageSize || ""}
                            onChange={(e) => handleStyleChange("imageSize", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Default</option>
                            <option value="w-32 h-32">Small (128px)</option>
                            <option value="w-48 h-48">Medium (192px)</option>
                            <option value="w-64 h-64">Large (256px)</option>
                            <option value="w-full">Full Width</option>
                          </select>
                        </div>
                      </>
                    )}

                    {selectedElement.type === "section" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.title || ""}
                            onChange={(e) => handleContentChange("title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Section title..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Subtitle
                          </label>
                          <textarea
                            value={selectedElement.content?.subtitle || ""}
                            onChange={(e) => handleContentChange("subtitle", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            placeholder="Section subtitle..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Badge Text
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.badge || ""}
                            onChange={(e) => handleContentChange("badge", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Badge text..."
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
                          placeholder="#ffffff or gradient class"
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
                          placeholder="#000000 or color class"
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
                        <option value="p-0">None</option>
                        <option value="p-2">Small</option>
                        <option value="p-4">Medium</option>
                        <option value="p-6">Large</option>
                        <option value="p-8">Extra Large</option>
                        <option value="py-16">Vertical Large</option>
                        <option value="py-20">Vertical XL</option>
                        <option value="py-32">Vertical 2XL</option>
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
                        <option value="rounded-2xl">2X Large</option>
                        <option value="rounded-3xl">3X Large</option>
                        <option value="rounded-full">Full</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Alignment
                      </label>
                      <select
                        value={selectedElement.styles?.textAlign || ""}
                        onChange={(e) => handleStyleChange("textAlign", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Default</option>
                        <option value="text-left">Left</option>
                        <option value="text-center">Center</option>
                        <option value="text-right">Right</option>
                        <option value="text-justify">Justify</option>
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
                        Priority
                      </label>
                      <select
                        value={selectedElement.metadata?.priority || "medium"}
                        onChange={(e) => {
                          const updatedMetadata = {
                            ...selectedElement.metadata,
                            priority: e.target.value,
                          };
                          updateElement(selectedElement.id, { metadata: updatedMetadata });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={selectedElement.metadata?.notes || ""}
                        onChange={(e) => {
                          const updatedMetadata = {
                            ...selectedElement.metadata,
                            notes: e.target.value,
                          };
                          updateElement(selectedElement.id, { metadata: updatedMetadata });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Add notes about this element..."
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Element Selected</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Click on any element in the preview to start editing its content, style, and settings.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <Layers className="w-4 h-4" />
                    <span className="text-sm font-medium">Quick Tips</span>
                  </div>
                  <ul className="text-xs text-blue-600 space-y-1 text-left">
                    <li>• Hover over elements to see edit options</li>
                    <li>• Double-click text to edit inline</li>
                    <li>• Use the preview modes to test responsiveness</li>
                    <li>• Changes are saved automatically</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Content Management</span>
                  </div>
                  <ul className="text-xs text-green-600 space-y-1 text-left">
                    <li>• Export/import content as JSON</li>
                    <li>• All changes persist in localStorage</li>
                    <li>• Reset to defaults anytime</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};