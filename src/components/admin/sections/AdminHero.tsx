"use client";

import React from "react";
import { Hero } from "@/components/sections";
import { EditableWrapper } from "@/components/admin/EditableWrapper";

export const AdminHero: React.FC = () => {
  return (
    <div className="relative">
      {/* Wrap the entire Hero section */}
      <EditableWrapper
        id="hero-section"
        type="section"
        label="Hero Section"
        content={{
          title: "Revolutionize ECG Analysis",
          subtitle: "Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide.",
          primaryCTA: "Try ECG Buddy",
          secondaryCTA: "Watch Demo",
          badge: "Trusted by 10,000+ Healthcare Professionals"
        }}
        styles={{
          backgroundColor: "from-red-50/30 via-white to-pink-50/20",
          padding: "py-32"
        }}
        metadata={{
          section: "hero",
          priority: "high",
          visible: true
        }}
      >
        <div className="relative">
          {/* Individual editable elements within Hero */}
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center">
              {/* Hero Title */}
              <EditableWrapper
                id="hero-title"
                type="text"
                label="Hero Title"
                content={{
                  text: "Revolutionize ECG Analysis"
                }}
                styles={{
                  fontSize: "text-6xl md:text-8xl",
                  fontWeight: "font-bold",
                  color: "from-slate-900 via-slate-800 to-slate-700"
                }}
                metadata={{
                  parent: "hero-section",
                  editable: true
                }}
              >
                <Hero />
              </EditableWrapper>
            </div>
          </div>
        </div>
      </EditableWrapper>
    </div>
  );
};