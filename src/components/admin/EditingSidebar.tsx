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
  Sparkles,
  Zap,
  Crown,
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
    <div className="w-full h-full flex flex-col">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Edit3 className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Content Editor</h2>
              <p className="text-sm text-gray-600">Customize your landing page</p>
            </div>
          </div>
          
          <motion.button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`p-3 rounded-xl transition-all duration-300 shadow-md ${
              isEditMode
                ? "bg-blue-500 text-white shadow-blue-500/25"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-gray-200"
            }`}
            title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Enhanced Preview Mode Selector */}
        <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 mb-6 shadow-sm border border-white/50">
          {previewModes.map((mode) => (
            <motion.button
              key={mode.id}
              onClick={() => setPreviewMode(mode.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex-1 justify-center ${
                previewMode === mode.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <mode.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{mode.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Enhanced Quick Actions */}
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-green-500/25 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.button>
          
          <motion.button
            onClick={handleExportContent}
            className="p-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white transition-all duration-300 shadow-md border border-white/50"
            title="Export Content"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
          </motion.button>
          
          <motion.label 
            className="p-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white transition-all duration-300 cursor-pointer shadow-md border border-white/50" 
            title="Import Content"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".json"
              onChange={handleImportContent}
              className="hidden"
            />
          </motion.label>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedElement ? (
          <div className="h-full flex flex-col">
            {/* Enhanced Element Info */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    {selectedElement.type === "text" && <Type className="w-6 h-6 text-white" />}
                    {selectedElement.type === "image" && <Image className="w-6 h-6 text-white" />}
                    {selectedElement.type === "button" && <MousePointer className="w-6 h-6 text-white" />}
                    {selectedElement.type === "section" && <Layers className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selectedElement.label}</h3>
                    <p className="text-sm text-gray-600 capitalize flex items-center space-x-2">
                      <span>{selectedElement.type} element</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="text-xs text-gray-400">ID: {selectedElement.id}</span>
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedElement(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Tabs */}
            <div className="flex border-b border-gray-200 bg-white">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 flex-1 justify-center ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Enhanced Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <AnimatePresence mode="wait">
                {activeTab === "content" && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {selectedElement.type === "text" && (
                      <>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <Type className="w-4 h-4 text-blue-500" />
                            <span>Text Content</span>
                          </label>
                          <textarea
                            value={selectedElement.content?.text || ""}
                            onChange={(e) => handleContentChange("text", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                            rows={4}
                            placeholder="Enter text content..."
                          />
                          <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Tip: You can also double-click the text on the page to edit inline</span>
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Font Size
                            </label>
                            <select
                              value={selectedElement.styles?.fontSize || ""}
                              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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

                          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Font Weight
                            </label>
                            <select
                              value={selectedElement.styles?.fontWeight || ""}
                              onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                        </div>
                      </>
                    )}

                    {selectedElement.type === "button" && (
                      <>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <MousePointer className="w-4 h-4 text-blue-500" />
                            <span>Button Text</span>
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.text || ""}
                            onChange={(e) => handleContentChange("text", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Button text..."
                          />
                        </div>
                        
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Link URL
                          </label>
                          <input
                            type="url"
                            value={selectedElement.content?.href || ""}
                            onChange={(e) => handleContentChange("href", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="https://..."
                          />
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Button Style
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { value: "primary", label: "Primary", icon: Crown },
                              { value: "secondary", label: "Secondary", icon: Zap },
                              { value: "outline", label: "Outline", icon: Code },
                              { value: "ghost", label: "Ghost", icon: Eye },
                            ].map((style) => (
                              <motion.button
                                key={style.value}
                                onClick={() => handleStyleChange("buttonStyle", style.value)}
                                className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                                  selectedElement.styles?.buttonStyle === style.value
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <style.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{style.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {selectedElement.type === "image" && (
                      <>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <Image className="w-4 h-4 text-blue-500" />
                            <span>Image URL</span>
                          </label>
                          <input
                            type="url"
                            value={selectedElement.content?.src || ""}
                            onChange={(e) => handleContentChange("src", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="https://..."
                          />
                        </div>
                        
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.alt || ""}
                            onChange={(e) => handleContentChange("alt", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Image description..."
                          />
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Image Size
                          </label>
                          <select
                            value={selectedElement.styles?.imageSize || ""}
                            onChange={(e) => handleStyleChange("imageSize", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <Layers className="w-4 h-4 text-blue-500" />
                            <span>Section Title</span>
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.title || ""}
                            onChange={(e) => handleContentChange("title", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Section title..."
                          />
                        </div>
                        
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Section Subtitle
                          </label>
                          <textarea
                            value={selectedElement.content?.subtitle || ""}
                            onChange={(e) => handleContentChange("subtitle", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                            rows={3}
                            placeholder="Section subtitle..."
                          />
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Badge Text
                          </label>
                          <input
                            type="text"
                            value={selectedElement.content?.badge || ""}
                            onChange={(e) => handleContentChange("badge", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-blue-500" />
                        <span>Background Color</span>
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="color"
                          value={selectedElement.styles?.backgroundColor || "#ffffff"}
                          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                          className="w-14 h-12 border border-gray-300 rounded-xl cursor-pointer"
                        />
                        <input
                          type="text"
                          value={selectedElement.styles?.backgroundColor || ""}
                          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="#ffffff or gradient class"
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Text Color
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="color"
                          value={selectedElement.styles?.color || "#000000"}
                          onChange={(e) => handleStyleChange("color", e.target.value)}
                          className="w-14 h-12 border border-gray-300 rounded-xl cursor-pointer"
                        />
                        <input
                          type="text"
                          value={selectedElement.styles?.color || ""}
                          onChange={(e) => handleStyleChange("color", e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="#000000 or color class"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Padding
                        </label>
                        <select
                          value={selectedElement.styles?.padding || ""}
                          onChange={(e) => handleStyleChange("padding", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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

                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Border Radius
                        </label>
                        <select
                          value={selectedElement.styles?.borderRadius || ""}
                          onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Text Alignment
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: "text-left", label: "Left" },
                          { value: "text-center", label: "Center" },
                          { value: "text-right", label: "Right" },
                          { value: "text-justify", label: "Justify" },
                        ].map((align) => (
                          <motion.button
                            key={align.value}
                            onClick={() => handleStyleChange("textAlign", align.value)}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                              selectedElement.styles?.textAlign === align.value
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {align.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Element ID
                      </label>
                      <input
                        type="text"
                        value={selectedElement.id}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Element Type
                      </label>
                      <input
                        type="text"
                        value={selectedElement.type}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 capitalize"
                      />
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="flex items-center space-x-3">
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
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-semibold text-gray-700">Visible</span>
                      </label>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Custom CSS Classes
                      </label>
                      <textarea
                        value={selectedElement.styles?.customClasses || ""}
                        onChange={(e) => handleStyleChange("customClasses", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                        rows={3}
                        placeholder="custom-class another-class"
                      />
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
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
            <div className="text-center max-w-md">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MousePointer className="w-10 h-10 text-blue-500" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Element Selected</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Click on any element in the preview to start editing its content, style, and settings.
              </p>
              
              <div className="space-y-4">
                <motion.div 
                  className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2 text-blue-700 mb-3">
                    <Layers className="w-5 h-5" />
                    <span className="text-sm font-bold">Quick Tips</span>
                  </div>
                  <ul className="text-xs text-blue-600 space-y-2 text-left">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Hover over elements to see edit options</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Double-click text to edit inline</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Use preview modes to test responsiveness</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Changes are saved automatically</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2 text-green-700 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">Content Management</span>
                  </div>
                  <ul className="text-xs text-green-600 space-y-2 text-left">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Export/import content as JSON</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>All changes persist in localStorage</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Reset to defaults anytime</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};