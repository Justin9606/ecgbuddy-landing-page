"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface ImagePreviewProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  placeholder?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  label,
  value,
  onChange,
  description,
  placeholder,
  maxWidth = "300px",
  maxHeight = "200px",
}) => {
  const [showPreview, setShowPreview] = useState(true);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error" | "idle">("idle");

  const handleImageLoad = () => {
    setImageStatus("loaded");
  };

  const handleImageError = () => {
    setImageStatus("error");
  };

  const handleImageLoadStart = () => {
    if (value) {
      setImageStatus("loading");
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getStatusIcon = () => {
    switch (imageStatus) {
      case "loading":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case "loaded":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <ImageIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (imageStatus) {
      case "loading":
        return "Loading image...";
      case "loaded":
        return "Image loaded successfully";
      case "error":
        return "Failed to load image";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <label className="text-sm font-medium text-gray-900">{label}</label>
        </div>
        
        {value && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Show Preview</span>
                </>
              )}
            </button>
            
            {isValidUrl(value) && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-blue-500 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open</span>
              </a>
            )}
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      )}

      <div className="space-y-3">
        {/* URL Input */}
        <input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setImageStatus("idle");
          }}
          placeholder={placeholder || `Enter ${label.toLowerCase()} URL...`}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
        />

        {/* Status Message */}
        <AnimatePresence>
          {imageStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`text-xs flex items-center space-x-1 ${
                imageStatus === "loaded"
                  ? "text-green-600"
                  : imageStatus === "error"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Preview */}
        <AnimatePresence>
          {value && showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div 
                className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center"
                style={{ maxWidth, maxHeight }}
              >
                {isValidUrl(value) ? (
                  <img
                    src={value}
                    alt={label}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    onLoadStart={handleImageLoadStart}
                    className="max-w-full max-h-full object-contain"
                    style={{ maxWidth, maxHeight }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-gray-400">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <span className="text-sm">Invalid URL format</span>
                  </div>
                )}
              </div>
              
              {imageStatus === "loading" && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading...</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-xs text-gray-400">
        Supported formats: JPG, PNG, GIF, WebP, SVG
      </div>
    </motion.div>
  );
};