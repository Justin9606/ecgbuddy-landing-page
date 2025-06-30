"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image, Upload, Folder } from "lucide-react";

export const MediaLibrary: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Media Library
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Manage images, videos, and other media assets used throughout your
            landing page. Upload, organize, and optimize your media files.
          </p>
          <div className="mt-8">
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="w-5 h-5" />
              <span className="font-medium">Coming Soon</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};