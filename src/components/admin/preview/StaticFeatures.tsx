"use client";

import React from "react";
import { Brain, Clock, Shield, Users, BarChart3, Stethoscope, ArrowRight, CheckCircle, Star } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import { getIconComponent } from "@/lib/utils/icons";
import type { FeatureContent } from "@/lib/admin/types";

export const StaticFeatures: React.FC = () => {
  const content = getSectionContent<FeatureContent>('features');

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Simple Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-6 py-3 mb-8">
            <span className="text-sm font-medium text-slate-700">Core Features</span>
            <div className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full font-medium">
              {content.features.length} Available
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 mb-2">
              {content.sectionHeader.title.split('\n')[0]}
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {content.sectionHeader.title.split('\n')[1] || ''}
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {content.sectionHeader.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            return (
              <div
                key={feature.id}
                className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="bg-slate-100/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-semibold text-slate-700">
                        {feature.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="text-sm font-semibold text-slate-700">
                          {feature.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">
                        {feature.stats}
                      </div>
                      <div className="text-xs text-slate-500">
                        {feature.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center space-x-2 text-sm text-slate-600"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 pb-8">
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                    <span className="text-sm font-medium text-slate-500">
                      Learn more
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};