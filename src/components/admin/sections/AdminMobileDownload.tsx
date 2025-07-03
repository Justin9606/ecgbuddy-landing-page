"use client";

import React from "react";
import { MobileDownload } from "@/components/sections/MobileDownload";
import { EditableWrapper } from "@/components/admin/EditableWrapper";

export const AdminMobileDownload: React.FC = () => {
  return (
    <div className="relative">
      <EditableWrapper
        id="mobile-download-section"
        type="section"
        label="Mobile Download Section"
        content={{
          title: "Take ECG Buddy everywhere you go",
          subtitle: "Access powerful ECG analysis on any device. Download our native apps for seamless real-time analysis, cloud sync, and platform-specific integrations.",
          badge: "Mobile & Desktop Apps"
        }}
        metadata={{
          section: "mobile-download",
          priority: "medium"
        }}
      >
        <MobileDownload />
      </EditableWrapper>
    </div>
  );
};