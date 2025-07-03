"use client";

import React, { ReactNode, useEffect } from "react";
import { useAdminEditing, EditableElement } from "@/lib/contexts/AdminEditingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, MousePointer } from "lucide-react";

interface EditableWrapperProps {
  id: string;
  type: "text" | "image" | "button" | "section";
  label: string;
  content: any;
  styles?: Record<string, any>;
  metadata?: Record<string, any>;
  children: ReactNode;
  className?: string;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({
  id,
  type,
  label,
  content,
  styles = {},
  metadata = {},
  children,
  className = "",
}) => {
  const {
    selectedElement,
    setSelectedElement,
    isEditMode,
    hoveredElement,
    setHoveredElement,
    elements,
  } = useAdminEditing();

  const isSelected = selectedElement?.id === id;
  const isHovered = hoveredElement === id;

  // Register this element
  useEffect(() => {
    const element: EditableElement = {
      id,
      type,
      label,
      content,
      styles,
      metadata,
    };
    
    // Store element data for editing
    if (!elements[id]) {
      // Initial registration - you might want to load from your CMS here
    }
  }, [id, type, label, content, styles, metadata, elements]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element: EditableElement = {
      id,
      type,
      label,
      content,
      styles,
      metadata,
    };
    
    setSelectedElement(element);
  };

  const handleMouseEnter = () => {
    if (isEditMode) {
      setHoveredElement(id);
    }
  };

  const handleMouseLeave = () => {
    if (isEditMode) {
      setHoveredElement(null);
    }
  };

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <div
      className={`relative ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover/Selection Overlay */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 pointer-events-none z-50 rounded-lg ${
              isSelected
                ? "ring-2 ring-blue-500 bg-blue-500/10"
                : "ring-1 ring-blue-300 bg-blue-300/5"
            }`}
            style={{ zIndex: 9999 }}
          />
        )}
      </AnimatePresence>

      {/* Edit Label */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-8 left-0 z-50 bg-blue-600 text-white text-xs px-2 py-1 rounded-md shadow-lg flex items-center space-x-1"
            style={{ zIndex: 10000 }}
          >
            <Edit3 className="w-3 h-3" />
            <span>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Indicator */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-2 right-2 z-50 bg-white/90 backdrop-blur-sm text-blue-600 p-1 rounded-full shadow-lg"
            style={{ zIndex: 10000 }}
          >
            <MousePointer className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};