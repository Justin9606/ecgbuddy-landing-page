"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FileText, Bold, Italic, List, Link2 } from "lucide-react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  placeholder?: string;
  height?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  description,
  placeholder,
  height = "200px",
}) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "blockquote"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "blockquote",
    "color",
    "background",
  ];

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <FileText className="w-4 h-4 text-gray-500" />
        <label className="text-sm font-medium text-gray-900">{label}</label>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Bold className="w-3 h-3" />
          <Italic className="w-3 h-3" />
          <List className="w-3 h-3" />
          <Link2 className="w-3 h-3" />
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      )}

      <div className="relative">
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            style={{
              height: height,
            }}
            className="rich-text-editor"
          />
        </div>
      </div>

      {/* Character count */}
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Rich text formatting available</span>
        <span>{value.replace(/<[^>]*>/g, "").length} characters</span>
      </div>

      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 8px 12px;
        }

        .rich-text-editor .ql-container {
          border: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
        }

        .rich-text-editor .ql-editor {
          padding: 12px;
          min-height: ${height};
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }

        .rich-text-editor .ql-toolbar .ql-formats {
          margin-right: 8px;
        }

        .rich-text-editor .ql-toolbar button {
          padding: 4px;
          margin: 0 1px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .rich-text-editor .ql-toolbar button:hover {
          background: #e5e7eb;
        }

        .rich-text-editor .ql-toolbar button.ql-active {
          background: #3b82f6;
          color: white;
        }
      `}</style>
    </motion.div>
  );
};