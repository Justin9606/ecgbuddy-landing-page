"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface EditableElement {
  id: string;
  type: "text" | "image" | "button" | "section" | "card";
  label: string;
  content: any;
  styles?: Record<string, any>;
  metadata?: Record<string, any>;
}

interface AdminEditingContextType {
  selectedElement: EditableElement | null;
  setSelectedElement: (element: EditableElement | null) => void;
  isEditMode: boolean;
  setIsEditMode: (enabled: boolean) => void;
  hoveredElement: string | null;
  setHoveredElement: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<EditableElement>) => void;
  registerElement: (element: EditableElement) => void;
  elements: Record<string, EditableElement>;
  saveChanges: () => void;
  publishChanges: () => void;
  loadInitialContent: () => void;
  isPublished: boolean;
  hasUnsavedChanges: boolean;
  pageStructure: string[];
  updatePageStructure: (newStructure: string[]) => void;
  addSection: (sectionId: string, atIndex?: number) => void;
  removeSection: (sectionId: string) => void;
  reorderSection: (oldIndex: number, newIndex: number) => void;
  availableSections: Array<{ id: string; name: string; description: string; category: string }>;
}

const AdminEditingContext = createContext<AdminEditingContextType | undefined>(
  undefined
);

// Available sections that can be added to the page
const AVAILABLE_SECTIONS = [
  {
    id: "hero-section",
    name: "Hero Section",
    description: "Main landing section with title, subtitle, and call-to-action buttons",
    category: "Essential"
  },
  {
    id: "features-section",
    name: "Features Section",
    description: "Showcase product features with icons, descriptions, and benefits",
    category: "Essential"
  },
  {
    id: "pricing-section",
    name: "Pricing Section",
    description: "Display pricing plans and subscription options",
    category: "Essential"
  },
  {
    id: "mobile-download-section",
    name: "Mobile Download",
    description: "App download section with QR codes and store links",
    category: "Product"
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    description: "Frequently asked questions with expandable answers",
    category: "Support"
  },
  {
    id: "about-arpi-section",
    name: "About ARPI",
    description: "Company information, milestones, and team details",
    category: "Company"
  }
];

