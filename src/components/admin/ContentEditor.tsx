"use client";

import React, { useState, useEffect } from "react";
import { Save, Eye, Plus, Trash2 } from "lucide-react";
import { ContentSection } from "./AdminDashboard";
import { CONTENT_TYPES } from "@/lib/admin/content-types";

interface ContentEditorProps {
  section: ContentSection;
  content: any;
  onContentChange: (newContent: any) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  section,
  content,
  onContentChange,
}) => {
  const [localContent, setLocalContent] = useState(content);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalContent(content);
    setHasChanges(false);
  }, [content]);

  const handleFieldChange = (fieldName: string, value: any) => {
    const newContent = { ...localContent, [fieldName]: value };
    setLocalContent(newContent);
    setHasChanges(true);
  };

  const handleSave = () => {
    onContentChange(localContent);
    setHasChanges(false);
  };

  const handlePreview = () => {
    if (hasChanges) {
      onContentChange(localContent);
      setHasChanges(false);
    }
    window.open('/', '_blank');
  };

  const addRepeaterItem = (fieldName: string) => {
    const currentArray = localContent[fieldName] || [];
    let newItem = {};
    
    // Define default items for different repeater types
    if (fieldName === 'features') {
      newItem = { title: '', description: '', icon: 'star', category: 'general' };
    } else if (fieldName === 'testimonials') {
      newItem = { quote: '', author: '', position: '', company: '' };
    } else if (fieldName === 'faqs') {
      newItem = { question: '', answer: '' };
    }

    handleFieldChange(fieldName, [...currentArray, newItem]);
  };

  const removeRepeaterItem = (fieldName: string, index: number) => {
    const currentArray = localContent[fieldName] || [];
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    handleFieldChange(fieldName, newArray);
  };

  const updateRepeaterItem = (fieldName: string, index: number, itemField: string, value: any) => {
    const currentArray = [...(localContent[fieldName] || [])];
    currentArray[index] = { ...currentArray[index], [itemField]: value };
    handleFieldChange(fieldName, currentArray);
  };

  const contentType = CONTENT_TYPES[section];
  if (!contentType) return <div>Content type not found</div>;

  const renderField = (field: any) => {
    const value = localContent[field.name] || field.defaultValue || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case 'repeater':
        const items = localContent[field.name] || [];
        return (
          <div className="space-y-4">
            {items.map((item: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                  <button
                    onClick={() => removeRepeaterItem(field.name, index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {Object.keys(item).map((itemField) => (
                    <div key={itemField}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {itemField.charAt(0).toUpperCase() + itemField.slice(1)}
                      </label>
                      {itemField.includes('description') || itemField === 'answer' ? (
                        <textarea
                          value={item[itemField]}
                          onChange={(e) => updateRepeaterItem(field.name, index, itemField, e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <input
                          type="text"
                          value={item[itemField]}
                          onChange={(e) => updateRepeaterItem(field.name, index, itemField, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <button
              onClick={() => addRepeaterItem(field.name)}
              className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add {field.label.slice(0, -1)}</span>
            </button>
          </div>
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{contentType.name}</h1>
          <p className="text-gray-600 mt-1">Manage your {contentType.name.toLowerCase()} content</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handlePreview}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Status */}
      {hasChanges && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">You have unsaved changes</p>
        </div>
      )}

      {/* Content Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {contentType.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};