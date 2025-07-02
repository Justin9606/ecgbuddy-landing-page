"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Heart } from "lucide-react";
import Link from "next/link";

const JobNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-12 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Search className="w-12 h-12 text-slate-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Job Not Found</h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Sorry, we couldn't find the job position you're looking for. It may have been filled or removed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/careers"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to All Jobs</span>
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Go to Homepage</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobNotFound;