"use client";

import React from "react";
import { Heart, Globe, ChevronDown } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import type { HeaderContent } from "@/lib/admin/types";

export const StaticHeader: React.FC = () => {
  const content = getSectionContent<HeaderContent>('header');

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header Preview Container */}
      <div className="relative">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 via-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              {content.logoText}
            </span>
          </div>
          {content.tagline && (
            <p className="text-sm text-gray-600 mt-2">{content.tagline}</p>
          )}
        </div>

        {/* Navigation Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {content.navigationItems.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700 flex items-center space-x-1"
              >
                <span>{item.name}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Languages & CTA Section */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {content.languages.map((lang, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full ${
                    lang.isActive
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {lang.name}
                </span>
              ))}
            </div>
            <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {content.ctaButton.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};