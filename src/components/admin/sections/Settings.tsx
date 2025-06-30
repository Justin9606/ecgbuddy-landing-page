"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Globe, Shield, Bell } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Settings</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Configure global site settings, SEO metadata, analytics, and system
            preferences for your ECG Buddy landing page.
          </p>
          <div className="mt-8">
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SettingsIcon className="w-5 h-5" />
              <span className="font-medium">Coming Soon</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};