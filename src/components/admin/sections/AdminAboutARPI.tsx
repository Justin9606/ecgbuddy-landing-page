"use client";

import React from "react";
import { AboutARPI } from "@/components/sections";
import { EditableWrapper } from "@/components/admin/EditableWrapper";

export const AdminAboutARPI: React.FC = () => {
  return (
    <div className="relative">
      <EditableWrapper
        id="about-arpi-section"
        type="section"
        label="About ARPI Section"
        content={{
          title: "Leading AI Healthcare Innovation",
          subtitle: "ARPI Inc. develops cutting-edge artificial intelligence solutions for healthcare, with ECG Buddy as our flagship product revolutionizing cardiac care.",
          badge: "About ARPI"
        }}
        metadata={{
          section: "about-arpi",
          priority: "medium"
        }}
      >
        <AboutARPI />
      </EditableWrapper>
    </div>
  );
};