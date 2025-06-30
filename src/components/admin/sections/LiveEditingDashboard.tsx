"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit, Eye, Sparkles, Zap } from "lucide-react";

interface LiveEditingDashboardProps {
  onStartLiveEditing: () => void;
}

export const LiveEditingDashboard: React.FC<LiveEditingDashboardProps> = ({
  onStartLiveEditing,
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Edit className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Live Visual Editor
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
            Edit your landing page content directly in a visual interface. Click on any element to modify text, images, colors, and more in real-time.
          </p>
          
          <motion.button
            onClick={onStartLiveEditing}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 mx-auto text-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit className="w-5 h-5" />
            <span>Start Live Editing</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Eye,
            title: "Visual Editing",
            description: "See your changes instantly as you edit content directly on the page",
            gradient: "from-green-500 to-emerald-600",
          },
          {
            icon: Zap,
            title: "Real-time Updates",
            description: "Changes are applied immediately without page refreshes",
            gradient: "from-orange-500 to-red-500",
          },
          {
            icon: Sparkles,
            title: "Intuitive Interface",
            description: "Click any element to edit - no technical knowledge required",
            gradient: "from-purple-500 to-violet-600",
          },
          {
            icon: Edit,
            title: "Comprehensive Editing",
            description: "Edit text, images, colors, and layout properties",
            gradient: "from-blue-500 to-indigo-600",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Getting Started */}
      <motion.div
        className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4">How to Use Live Editing</h3>
        <div className="space-y-3 text-slate-600">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">1</div>
            <p>Click "Start Live Editing" to open the visual editor</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">2</div>
            <p>Click on any element in the preview to select and edit it</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">3</div>
            <p>Use the right sidebar to modify content, styling, and properties</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">4</div>
            <p>Save your changes when you're satisfied with the results</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};