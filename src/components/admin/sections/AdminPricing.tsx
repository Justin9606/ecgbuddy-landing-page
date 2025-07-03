"use client";

import React from "react";
import Pricing from "@/components/sections/Pricing";
import { EditableWrapper } from "@/components/admin/EditableWrapper";

export const AdminPricing: React.FC = () => {
  return (
    <div className="relative">
      <EditableWrapper
        id="pricing-section"
        type="section"
        label="Pricing Section"
        content={{
          title: "Choose your plan",
          subtitle: "Flexible credit-based pricing designed for healthcare professionals. Each credit equals one ECG analysis with our advanced AI system.",
          badge: "Credit-Based Pricing"
        }}
        metadata={{
          section: "pricing",
          priority: "high"
        }}
      >
        <Pricing />
      </EditableWrapper>
    </div>
  );
};