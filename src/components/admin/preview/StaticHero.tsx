"use client";

import React from "react";
import { ArrowRight, Play, Heart, Users, Target, Activity, Star } from "lucide-react";
import { getSectionContent } from "@/lib/admin/contentProvider";
import type { HeroContent } from "@/lib/admin/types";

export const StaticHero: React.FC = () => {
  const content = getSectionContent<HeroContent>('hero');

  return (
    <section className="relative py-16 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            <span className="text-sm font-medium text-slate-700">
              Trusted by 10,000+ Healthcare Professionals
            </span>
            <Users className="w-4 h-4 text-red-500" />
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-none mb-4">
              <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                {content.mainHeading.line1}
              </span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                {content.mainHeading.line2}
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto opacity-60" />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            {content.subtitle}
          </p>

          {/* Testimonial */}
          {content.testimonials.length > 0 && (
            <div className="mb-8 max-w-3xl mx-auto">
              <div className="bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-2xl">{content.testimonials[0].avatar}</span>
                  <div className="text-left">
                    <p className="text-slate-700 font-medium italic">
                      "{content.testimonials[0].text}"
                    </p>
                    <div className="text-sm text-slate-500 mt-2 flex items-center space-x-2">
                      <span className="font-semibold">{content.testimonials[0].author}</span>
                      <span>•</span>
                      <span>{content.testimonials[0].role}</span>
                      <div className="flex items-center ml-2">
                        {[...Array(content.testimonials[0].rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Metrics */}
          {content.metrics.length > 0 && (
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {content.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-2xl p-4 text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      {metric.icon === "Activity" && <Activity className={`w-5 h-5 text-${metric.color}-500`} />}
                      {metric.icon === "Users" && <Users className={`w-5 h-5 text-${metric.color}-500`} />}
                      {metric.icon === "Target" && <Target className={`w-5 h-5 text-${metric.color}-500`} />}
                    </div>
                    <div className={`text-2xl font-bold text-${metric.color}-600`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center space-x-3">
              <span>{content.ctaButtons.primary.text}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button className="bg-white/60 backdrop-blur-2xl border border-red-100/50 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg flex items-center space-x-3">
              <Play className="w-5 h-5" />
              <span>{content.ctaButtons.secondary.text}</span>
            </button>
          </div>

          {/* Trust Indicators */}
          {content.trustIndicators.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {content.trustIndicators.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 backdrop-blur-2xl border border-emerald-200/50 rounded-2xl p-6 min-w-[200px]"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center`}>
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-sm mb-1">
                        {item.text}
                      </div>
                      <div className="text-xs text-slate-600">
                        {item.subtext}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};