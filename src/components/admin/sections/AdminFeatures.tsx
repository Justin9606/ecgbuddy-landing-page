"use client";

import React from "react";
import Features from "@/components/sections/Features";
import { EditableWrapper } from "@/components/admin/EditableWrapper";

export const AdminFeatures: React.FC = () => {
  return (
    <div className="relative">
      <EditableWrapper
        id="features-section"
        type="section"
        label="Features Section"
        content={{
          title: "Professional-grade tools for modern healthcare",
          subtitle: "Comprehensive suite of advanced features designed to enhance diagnostic accuracy and streamline cardiac care workflows for healthcare professionals.",
          badge: "Core Features"
        }}
        metadata={{
          section: "features",
          priority: "high"
        }}
      >
        <Features />
      </EditableWrapper>
    </div>
  );
};