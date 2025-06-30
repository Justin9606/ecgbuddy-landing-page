"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Plus, Settings, Eye, Smartphone, Monitor, Tablet, Grid, Type, Image, Donut as Button, Layout, Heart, Star, Users, Clock, Shield, Zap, Brain, Activity, ChevronDown, ChevronRight, Trash2, Copy, Move, Edit, Save, Undo, Redo } from "lucide-react";

interface Component {
  id: string;
  type: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  props: Record<string, any>;
  children?: Component[];
}

interface PageSection {
  id: string;
  name: string;
  components: Component[];
}

export const PageBuilder: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: "section-1",
      name: "Hero Section",
      components: [],
    },
  ]);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  const componentLibrary = [
    {
      category: "Layout",
      components: [
        {
          id: "container",
          type: "container",
          name: "Container",
          icon: Layout,
          props: { maxWidth: "1200px", padding: "2rem" },
        },
        {
          id: "grid",
          type: "grid",
          name: "Grid",
          icon: Grid,
          props: { columns: 3, gap: "1rem" },
        },
        {
          id: "section",
          type: "section",
          name: "Section",
          icon: Layers,
          props: { background: "white", padding: "4rem 0" },
        },
      ],
    },
    {
      category: "Content",
      components: [
        {
          id: "heading",
          type: "heading",
          name: "Heading",
          icon: Type,
          props: { 
            text: "Your Heading Here", 
            level: "h2", 
            size: "2xl",
            color: "#1f2937",
            align: "left"
          },
        },
        {
          id: "paragraph",
          type: "paragraph",
          name: "Paragraph",
          icon: Type,
          props: { 
            text: "Your paragraph text goes here. This is a sample text that you can edit.",
            size: "base",
            color: "#6b7280",
            align: "left"
          },
        },
        {
          id: "image",
          type: "image",
          name: "Image",
          icon: Image,
          props: { 
            src: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
            alt: "Sample image",
            width: "100%",
            height: "300px",
            objectFit: "cover"
          },
        },
      ],
    },
    {
      category: "Interactive",
      components: [
        {
          id: "button",
          type: "button",
          name: "Button",
          icon: Button,
          props: { 
            text: "Click Me", 
            variant: "primary",
            size: "md",
            href: "#"
          },
        },
        {
          id: "card",
          type: "card",
          name: "Card",
          icon: Layout,
          props: { 
            title: "Card Title",
            description: "Card description goes here",
            image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400",
            background: "white",
            shadow: true
          },
        },
      ],
    },
    {
      category: "Medical",
      components: [
        {
          id: "feature-card",
          type: "feature-card",
          name: "Feature Card",
          icon: Heart,
          props: { 
            icon: "Heart",
            title: "AI-Powered Analysis",
            description: "Advanced machine learning for accurate ECG interpretation",
            gradient: "from-red-500 to-pink-600"
          },
        },
        {
          id: "stat-card",
          type: "stat-card",
          name: "Stat Card",
          icon: Activity,
          props: { 
            value: "99.2%",
            label: "Accuracy Rate",
            icon: "Target",
            color: "blue"
          },
        },
        {
          id: "testimonial",
          type: "testimonial",
          name: "Testimonial",
          icon: Users,
          props: { 
            text: "ECG Buddy has revolutionized our workflow",
            author: "Dr. Sarah Kim",
            role: "Emergency Medicine",
            avatar: "👩‍⚕️",
            rating: 5
          },
        },
      ],
    },
  ];

  const devices = [
    { id: "desktop", name: "Desktop", icon: Monitor, width: "100%" },
    { id: "tablet", name: "Tablet", icon: Tablet, width: "768px" },
    { id: "mobile", name: "Mobile", icon: Smartphone, width: "375px" },
  ];

  const handleDragStart = (component: Component) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    if (draggedComponent) {
      const newComponent: Component = {
        ...draggedComponent,
        id: `${draggedComponent.type}-${Date.now()}`,
      };

      setSections(prev => prev.map(section => 
        section.id === sectionId 
          ? { ...section, components: [...section.components, newComponent] }
          : section
      ));
      setDraggedComponent(null);
    }
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
  };

  const handleComponentDelete = (sectionId: string, componentId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, components: section.components.filter(c => c.id !== componentId) }
        : section
    ));
    if (selectedComponent === componentId) {
      setSelectedComponent(null);
    }
  };

  const handleComponentUpdate = (sectionId: string, componentId: string, newProps: Record<string, any>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { 
            ...section, 
            components: section.components.map(c => 
              c.id === componentId ? { ...c, props: { ...c.props, ...newProps } } : c
            )
          }
        : section
    ));
  };

  const addNewSection = () => {
    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      name: `Section ${sections.length + 1}`,
      components: [],
    };
    setSections(prev => [...prev, newSection]);
  };

  const renderComponent = (component: Component, sectionId: string) => {
    const isSelected = selectedComponent === component.id;
    
    const baseClasses = `relative group cursor-pointer transition-all duration-200 ${
      isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'
    }`;

    const componentContent = (() => {
      switch (component.type) {
        case "heading":
          return (
            <div 
              className={`font-bold text-${component.props.size} text-${component.props.align}`}
              style={{ color: component.props.color }}
            >
              {component.props.text}
            </div>
          );
        
        case "paragraph":
          return (
            <div 
              className={`text-${component.props.size} text-${component.props.align}`}
              style={{ color: component.props.color }}
            >
              {component.props.text}
            </div>
          );
        
        case "image":
          return (
            <img
              src={component.props.src}
              alt={component.props.alt}
              className="w-full rounded-lg"
              style={{ 
                width: component.props.width,
                height: component.props.height,
                objectFit: component.props.objectFit
              }}
            />
          );
        
        case "button":
          return (
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                component.props.variant === "primary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {component.props.text}
            </button>
          );
        
        case "card":
          return (
            <div className={`bg-white rounded-lg overflow-hidden ${component.props.shadow ? 'shadow-lg' : ''}`}>
              {component.props.image && (
                <img src={component.props.image} alt="" className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{component.props.title}</h3>
                <p className="text-gray-600">{component.props.description}</p>
              </div>
            </div>
          );
        
        case "feature-card":
          return (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className={`w-12 h-12 bg-gradient-to-br ${component.props.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{component.props.title}</h3>
              <p className="text-gray-600">{component.props.description}</p>
            </div>
          );
        
        case "stat-card":
          return (
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{component.props.value}</div>
              <div className="text-gray-600">{component.props.label}</div>
            </div>
          );
        
        case "testimonial":
          return (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{component.props.avatar}</span>
                <div>
                  <div className="font-semibold">{component.props.author}</div>
                  <div className="text-sm text-gray-600">{component.props.role}</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{component.props.text}"</p>
              <div className="flex mt-3">
                {[...Array(component.props.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          );
        
        case "container":
          return (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px] flex items-center justify-center"
              style={{ maxWidth: component.props.maxWidth, padding: component.props.padding }}
            >
              <span className="text-gray-500">Container - Drop components here</span>
            </div>
          );
        
        case "grid":
          return (
            <div 
              className="grid border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px]"
              style={{ 
                gridTemplateColumns: `repeat(${component.props.columns}, 1fr)`,
                gap: component.props.gap
              }}
            >
              {[...Array(component.props.columns)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded p-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Grid Item {i + 1}</span>
                </div>
              ))}
            </div>
          );
        
        default:
          return (
            <div className="p-4 bg-gray-100 rounded-lg">
              <span className="text-gray-600">Unknown component: {component.type}</span>
            </div>
          );
      }
    })();

    return (
      <div
        key={component.id}
        className={baseClasses}
        onClick={(e) => {
          e.stopPropagation();
          handleComponentSelect(component.id);
        }}
      >
        {componentContent}
        
        {/* Component Controls */}
        {isSelected && (
          <div className="absolute -top-8 left-0 flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded text-xs">
            <span>{component.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleComponentDelete(sectionId, component.id);
              }}
              className="ml-2 hover:bg-blue-700 p-1 rounded"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderPropertyEditor = () => {
    if (!selectedComponent) {
      return (
        <div className="p-4 text-center text-gray-500">
          <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Select a component to edit its properties</p>
        </div>
      );
    }

    const component = sections
      .flatMap(s => s.components)
      .find(c => c.id === selectedComponent);

    if (!component) return null;

    const sectionId = sections.find(s => s.components.some(c => c.id === selectedComponent))?.id;

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b">
          <component.icon className="w-4 h-4" />
          <span className="font-medium">{component.name}</span>
        </div>

        {Object.entries(component.props).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <label className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            {typeof value === 'string' && key.includes('text') ? (
              <textarea
                value={value}
                onChange={(e) => sectionId && handleComponentUpdate(sectionId, selectedComponent, { [key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                rows={3}
              />
            ) : typeof value === 'string' ? (
              <input
                type="text"
                value={value}
                onChange={(e) => sectionId && handleComponentUpdate(sectionId, selectedComponent, { [key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            ) : typeof value === 'number' ? (
              <input
                type="number"
                value={value}
                onChange={(e) => sectionId && handleComponentUpdate(sectionId, selectedComponent, { [key]: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            ) : typeof value === 'boolean' ? (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => sectionId && handleComponentUpdate(sectionId, selectedComponent, { [key]: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Enable</span>
              </label>
            ) : (
              <input
                type="text"
                value={String(value)}
                onChange={(e) => sectionId && handleComponentUpdate(sectionId, selectedComponent, { [key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Component Library Sidebar */}
      <AnimatePresence>
        {showComponentLibrary && (
          <motion.div
            className="w-80 bg-white border-r border-gray-200 flex flex-col"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Components</h3>
                <button
                  onClick={() => setShowComponentLibrary(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown className="w-4 h-4 transform rotate-90" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search components..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {componentLibrary.map((category) => (
                <div key={category.category} className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.components.map((component) => (
                      <div
                        key={component.id}
                        draggable
                        onDragStart={() => handleDragStart(component)}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                      >
                        <component.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {component.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {!showComponentLibrary && (
              <button
                onClick={() => setShowComponentLibrary(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Layers className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-900">Page Builder</h2>
          </div>

          {/* Device Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => setActiveDevice(device.id as any)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeDevice === device.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <device.icon className="w-4 h-4" />
                <span>{device.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Undo className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Redo className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div 
            className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{ 
              width: devices.find(d => d.id === activeDevice)?.width,
              minHeight: "800px"
            }}
          >
            {sections.map((section) => (
              <div
                key={section.id}
                className="border-b border-gray-200 last:border-b-0"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                {/* Section Header */}
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{section.name}</span>
                  <button className="text-xs text-blue-600 hover:text-blue-700">
                    Edit Section
                  </button>
                </div>

                {/* Section Content */}
                <div className="p-6 space-y-4 min-h-[200px]">
                  {section.components.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Layers className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Drop components here to start building</p>
                    </div>
                  ) : (
                    section.components.map((component) => renderComponent(component, section.id))
                  )}
                </div>
              </div>
            ))}

            {/* Add Section Button */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={addNewSection}
                className="w-full flex items-center justify-center space-x-2 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-600 hover:text-blue-600"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add New Section</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Sidebar */}
      <AnimatePresence>
        {showProperties && (
          <motion.div
            className="w-80 bg-white border-l border-gray-200 flex flex-col"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Properties</h3>
                <button
                  onClick={() => setShowProperties(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown className="w-4 h-4 transform -rotate-90" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {renderPropertyEditor()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Buttons for Hidden Sidebars */}
      {!showComponentLibrary && (
        <button
          onClick={() => setShowComponentLibrary(true)}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {!showProperties && (
        <button
          onClick={() => setShowProperties(true)}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 z-10"
        >
          <ChevronDown className="w-4 h-4 transform rotate-90" />
        </button>
      )}
    </div>
  );
};