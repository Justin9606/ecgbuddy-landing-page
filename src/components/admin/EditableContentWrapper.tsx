"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit3, 
  Type, 
  Image, 
  Settings, 
  MousePointer,
  Eye,
  Palette,
  Layout,
  Sparkles,
  Target
} from "lucide-react";

interface EditableContentWrapperProps {
  children: React.ReactNode;
  contentPath: string;
  onSelect: (path: string) => void;
  isSelected: boolean;
  label?: string;
  type?: "text" | "image" | "button" | "section" | "heading" | "paragraph" | "card" | "list";
  className?: string;
  allowInlineEdit?: boolean;
}

export const EditableContentWrapper: React.FC<EditableContentWrapperProps> = ({
  children,
  contentPath,
  onSelect,
  isSelected,
  label,
  type = "text",
  className = "",
  allowInlineEdit = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const getIcon = () => {
    switch (type) {
      case "heading":
        return Type;
      case "paragraph":
        return Type;
      case "text":
        return Type;
      case "image":
        return Image;
      case "button":
        return MousePointer;
      case "section":
        return Layout;
      case "card":
        return Settings;
      case "list":
        return Target;
      default:
        return Edit3;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "heading":
        return "blue";
      case "paragraph":
        return "green";
      case "text":
        return "purple";
      case "image":
        return "orange";
      case "button":
        return "red";
      case "section":
        return "indigo";
      case "card":
        return "pink";
      case "list":
        return "teal";
      default:
        return "gray";
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "heading":
        return "Heading";
      case "paragraph":
        return "Paragraph";
      case "text":
        return "Text";
      case "image":
        return "Image";
      case "button":
        return "Button";
      case "section":
        return "Section";
      case "card":
        return "Card";
      case "list":
        return "List";
      default:
        return "Element";
    }
  };

  const Icon = getIcon();
  const typeColor = getTypeColor();
  const typeLabel = getTypeLabel();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(contentPath);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setShowTooltip(true), 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  return (
    <motion.div
      className={`relative group transition-all duration-200 ${className} ${
        isSelected 
          ? `ring-2 ring-${typeColor}-500 ring-offset-2 bg-${typeColor}-50/20 shadow-lg` 
          : isHovered
          ? `ring-1 ring-${typeColor}-300 bg-${typeColor}-50/10 shadow-md`
          : ""
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: type === "section" ? 1.001 : 1.002 }}
      whileTap={{ scale: type === "section" ? 0.999 : 0.998 }}
      style={{ cursor: "pointer" }}
    >
      {children}

      {/* Edit Indicator - Top Right */}
      <AnimatePresence>
        {(isSelected || isHovered) && (
          <motion.div
            className="absolute -top-2 -right-2 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`bg-${typeColor}-600 text-white p-2 rounded-full shadow-lg border-2 border-white`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-3 h-3" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Type Badge - Top Left */}
      <AnimatePresence>
        {(isSelected || isHovered) && (
          <motion.div
            className="absolute -top-2 -left-2 z-40"
            initial={{ scale: 0, opacity: 0, x: -10 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <div className={`bg-${typeColor}-100 text-${typeColor}-700 px-2 py-1 rounded-full text-xs font-medium border border-${typeColor}-200 shadow-sm`}>
              {typeLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Path Label - Bottom */}
      <AnimatePresence>
        {isSelected && label && (
          <motion.div
            className="absolute -bottom-8 left-0 right-0 z-40 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg max-w-xs truncate">
              <div className="font-medium">{label}</div>
              <div className="text-slate-400 font-mono text-xs">{contentPath}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {showTooltip && isHovered && !isSelected && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-30 mb-2"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`bg-${typeColor}-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap`}>
              Click to edit {typeLabel.toLowerCase()}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-${typeColor}-600`}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection Overlay */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className={`absolute inset-0 border-2 border-${typeColor}-500 rounded-lg pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Corner Handles */}
            <div className={`absolute -top-1 -left-1 w-3 h-3 bg-${typeColor}-500 rounded-full`}></div>
            <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${typeColor}-500 rounded-full`}></div>
            <div className={`absolute -bottom-1 -left-1 w-3 h-3 bg-${typeColor}-500 rounded-full`}></div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${typeColor}-500 rounded-full`}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Animation for Selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className={`absolute inset-0 border-2 border-${typeColor}-400 rounded-lg pointer-events-none`}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};