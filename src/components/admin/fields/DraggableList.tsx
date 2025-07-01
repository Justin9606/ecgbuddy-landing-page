"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Plus,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface DraggableItemProps {
  id: string;
  item: any;
  index: number;
  itemFields: string[];
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  item,
  index,
  itemFields,
  onUpdate,
  onRemove,
  isExpanded,
  onToggleExpand,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 ${
        isDragging ? "shadow-lg scale-105 z-50" : "shadow-sm hover:shadow-md"
      }`}
      layout
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded transition-colors"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              Item {index + 1}
            </span>
            {item.name && (
              <span className="text-sm text-gray-500">
                - {item.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleExpand}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          <button
            onClick={() => onRemove(index)}
            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {itemFields.map((fieldName) => (
                <div key={fieldName}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fieldName.charAt(0).toUpperCase() + 
                     fieldName.slice(1).replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  
                  {fieldName.includes("description") || fieldName.includes("bio") ? (
                    <textarea
                      value={item[fieldName] || ""}
                      onChange={(e) => onUpdate(index, fieldName, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
                      placeholder={`Enter ${fieldName}...`}
                    />
                  ) : (
                    <input
                      type={
                        fieldName === "rating" ? "number" :
                        fieldName === "email" ? "email" :
                        fieldName.includes("url") || fieldName.includes("link") ? "url" :
                        "text"
                      }
                      value={item[fieldName] || ""}
                      onChange={(e) => onUpdate(
                        index,
                        fieldName,
                        fieldName === "rating" ? parseInt(e.target.value) || 0 : e.target.value
                      )}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder={`Enter ${fieldName}...`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface DraggableListProps {
  label: string;
  items: any[];
  itemFields: string[];
  defaultItem: any;
  onUpdate: (newItems: any[]) => void;
  description?: string;
}

export const DraggableList: React.FC<DraggableListProps> = ({
  label,
  items,
  itemFields,
  defaultItem,
  onUpdate,
  description,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(
    new Set([0]) // First item expanded by default
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((_, index) => `item-${index}` === active.id);
      const newIndex = items.findIndex((_, index) => `item-${index}` === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onUpdate(newItems);
    }
  };

  const handleItemUpdate = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate(newItems);
  };

  const handleItemRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
    
    // Update expanded items
    const newExpandedItems = new Set<number>();
    expandedItems.forEach((expandedIndex) => {
      if (expandedIndex < index) {
        newExpandedItems.add(expandedIndex);
      } else if (expandedIndex > index) {
        newExpandedItems.add(expandedIndex - 1);
      }
    });
    setExpandedItems(newExpandedItems);
  };

  const handleAddItem = () => {
    const newItems = [...items, { ...defaultItem }];
    onUpdate(newItems);
    setExpandedItems(prev => new Set([...prev, newItems.length - 1]));
  };

  const toggleItemExpansion = (index: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-900">{label}</label>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </div>

      {description && (
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((_, index) => `item-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item, index) => (
                <DraggableItem
                  key={`item-${index}`}
                  id={`item-${index}`}
                  item={item}
                  index={index}
                  itemFields={itemFields}
                  onUpdate={handleItemUpdate}
                  onRemove={handleItemRemove}
                  isExpanded={expandedItems.has(index)}
                  onToggleExpand={() => toggleItemExpansion(index)}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {/* Add New Item Button */}
      <motion.button
        onClick={handleAddItem}
        className="w-full flex items-center justify-center space-x-2 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-600 hover:text-blue-600 group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="font-medium">Add New {label.slice(0, -1)}</span>
      </motion.button>
    </motion.div>
  );
};