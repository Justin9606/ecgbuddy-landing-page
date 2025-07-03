"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Eye,
  Settings,
  Type,
  Image,
  MousePointer,
  Layers,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Edit3,
  Palette,
  Layout,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Sparkles,
  Globe,
  Zap,
  Shield,
  Users,
  BarChart3,
  Smartphone,
  HelpCircle,
  Building2,
  Home,
} from "lucide-react";
import { useAdminEditing } from "@/lib/contexts/AdminEditingContext";

type SidebarTab = "structure" | "content" | "styles" | "settings";

export const EditingSidebar: React.FC = () => {
  const {
    selectedElement,
    setSelectedElement,
    isEditMode,
    setIsEditMode,
    updateElement,
    elements,
    saveChanges,
    publishChanges,
    isPublished,
    hasUnsavedChanges,
    pageStructure,
    addSection,
    removeSection,
    reorderSection,
    availableSections,
  } = useAdminEditing();

  const [activeTab, setActiveTab] = useState<SidebarTab>("structure");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showAddSection, setShowAddSection] = useState(false);

  // Get section icon based on section ID
  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case "hero-section": return Home;
      case "features-section": return Zap;
      case "pricing-section": return CreditCard;
      case "mobile-download-section": return Smartphone;
      case "faq-section": return HelpCircle;
      case "about-arpi-section": return Building2;
      default: return Layers;
    }
  };

  // Get section name from ID
  const getSectionName = (sectionId: string) => {
    const section = availableSections.find(s => s.id === sectionId);
    return section?.name || sectionId.replace("-section", "").replace("-", " ");
  };

  // Get section elements (child elements)
  const getSectionElements = (sectionId: string) => {
    return Object.values(elements).filter(
      element => element.metadata?.parent === sectionId
    );
  };

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Handle section reordering
  const moveSectionUp = (index: number) => {
    if (index > 0) {
      reorderSection(index, index - 1);
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < pageStructure.length - 1) {
      reorderSection(index, index + 1);
    }
  };

  // Handle adding new section
  const handleAddSection = (sectionId: string, atIndex?: number) => {
    addSection(sectionId, atIndex);
    setShowAddSection(false);
  };

  // Handle removing section
  const handleRemoveSection = (sectionId: string) => {
    if (confirm(`Are you sure you want to remove the ${getSectionName(sectionId)} section? This action cannot be undone.`)) {
      removeSection(sectionId);
    }
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case "text": return Type;
      case "image": return Image;
      case "button": return MousePointer;
      case "section": return Layers;
      case "card": return CreditCard;
      default: return Edit3;
    }
  };

  const tabs: Array<{ id: SidebarTab; label: string; icon: React.ComponentType<any> }> = [
    { id: "structure", label: "Structure", icon: Layout },
    { id: "content", label: "Content", icon: Type },
    { id: "styles", label: "Styles", icon: Palette },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderStructureTab = () => (
    <div className="space-y-4">
      {/* Page Structure Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Layout className="w-4 h-4 mr-2" />
          Page Structure
        </h3>
        <button
          onClick={() => setShowAddSection(!showAddSection)}
          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Add Section"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add Section Panel */}
      <AnimatePresence>
        {showAddSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3"
          >
            <h4 className="text-sm font-medium text-blue-900">Add New Section</h4>
            <div className="space-y-2">
              {availableSections
                .filter(section => !pageStructure.includes(section.id))
                .map((section) => {
                  const SectionIcon = getSectionIcon(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleAddSection(section.id)}
                      className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <SectionIcon className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                            {section.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {section.description}
                          </div>
                          <div className="text-xs text-blue-600 mt-1 font-medium">
                            {section.category}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
            {availableSections.filter(section => !pageStructure.includes(section.id)).length === 0 && (
              <div className="text-sm text-gray-500 text-center py-4">
                All available sections are already added to the page.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Page Sections */}
      <div className="space-y-2">
        {pageStructure.map((sectionId, index) => {
          const sectionElement = elements[sectionId];
          const sectionElements = getSectionElements(sectionId);
          const isExpanded = expandedSections[sectionId];
          const SectionIcon = getSectionIcon(sectionId);

          return (
            <motion.div
              key={sectionId}
              layout
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <button
                      onClick={() => toggleSection(sectionId)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-gray-600" />
                      )}
                    </button>
                    
                    <SectionIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    
                    <button
                      onClick={() => setSelectedElement(sectionElement)}
                      className={`text-sm font-medium truncate text-left transition-colors ${
                        selectedElement?.id === sectionId
                          ? "text-blue-600"
                          : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      {getSectionName(sectionId)}
                    </button>
                    
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      {sectionElements.length}
                    </span>
                  </div>

                  {/* Section Controls */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveSectionUp(index)}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => moveSectionDown(index)}
                      disabled={index === pageStructure.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Down"
                    >
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>
                    
                    <button
                      onClick={() => handleRemoveSection(sectionId)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove Section"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section Elements */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 space-y-2"
                  >
                    {sectionElements.length > 0 ? (
                      sectionElements.map((element) => {
                        const ElementIcon = getElementIcon(element.type);
                        return (
                          <button
                            key={element.id}
                            onClick={() => setSelectedElement(element)}
                            className={`w-full text-left p-2 rounded-lg transition-colors flex items-center space-x-2 ${
                              selectedElement?.id === element.id
                                ? "bg-blue-100 text-blue-900 border border-blue-200"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <ElementIcon className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs font-medium truncate">
                              {element.label}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
                              {element.type}
                            </span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-xs text-gray-500 text-center py-2">
                        No editable elements
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {pageStructure.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Layout className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No sections added yet</p>
          <p className="text-xs mt-1">Click the + button to add your first section</p>
        </div>
      )}
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-4">
      {selectedElement ? (
        <>
          <div className="flex items-center space-x-2 mb-4">
            {React.createElement(getElementIcon(selectedElement.type), {
              className: "w-4 h-4 text-blue-600"
            })}
            <h3 className="text-sm font-semibold text-gray-900">
              {selectedElement.label}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
              {selectedElement.type}
            </span>
          </div>

          {selectedElement.type === "text" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Content
                </label>
                <textarea
                  value={selectedElement.content?.text || ""}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, text: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Enter text content..."
                />
              </div>
            </div>
          )}

          {selectedElement.type === "button" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={selectedElement.content?.text || ""}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, text: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Button text..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <input
                  type="text"
                  value={selectedElement.content?.href || ""}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, href: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {selectedElement.type === "section" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={selectedElement.content?.title || ""}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Section title..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Section Subtitle
                </label>
                <textarea
                  value={selectedElement.content?.subtitle || ""}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Section subtitle..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={selectedElement.content?.badge || ""}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, badge: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Badge text..."
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select an element to edit its content</p>
        </div>
      )}
    </div>
  );

  const renderStylesTab = () => (
    <div className="space-y-4">
      {selectedElement ? (
        <>
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Style {selectedElement.label}
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select
                value={selectedElement.styles?.fontSize || ""}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, fontSize: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Font Weight
              </label>
              <select
                value={selectedElement.styles?.fontWeight || ""}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, fontWeight: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Default</option>
                <option value="font-light">Light</option>
                <option value="font-normal">Normal</option>
                <option value="font-medium">Medium</option>
                <option value="font-semibold">Semibold</option>
                <option value="font-bold">Bold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <select
                value={selectedElement.styles?.color || ""}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, color: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Default</option>
                <option value="text-gray-900">Dark Gray</option>
                <option value="text-gray-600">Medium Gray</option>
                <option value="text-gray-500">Light Gray</option>
                <option value="text-red-600">Red</option>
                <option value="text-blue-600">Blue</option>
                <option value="text-green-600">Green</option>
                <option value="text-purple-600">Purple</option>
                <option value="text-white">White</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select an element to edit its styles</p>
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">Page Settings</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm font-medium text-gray-900">Edit Mode</div>
            <div className="text-xs text-gray-500">Enable/disable editing interface</div>
          </div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isEditMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isEditMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-900 mb-2">Page Status</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Published</span>
              <span className={`px-2 py-1 rounded-full ${
                isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>
                {isPublished ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Unsaved Changes</span>
              <span className={`px-2 py-1 rounded-full ${
                hasUnsavedChanges ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
              }`}>
                {hasUnsavedChanges ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Total Sections</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {pageStructure.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Total Elements</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                {Object.keys(elements).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Page Editor</h2>
              <p className="text-xs text-gray-500">ECG Buddy Landing Page</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              hasUnsavedChanges ? "bg-yellow-400" : "bg-green-400"
            }`}></div>
            <span className="text-xs text-gray-500">
              {hasUnsavedChanges ? "Unsaved" : "Saved"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={saveChanges}
            disabled={!hasUnsavedChanges}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={publishChanges}
            disabled={!hasUnsavedChanges}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "structure" && renderStructureTab()}
        {activeTab === "content" && renderContentTab()}
        {activeTab === "styles" && renderStylesTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  );
};