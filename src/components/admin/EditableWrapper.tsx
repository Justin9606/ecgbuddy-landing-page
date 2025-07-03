"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useAdminEditing, EditableElement } from "@/lib/contexts/AdminEditingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, MousePointer, Type } from "lucide-react";

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
          className="outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
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

  return (
    <div
      className={`relative ${className}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
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
            {type === "text" ? <Type className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
            <span>{label}</span>
            {type === "text" && (
              <span className="text-blue-200 text-xs">(double-click to edit)</span>
            )}
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

      {/* Inline Editing Indicator */}
      <AnimatePresence>
        {isInlineEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-8 right-0 z-50 bg-green-600 text-white text-xs px-2 py-1 rounded-md shadow-lg"
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