"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Edit3, Target, MousePointer } from "lucide-react";

interface HighlightableElementProps {
  children: React.ReactNode;
  dataPath: string;
  elementType: string;
  label: string;
  onElementClick?: (dataPath: string, elementType: string) => void;
  className?: string;
  disabled?: boolean;
}

export const HighlightableElement: React.FC<HighlightableElementProps> = memo(({
  children,
  dataPath,
  elementType,
  label,
  onElementClick,
  className = "",
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (onElementClick) {
      onElementClick(dataPath, elementType);
    }
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative group cursor-pointer transition-all duration-200 ${className} ${
        isHovered ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg z-10' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
    >
      {children}
      
      {/* Hover Overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      )}

      {/* Edit Label */}
      {isHovered && (
        <motion.div
          className="absolute -top-8 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-lg z-50 whitespace-nowrap flex items-center space-x-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Edit3 className="w-3 h-3" />
          <span>Edit {label}</span>
        </motion.div>
      )}

      {/* Click Indicator */}
      {isHovered && (
        <motion.div
          className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow-lg z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <MousePointer className="w-3 h-3" />
        </motion.div>
      )}
    </motion.div>
  );
});

HighlightableElement.displayName = 'HighlightableElement';

// Helper component for wrapping array items
interface HighlightableArrayItemProps {
  children: React.ReactNode;
  dataPath: string;
  index: number;
  label: string;
  onElementClick?: (dataPath: string, elementType: string) => void;
  className?: string;
  disabled?: boolean;
}

export const HighlightableArrayItem: React.FC<HighlightableArrayItemProps> = memo(({
  children,
  dataPath,
  index,
  label,
  onElementClick,
  className = "",
  disabled = false,
}) => {
  return (
    <HighlightableElement
      dataPath={`${dataPath}[${index}]`}
      elementType="array-item"
      label={`${label} #${index + 1}`}
      onElementClick={onElementClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </HighlightableElement>
  );
});

HighlightableArrayItem.displayName = 'HighlightableArrayItem';

// Helper component for section wrappers
interface HighlightableSectionProps {
  children: React.ReactNode;
  sectionName: string;
  onElementClick?: (dataPath: string, elementType: string) => void;
  className?: string;
  disabled?: boolean;
}

export const HighlightableSection: React.FC<HighlightableSectionProps> = memo(({
  children,
  sectionName,
  onElementClick,
  className = "",
  disabled = false,
}) => {
  return (
    <HighlightableElement
      dataPath={sectionName}
      elementType="section"
      label={`${sectionName} Section`}
      onElementClick={onElementClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </HighlightableElement>
  );
});

HighlightableSection.displayName = 'HighlightableSection';