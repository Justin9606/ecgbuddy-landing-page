"use client";

import React from "react";
import { HelpCircle, CheckCircle } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { FAQContent } from "@/lib/admin/types";

export const StaticFAQ: React.FC = () => {
  const content = getSectionContent<FAQContent>('faq');

  return (
    <section className="relative py-16 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
              {content.sectionHeader.title.split('\n')[0]}
            </span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              {content.sectionHeader.title.split('\n')[1] || ''}
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {content.sectionHeader.description}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.categories.map((category, categoryIndex) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <div
                key={categoryIndex}
                className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {category.title}
                    </h3>
                    <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full mt-2`} />
                  </div>
                </div>

                {/* Questions - Show first 2 expanded */}
                <div className="space-y-4">
                  {category.questions.slice(0, 2).map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="bg-white/30 backdrop-blur-sm border border-red-100/40 rounded-2xl overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="font-semibold text-slate-800 mb-4">
                          {faq.question}
                        </div>
                        <div className="text-slate-600 leading-relaxed mb-4">
                          {faq.answer}
                        </div>
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {faq.highlights.map((highlight, highlightIndex) => (
                            <span
                              key={highlightIndex}
                              className="inline-flex items-center space-x-1 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-3 py-1 text-xs font-medium text-red-700"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>{highlight}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show remaining questions collapsed */}
                  {category.questions.slice(2).map((faq, faqIndex) => (
                    <div
                      key={faqIndex + 2}
                      className="bg-white/30 backdrop-blur-sm border border-red-100/40 rounded-2xl"
                    >
                      <div className="p-6">
                        <div className="font-semibold text-slate-800 flex items-center justify-between">
                          {faq.question}
                          <span className="text-slate-500 text-sm">[Collapsed]</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
              <span className="w-4 h-4 text-red-600">✨</span>
              <span className="text-sm font-medium text-red-700">
                Still have questions?
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              {content.bottomCTA.title}
            </h3>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {content.bottomCTA.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg">
                {content.bottomCTA.primaryButton}
              </button>

              <button className="text-slate-600 font-medium">
                {content.bottomCTA.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};