// Helper function to get default elements for a section
const getDefaultElementsForSection = (sectionId: string): Record<string, EditableElement> => {
  const baseElements: Record<string, EditableElement> = {};

  switch (sectionId) {
    case "hero-section":
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "Hero Section",
          content: {
            title: "Revolutionize ECG Analysis",
            subtitle: "Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide.",
            primaryCTA: "Try ECG Buddy",
            secondaryCTA: "Watch Demo",
            badge: "Trusted by 10,000+ Healthcare Professionals"
          },
          styles: {
            backgroundColor: "from-red-50/30 via-white to-pink-50/20",
            textColor: "slate-900",
            padding: "py-32"
          },
          metadata: {
            section: "hero",
            priority: "high",
            visible: true
          }
        },
        "hero-badge": {
          id: "hero-badge",
          type: "text",
          label: "Hero Badge",
          content: {
            text: "Trusted by 10,000+ Healthcare Professionals"
          },
          styles: {
            fontSize: "text-sm",
            fontWeight: "font-medium",
            color: "slate-700"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "hero-title-part1": {
          id: "hero-title-part1",
          type: "text",
          label: "Hero Title Part 1",
          content: {
            text: "Revolutionize"
          },
          styles: {
            fontSize: "text-6xl md:text-8xl",
            fontWeight: "font-bold",
            color: "from-slate-900 via-slate-800 to-slate-700"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "hero-title-part2": {
          id: "hero-title-part2",
          type: "text",
          label: "Hero Title Part 2",
          content: {
            text: "ECG Analysis"
          },
          styles: {
            fontSize: "text-6xl md:text-8xl",
            fontWeight: "font-bold",
            color: "from-red-600 via-red-500 to-pink-600"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "hero-subtitle": {
          id: "hero-subtitle",
          type: "text",
          label: "Hero Subtitle",
          content: {
            text: "Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide."
          },
          styles: {
            fontSize: "text-xl md:text-2xl",
            color: "slate-600",
            fontWeight: "font-light"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "hero-primary-cta": {
          id: "hero-primary-cta",
          type: "button",
          label: "Primary CTA Button",
          content: {
            text: "Try ECG Buddy",
            href: "#mobile-download"
          },
          styles: {
            backgroundColor: "from-red-500 via-red-600 to-pink-600",
            textColor: "white",
            padding: "px-10 py-4",
            borderRadius: "rounded-full",
            fontSize: "text-lg"
          },
          metadata: {
            parent: sectionId,
            buttonType: "primary"
          }
        },
        "hero-secondary-cta": {
          id: "hero-secondary-cta",
          type: "button",
          label: "Secondary CTA Button",
          content: {
            text: "Watch Demo",
            href: "#demo"
          },
          styles: {
            backgroundColor: "white/60",
            textColor: "slate-700",
            padding: "px-10 py-4",
            borderRadius: "rounded-full",
            fontSize: "text-lg"
          },
          metadata: {
            parent: sectionId,
            buttonType: "secondary"
          }
        }
      };

    case "features-section":
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "Features Section",
          content: {
            title: "Professional-grade tools for modern healthcare",
            subtitle: "Comprehensive suite of advanced features designed to enhance diagnostic accuracy and streamline cardiac care workflows for healthcare professionals.",
            badge: "Core Features"
          },
          styles: {
            backgroundColor: "from-slate-50 via-white to-gray-50",
            padding: "py-32"
          },
          metadata: {
            section: "features",
            priority: "high",
            visible: true
          }
        },
        "features-badge": {
          id: "features-badge",
          type: "text",
          label: "Features Badge",
          content: {
            text: "Core Features"
          },
          styles: {
            fontSize: "text-sm",
            fontWeight: "font-medium",
            color: "slate-700"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "features-title-part1": {
          id: "features-title-part1",
          type: "text",
          label: "Features Title Part 1",
          content: {
            text: "Professional-grade tools"
          },
          styles: {
            fontSize: "text-5xl md:text-6xl",
            fontWeight: "font-bold",
            color: "slate-900"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "features-title-part2": {
          id: "features-title-part2",
          type: "text",
          label: "Features Title Part 2",
          content: {
            text: "for modern healthcare"
          },
          styles: {
            fontSize: "text-5xl md:text-6xl",
            fontWeight: "font-bold",
            color: "from-blue-600 via-purple-600 to-indigo-600"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "features-subtitle": {
          id: "features-subtitle",
          type: "text",
          label: "Features Subtitle",
          content: {
            text: "Comprehensive suite of advanced features designed to enhance diagnostic accuracy and streamline cardiac care workflows for healthcare professionals."
          },
          styles: {
            fontSize: "text-xl",
            color: "slate-600"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        }
      };

    case "pricing-section":
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "Pricing Section",
          content: {
            title: "Choose your plan",
            subtitle: "Flexible credit-based pricing designed for healthcare professionals. Each credit equals one ECG analysis with our advanced AI system.",
            badge: "Credit-Based Pricing"
          },
          styles: {
            backgroundColor: "from-red-50/30 via-white to-pink-50/20",
            padding: "py-20"
          },
          metadata: {
            section: "pricing",
            priority: "high",
            visible: true
          }
        },
        "pricing-badge": {
          id: "pricing-badge",
          type: "text",
          label: "Pricing Badge",
          content: {
            text: "Credit-Based Pricing"
          },
          styles: {
            fontSize: "text-sm",
            fontWeight: "font-medium",
            color: "slate-700"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "pricing-title-part1": {
          id: "pricing-title-part1",
          type: "text",
          label: "Pricing Title Part 1",
          content: {
            text: "Choose your plan"
          },
          styles: {
            fontSize: "text-4xl md:text-5xl",
            fontWeight: "font-bold",
            color: "from-slate-900 via-slate-800 to-slate-700"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "pricing-title-part2": {
          id: "pricing-title-part2",
          type: "text",
          label: "Pricing Title Part 2",
          content: {
            text: "Start analyzing today"
          },
          styles: {
            fontSize: "text-4xl md:text-5xl",
            fontWeight: "font-bold",
            color: "from-red-600 via-red-500 to-pink-600"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        },
        "pricing-subtitle": {
          id: "pricing-subtitle",
          type: "text",
          label: "Pricing Subtitle",
          content: {
            text: "Flexible credit-based pricing designed for healthcare professionals. Each credit equals one ECG analysis with our advanced AI system."
          },
          styles: {
            fontSize: "text-lg",
            color: "slate-600"
          },
          metadata: {
            parent: sectionId,
            editable: true
          }
        }
      };

    case "mobile-download-section":
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "Mobile Download Section",
          content: {
            title: "Take ECG Buddy everywhere you go",
            subtitle: "Access powerful ECG analysis on any device. Download our native apps for seamless real-time analysis, cloud sync, and platform-specific integrations.",
            badge: "Mobile & Desktop Apps"
          },
          styles: {
            backgroundColor: "from-red-50/30 via-white to-pink-50/20",
            padding: "py-32"
          },
          metadata: {
            section: "mobile-download",
            priority: "medium",
            visible: true
          }
        }
      };

    case "faq-section":
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "FAQ Section",
          content: {
            title: "Got questions? We have answers",
            subtitle: "Everything you need to know about ECG Buddy, from getting started to advanced features and enterprise solutions.",
            badge: "Frequently Asked Questions"
          },
          styles: {
            backgroundColor: "from-red-50/30 via-white to-pink-50/20",
            padding: "py-32"
          },
          metadata: {
            section: "faq",
            priority: "medium",
            visible: true
          }
        }
      };

    case "about-arpi-section":
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "About ARPI Section",
          content: {
            title: "Leading AI Healthcare Innovation",
            subtitle: "ARPI Inc. develops cutting-edge artificial intelligence solutions for healthcare, with ECG Buddy as our flagship product revolutionizing cardiac care.",
            badge: "About ARPI"
          },
          styles: {
            backgroundColor: "from-slate-50 via-white to-gray-50",
            padding: "py-32"
          },
          metadata: {
            section: "about-arpi",
            priority: "medium",
            visible: true
          }
        }
      };

    default:
      return {
        [sectionId]: {
          id: sectionId,
          type: "section",
          label: "New Section",
          content: {
            title: "New Section",
            subtitle: "This is a new section that has been added to the page.",
            badge: "New"
          },
          styles: {
            backgroundColor: "white",
            padding: "py-16"
          },
          metadata: {
            section: "custom",
            priority: "low",
            visible: true
          }
        }
      };
  }
};

// Initial content structure with granular Hero, Features, and Pricing elements
const getInitialContent = (): { elements: Record<string, EditableElement>; pageStructure: string[] } => {
  const initialStructure = [
    "hero-section",
    "features-section", 
    "pricing-section",
    "mobile-download-section",
    "faq-section",
    "about-arpi-section"
  ];

  let allElements: Record<string, EditableElement> = {};

  // Generate elements for each section in the initial structure
  initialStructure.forEach(sectionId => {
    const sectionElements = getDefaultElementsForSection(sectionId);
    allElements = { ...allElements, ...sectionElements };
  });

  return {
    elements: allElements,
    pageStructure: initialStructure
  };
};

export const AdminEditingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [elements, setElements] = useState<Record<string, EditableElement>>({});
  const [pageStructure, setPageStructure] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load initial content on mount
  useEffect(() => {
    loadInitialContent();
    
    // Check if content is published
    const publishedStatus = localStorage.getItem('ecg-buddy-admin-published');
    setIsPublished(publishedStatus === 'true');
  }, []);

  // Track changes
  useEffect(() => {
    const savedContent = localStorage.getItem('ecg-buddy-admin-content');
    const savedPageStructure = localStorage.getItem('ecg-buddy-admin-page-structure');
    const publishedContent = localStorage.getItem('ecg-buddy-admin-published-content');
    const publishedPageStructure = localStorage.getItem('ecg-buddy-admin-published-page-structure');
    
    if (savedContent && publishedContent && savedPageStructure && publishedPageStructure) {
      const hasContentChanges = savedContent !== publishedContent;
      const hasStructureChanges = savedPageStructure !== publishedPageStructure;
      setHasUnsavedChanges(hasContentChanges || hasStructureChanges);
    } else if (savedContent || savedPageStructure) {
      setHasUnsavedChanges(true);
    }
  }, [elements, pageStructure]);

  const loadInitialContent = () => {
    const savedContent = localStorage.getItem('ecg-buddy-admin-content');
    const savedPageStructure = localStorage.getItem('ecg-buddy-admin-page-structure');
    
    if (savedContent && savedPageStructure) {
      try {
        const parsedContent = JSON.parse(savedContent);
        const parsedPageStructure = JSON.parse(savedPageStructure);
        setElements(parsedContent);
        setPageStructure(parsedPageStructure);
      } catch (error) {
        console.error('Failed to load saved content:', error);
        const initialData = getInitialContent();
        setElements(initialData.elements);
        setPageStructure(initialData.pageStructure);
      }
    } else {
      const initialData = getInitialContent();
      setElements(initialData.elements);
      setPageStructure(initialData.pageStructure);
    }
  };

  const updateElement = (id: string, updates: Partial<EditableElement>) => {
    setElements(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }

    setHasUnsavedChanges(true);
  };

  const updatePageStructure = (newStructure: string[]) => {
    setPageStructure(newStructure);
    setHasUnsavedChanges(true);
  };

  const addSection = (sectionId: string, atIndex?: number) => {
    // Check if section already exists
    if (pageStructure.includes(sectionId)) {
      console.warn(`Section ${sectionId} already exists in page structure`);
      return;
    }

    // Get default elements for this section
    const sectionElements = getDefaultElementsForSection(sectionId);
    
    // Add elements to the elements state
    setElements(prev => ({
      ...prev,
      ...sectionElements
    }));

    // Add section to page structure
    const newStructure = [...pageStructure];
    if (atIndex !== undefined && atIndex >= 0 && atIndex <= newStructure.length) {
      newStructure.splice(atIndex, 0, sectionId);
    } else {
      newStructure.push(sectionId);
    }
    
    setPageStructure(newStructure);
    setHasUnsavedChanges(true);

    console.log(`Added section ${sectionId} at index ${atIndex || newStructure.length - 1}`);
  };

  const removeSection = (sectionId: string) => {
    // Remove section from page structure
    const newStructure = pageStructure.filter(id => id !== sectionId);
    setPageStructure(newStructure);

    // Remove all elements associated with this section
    setElements(prev => {
      const newElements = { ...prev };
      
      // Remove the section element itself
      delete newElements[sectionId];
      
      // Remove all child elements that belong to this section
      Object.keys(newElements).forEach(elementId => {
        const element = newElements[elementId];
        if (element.metadata?.parent === sectionId) {
          delete newElements[elementId];
        }
      });
      
      return newElements;
    });

    // Clear selection if the selected element was part of the removed section
    if (selectedElement && 
        (selectedElement.id === sectionId || selectedElement.metadata?.parent === sectionId)) {
      setSelectedElement(null);
    }

    setHasUnsavedChanges(true);
    console.log(`Removed section ${sectionId} and all its child elements`);
  };

  const reorderSection = (oldIndex: number, newIndex: number) => {
    if (oldIndex < 0 || oldIndex >= pageStructure.length || 
        newIndex < 0 || newIndex >= pageStructure.length) {
      console.warn('Invalid indices for reordering sections');
      return;
    }

    const newStructure = [...pageStructure];
    const [movedSection] = newStructure.splice(oldIndex, 1);
    newStructure.splice(newIndex, 0, movedSection);
    
    setPageStructure(newStructure);
    setHasUnsavedChanges(true);
    
    console.log(`Moved section from index ${oldIndex} to ${newIndex}`);
  };

  const registerElement = (element: EditableElement) => {
    setElements(prev => ({
      ...prev,
      [element.id]: { ...prev[element.id], ...element }
    }));
  };

  const saveChanges = () => {
    try {
      const contentString = JSON.stringify(elements);
      const pageStructureString = JSON.stringify(pageStructure);
      
      localStorage.setItem('ecg-buddy-admin-content', contentString);
      localStorage.setItem('ecg-buddy-admin-page-structure', pageStructureString);
      
      console.log('Changes saved successfully:', { elements, pageStructure });
      
      // You can replace this with an API call to your backend
      // await fetch('/api/admin/save-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ elements, pageStructure })
      // });
      
      // Show success notification
      alert('Changes saved successfully!');
      
      // Update unsaved changes status
      const publishedContent = localStorage.getItem('ecg-buddy-admin-published-content');
      const publishedPageStructure = localStorage.getItem('ecg-buddy-admin-published-page-structure');
      
      if (publishedContent && publishedPageStructure) {
        const hasContentChanges = contentString !== publishedContent;
        const hasStructureChanges = pageStructureString !== publishedPageStructure;
        setHasUnsavedChanges(hasContentChanges || hasStructureChanges);
      }
      
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const publishChanges = () => {
    try {
      const contentString = JSON.stringify(elements);
      const pageStructureString = JSON.stringify(pageStructure);
      
      // Save current content as published version
      localStorage.setItem('ecg-buddy-admin-content', contentString);
      localStorage.setItem('ecg-buddy-admin-page-structure', pageStructureString);
      localStorage.setItem('ecg-buddy-admin-published-content', contentString);
      localStorage.setItem('ecg-buddy-admin-published-page-structure', pageStructureString);
      localStorage.setItem('ecg-buddy-admin-published', 'true');
      
      console.log('Content published successfully:', { elements, pageStructure });
      
      // You can replace this with an API call to your backend
      // await fetch('/api/admin/publish-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ elements, pageStructure })
      // });
      
      setIsPublished(true);
      setHasUnsavedChanges(false);
      
      // Show success notification
      alert('Content published successfully! Your changes are now live.');
      
    } catch (error) {
      console.error('Failed to publish changes:', error);
      alert('Failed to publish changes. Please try again.');
    }
  };

  return (
    <AdminEditingContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        isEditMode,
        setIsEditMode,
        hoveredElement,
        setHoveredElement,
        updateElement,
        registerElement,
        elements,
        saveChanges,
        publishChanges,
        loadInitialContent,
        isPublished,
        hasUnsavedChanges,
        pageStructure,
        updatePageStructure,
        addSection,
        removeSection,
        reorderSection,
        availableSections: AVAILABLE_SECTIONS,
      }}
    >
      {children}
    </AdminEditingContext.Provider>
  );
};

export const useAdminEditing = () => {
  const context = useContext(AdminEditingContext);
  if (context === undefined) {
    throw new Error("useAdminEditing must be used within an AdminEditingProvider");
  }
  return context;
};