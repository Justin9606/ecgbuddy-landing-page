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
        {/* The Hero component now contains its own granular EditableWrapper components */}
        <Hero />
      </EditableWrapper>
    </div>
  );
};