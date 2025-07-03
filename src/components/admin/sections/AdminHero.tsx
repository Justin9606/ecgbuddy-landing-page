"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
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
          secondaryCTA: "Watch Demo"
        }}
        metadata={{
          section: "hero",
          priority: "high"
        }}
      >
        <Hero />
      </EditableWrapper>
    </div>
  );
};