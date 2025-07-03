"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  elements: Record<string, EditableElement>;
}

const AdminEditingContext = createContext<AdminEditingContextType | undefined>(
  undefined
);

export const AdminEditingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [elements, setElements] = useState<Record<string, EditableElement>>({});

  const updateElement = (id: string, updates: Partial<EditableElement>) => {
    setElements(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
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
        elements,
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