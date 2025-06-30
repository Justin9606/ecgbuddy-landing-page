"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit3, Type, Image, Settings } from "lucide-react";

interface EditableContentWrapperProps {
  children: React.ReactNode;
  contentPath: string; // Path to this content in the siteContent object (e.g., "hero.mainHeading.line1")
  onSelect: (path: string) => void;
  isSelected: boolean;
  label?: string; // Optional label to display on hover/selection
  type?: "text" | "image" | "button" | "section"; // Type of content for different styling
}

export const EditableContentWrapper: React.FC<EditableContentWrapperProps> = ({
  children,
  contentPath,
  onSelect,
  isSelected,
  label,
  type = "text",
}) => {
  const getIcon = () => {
    switch (type) {
      case "text":
        return Type;
      case "image":
        return Image;
      case "button":
        return Settings;
      default:
        return Edit3;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      className={`relative group cursor-pointer transition-all duration-200 ${
        isSelected 
          ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/20" 
          : "hover:ring-1 hover:ring-blue-300 hover:bg-blue-50/10"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(contentPath);
      }}
      whileHover={{ scale: 1.002 }}
      whileTap={{ scale: 0.998 }}
    >
      {children}

      {/* Edit Indicator */}
      <motion.div
        className={`absolute top-0 right-0 transform translate-x-1 -translate-y-1 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity duration-200`}
        initial={{ scale: 0 }}
        animate={{ scale: isSelected ? 1 : 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
          <Icon className="w-3 h-3" />
        </div>
      </motion.div>

      {/* Label */}
      {label && (isSelected || true) && (
        <motion.div
          className={`absolute bottom-0 left-0 transform translate-y-full mt-1 ${
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } transition-opacity duration-200`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: isSelected ? 1 : 0 }}
        >
          <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            {label}
          </div>
        </motion.div>
      )}

      {/* Selection Overlay */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};