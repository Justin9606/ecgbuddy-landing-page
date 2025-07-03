"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface EditableElement {
  id: string;
  type: "text" | "image" | "button" | "section";
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
}

const AdminEditingContext = createContext<AdminEditingContextType | undefined>(
  undefined
);

// Initial content structure based on your landing page
const getInitialContent = (): Record<string, EditableElement> => ({
  "hero-section": {
    id: "hero-section",
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
  "hero-title": {
    id: "hero-title",
    type: "text",
    label: "Hero Title",
    content: {
      text: "Revolutionize ECG Analysis"
    },
    styles: {
      fontSize: "text-6xl md:text-8xl",
      fontWeight: "font-bold",
      color: "from-slate-900 via-slate-800 to-slate-700"
    },
    metadata: {
      parent: "hero-section",
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
      parent: "hero-section",
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
      parent: "hero-section",
      buttonType: "primary"
    }
  },
  "features-section": {
    id: "features-section",
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
  "pricing-section": {
    id: "pricing-section",
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
  }
});

export const AdminEditingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [elements, setElements] = useState<Record<string, EditableElement>>({});
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
    const publishedContent = localStorage.getItem('ecg-buddy-admin-published-content');
    
    if (savedContent && publishedContent) {
      const hasChanges = savedContent !== publishedContent;
      setHasUnsavedChanges(hasChanges);
    } else if (savedContent) {
      setHasUnsavedChanges(true);
    }
  }, [elements]);

  const loadInitialContent = () => {
    const savedContent = localStorage.getItem('ecg-buddy-admin-content');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setElements(parsedContent);
      } catch (error) {
        console.error('Failed to load saved content:', error);
        setElements(getInitialContent());
      }
    } else {
      setElements(getInitialContent());
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

  const registerElement = (element: EditableElement) => {
    setElements(prev => ({
      ...prev,
      [element.id]: { ...prev[element.id], ...element }
    }));
  };

  const saveChanges = () => {
    try {
      const contentString = JSON.stringify(elements);
      localStorage.setItem('ecg-buddy-admin-content', contentString);
      
      console.log('Changes saved successfully:', elements);
      
      // You can replace this with an API call to your backend
      // await fetch('/api/admin/save-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(elements)
      // });
      
      // Show success notification
      alert('Changes saved successfully!');
      
      // Update unsaved changes status
      const publishedContent = localStorage.getItem('ecg-buddy-admin-published-content');
      if (publishedContent) {
        setHasUnsavedChanges(contentString !== publishedContent);
      }
      
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const publishChanges = () => {
    try {
      const contentString = JSON.stringify(elements);
      
      // Save current content as published version
      localStorage.setItem('ecg-buddy-admin-content', contentString);
      localStorage.setItem('ecg-buddy-admin-published-content', contentString);
      localStorage.setItem('ecg-buddy-admin-published', 'true');
      
      console.log('Content published successfully:', elements);
      
      // You can replace this with an API call to your backend
      // await fetch('/api/admin/publish-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(elements)
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