"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useAdminEditing, EditableElement } from "@/lib/contexts/AdminEditingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, MousePointer, Type, Layers, Image, CreditCard } from "lucide-react";

interface EditableWrapperProps {
  id: string;
  type: "text" | "image" | "button" | "section" | "card";
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
    updateElement,
    registerElement,
  } = useAdminEditing();

  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [inlineContent, setInlineContent] = useState("");
  const editableRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedElement?.id === id;
  const isHovered = hoveredElement === id;
  const elementData = elements[id];

  // Register this element on mount
  useEffect(() => {
    const element: EditableElement = {
      id,
      type,
      label,
      content,
      styles,
      metadata,
    };
    
    registerElement(element);
  }, [id, type, label, content, styles, metadata, registerElement]);

  // Initialize inline content
  useEffect(() => {
    if (elementData?.content?.text) {
      setInlineContent(elementData.content.text);
    }
  }, [elementData?.content?.text]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element: EditableElement = elementData || {
      id,
      type,
      label,
      content,
      styles,
      metadata,
    };
    
    setSelectedElement(element);

    // Enable inline editing for text elements
    if (type === "text" && !isInlineEditing) {
      setIsInlineEditing(true);
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
          // Select all text
          const range = document.createRange();
          range.selectNodeContents(editableRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 100);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isEditMode || type !== "text") return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsInlineEditing(true);
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
      }
    }, 100);
  };

  const handleInlineEdit = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || "";
    setInlineContent(newContent);
  };

  const handleInlineBlur = () => {
    setIsInlineEditing(false);
    if (inlineContent !== elementData?.content?.text) {
      updateElement(id, {
        content: { ...elementData?.content, text: inlineContent }
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInlineBlur();
    }
    if (e.key === "Escape") {
      setIsInlineEditing(false);
      setInlineContent(elementData?.content?.text || "");
    }
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

  // Apply dynamic styles from the elements state
  const dynamicStyles = elementData?.styles || styles;
  const dynamicContent = elementData?.content || content;

  // Render content based on element data
  const renderContent = () => {
    if (type === "text" && isEditMode && isInlineEditing) {
      return (
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInlineEdit}
          onBlur={handleInlineBlur}
          onKeyDown={handleKeyDown}
          className="outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-50/30 rounded-lg px-2 py-1 transition-all duration-200"
          style={{ minHeight: "1em" }}
        >
          {inlineContent}
        </div>
      );
    }

    // For text elements, use the dynamic content if available
    if (type === "text" && dynamicContent?.text) {
      return React.cloneElement(children as React.ReactElement, {
        children: dynamicContent.text
      });
    }

    // For card elements, pass dynamic content and styles as props
    if (type === "card" && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        dynamicContent,
        dynamicStyles
      });
    }

    // For other elements, apply dynamic styles
    if (dynamicStyles && React.isValidElement(children)) {
      const styleClasses = Object.values(dynamicStyles).filter(Boolean).join(" ");
      return React.cloneElement(children as React.ReactElement, {
        className: `${(children as any).props.className || ""} ${styleClasses}`.trim()
      });
    }

    return children;
  };

  if (!isEditMode) {
    return <>{renderContent()}</>;
  }

  const getElementIcon = () => {
    switch (type) {
      case "text": return Type;
      case "image": return Image;
      case "section": return Layers;
      case "card": return CreditCard;
      default: return Edit3;
    }
  };

  const ElementIcon = getElementIcon();

  return (
    <div
      className={`relative ${className}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced Hover/Selection Overlay */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`absolute inset-0 pointer-events-none z-50 rounded-lg transition-all duration-200 ${
              isSelected
                ? "ring-2 ring-blue-500/60 bg-blue-500/8 shadow-lg shadow-blue-500/20"
                : "ring-1 ring-blue-300/60 bg-blue-300/5"
            }`}
            style={{ zIndex: 9999 }}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Edit Label */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`absolute -top-10 left-0 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-xs font-semibold backdrop-blur-sm border ${
              isSelected
                ? "bg-blue-600/90 text-white border-blue-500/50"
                : "bg-gray-800/90 text-white border-gray-700/50"
            }`}
            style={{ zIndex: 10000 }}
          >
            <ElementIcon className="w-3 h-3" />
            <span>{label}</span>
            {type === "text" && (
              <span className="text-blue-200 text-xs opacity-75">(double-click to edit)</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Click Indicator */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-2 right-2 z-50 bg-white/95 backdrop-blur-sm text-blue-600 p-2 rounded-lg shadow-lg border border-blue-200/50"
            style={{ zIndex: 10000 }}
          >
            <MousePointer className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Inline Editing Indicator */}
      <AnimatePresence>
        {isInlineEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-10 right-0 z-50 bg-green-600/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-green-500/50 font-semibold"
            style={{ zIndex: 10000 }}
          >
            Editing... (Enter to save, Esc to cancel)
          </motion.div>
        )}
      </AnimatePresence>

      {renderContent()}
    </div>
  );
};