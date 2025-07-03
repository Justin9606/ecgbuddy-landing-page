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

// Initial content structure with granular Hero and Features elements
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
      parent: "hero-section",
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
      parent: "hero-section",
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
      parent: "hero-section",
      buttonType: "secondary"
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
      parent: "features-section",
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
      parent: "features-section",
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
      parent: "features-section",
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
      parent: "features-section",
      editable: true
    }
  },
  // Category filters
  "features-category-all": {
    id: "features-category-all",
    type: "text",
    label: "Category: All Features",
    content: {
      text: "All Features",
      count: 6
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "all",
      editable: true
    }
  },
  "features-category-ai": {
    id: "features-category-ai",
    type: "text",
    label: "Category: AI & ML",
    content: {
      text: "AI & ML",
      count: 1
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "ai",
      editable: true
    }
  },
  "features-category-performance": {
    id: "features-category-performance",
    type: "text",
    label: "Category: Performance",
    content: {
      text: "Performance",
      count: 1
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "performance",
      editable: true
    }
  },
  "features-category-security": {
    id: "features-category-security",
    type: "text",
    label: "Category: Security",
    content: {
      text: "Security",
      count: 1
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "security",
      editable: true
    }
  },
  "features-category-collaboration": {
    id: "features-category-collaboration",
    type: "text",
    label: "Category: Collaboration",
    content: {
      text: "Collaboration",
      count: 1
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "collaboration",
      editable: true
    }
  },
  "features-category-analytics": {
    id: "features-category-analytics",
    type: "text",
    label: "Category: Analytics",
    content: {
      text: "Analytics",
      count: 1
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "analytics",
      editable: true
    }
  },
  "features-category-integration": {
    id: "features-category-integration",
    type: "text",
    label: "Category: Integration",
    content: {
      text: "Integration",
      count: 1
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-medium"
    },
    metadata: {
      parent: "features-section",
      categoryId: "integration",
      editable: true
    }
  },
  // Feature cards
  "feature-badge-ai-powered-analysis": {
    id: "feature-badge-ai-powered-analysis",
    type: "text",
    label: "AI-Powered Analysis Badge",
    content: {
      text: "Most Popular"
    },
    styles: {
      fontSize: "text-xs",
      fontWeight: "font-semibold",
      color: "slate-700"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      editable: true
    }
  },
  "feature-title-ai-powered-analysis": {
    id: "feature-title-ai-powered-analysis",
    type: "text",
    label: "AI-Powered Analysis Title",
    content: {
      text: "AI-Powered Analysis"
    },
    styles: {
      fontSize: "text-xl",
      fontWeight: "font-bold",
      color: "slate-900"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      editable: true
    }
  },
  "feature-description-ai-powered-analysis": {
    id: "feature-description-ai-powered-analysis",
    type: "text",
    label: "AI-Powered Analysis Description",
    content: {
      text: "Advanced machine learning algorithms trained on millions of ECG patterns for unprecedented accuracy and reliability."
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      editable: true
    }
  },
  "feature-rating-ai-powered-analysis": {
    id: "feature-rating-ai-powered-analysis",
    type: "text",
    label: "AI-Powered Analysis Rating",
    content: {
      text: "4.9"
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-semibold",
      color: "slate-700"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      editable: true
    }
  },
  "feature-stats-ai-powered-analysis": {
    id: "feature-stats-ai-powered-analysis",
    type: "text",
    label: "AI-Powered Analysis Stats",
    content: {
      text: "99.2% Accuracy"
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-semibold",
      color: "slate-900"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      editable: true
    }
  },
  "feature-highlight-ai-powered-analysis": {
    id: "feature-highlight-ai-powered-analysis",
    type: "text",
    label: "AI-Powered Analysis Highlight",
    content: {
      text: "Deep Learning"
    },
    styles: {
      fontSize: "text-xs",
      color: "slate-500"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      editable: true
    }
  },
  "feature-benefit-ai-powered-analysis-0": {
    id: "feature-benefit-ai-powered-analysis-0",
    type: "text",
    label: "AI-Powered Analysis Benefit 1",
    content: {
      text: "Real-time interpretation"
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      benefitIndex: 0,
      editable: true
    }
  },
  "feature-benefit-ai-powered-analysis-1": {
    id: "feature-benefit-ai-powered-analysis-1",
    type: "text",
    label: "AI-Powered Analysis Benefit 2",
    content: {
      text: "Continuous learning"
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      benefitIndex: 1,
      editable: true
    }
  },
  "feature-benefit-ai-powered-analysis-2": {
    id: "feature-benefit-ai-powered-analysis-2",
    type: "text",
    label: "AI-Powered Analysis Benefit 3",
    content: {
      text: "Pattern recognition"
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "ai-powered-analysis",
      benefitIndex: 2,
      editable: true
    }
  },
  // Real-time Processing feature
  "feature-badge-real-time-processing": {
    id: "feature-badge-real-time-processing",
    type: "text",
    label: "Real-time Processing Badge",
    content: {
      text: "Speed Champion"
    },
    styles: {
      fontSize: "text-xs",
      fontWeight: "font-semibold",
      color: "slate-700"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      editable: true
    }
  },
  "feature-title-real-time-processing": {
    id: "feature-title-real-time-processing",
    type: "text",
    label: "Real-time Processing Title",
    content: {
      text: "Real-time Processing"
    },
    styles: {
      fontSize: "text-xl",
      fontWeight: "font-bold",
      color: "slate-900"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      editable: true
    }
  },
  "feature-description-real-time-processing": {
    id: "feature-description-real-time-processing",
    type: "text",
    label: "Real-time Processing Description",
    content: {
      text: "Get comprehensive ECG analysis results in under 30 seconds with our optimized cloud processing engine."
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      editable: true
    }
  },
  "feature-rating-real-time-processing": {
    id: "feature-rating-real-time-processing",
    type: "text",
    label: "Real-time Processing Rating",
    content: {
      text: "4.8"
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-semibold",
      color: "slate-700"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      editable: true
    }
  },
  "feature-stats-real-time-processing": {
    id: "feature-stats-real-time-processing",
    type: "text",
    label: "Real-time Processing Stats",
    content: {
      text: "<30s Processing"
    },
    styles: {
      fontSize: "text-sm",
      fontWeight: "font-semibold",
      color: "slate-900"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      editable: true
    }
  },
  "feature-highlight-real-time-processing": {
    id: "feature-highlight-real-time-processing",
    type: "text",
    label: "Real-time Processing Highlight",
    content: {
      text: "Lightning Fast"
    },
    styles: {
      fontSize: "text-xs",
      color: "slate-500"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      editable: true
    }
  },
  "feature-benefit-real-time-processing-0": {
    id: "feature-benefit-real-time-processing-0",
    type: "text",
    label: "Real-time Processing Benefit 1",
    content: {
      text: "Instant results"
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      benefitIndex: 0,
      editable: true
    }
  },
  "feature-benefit-real-time-processing-1": {
    id: "feature-benefit-real-time-processing-1",
    type: "text",
    label: "Real-time Processing Benefit 2",
    content: {
      text: "Cloud optimization"
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      benefitIndex: 1,
      editable: true
    }
  },
  "feature-benefit-real-time-processing-2": {
    id: "feature-benefit-real-time-processing-2",
    type: "text",
    label: "Real-time Processing Benefit 3",
    content: {
      text: "Batch processing"
    },
    styles: {
      fontSize: "text-sm",
      color: "slate-600"
    },
    metadata: {
      parent: "features-section",
      featureId: "real-time-processing",
      benefitIndex: 2,
      editable: true
    }
  },
  // Continue with other features...
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