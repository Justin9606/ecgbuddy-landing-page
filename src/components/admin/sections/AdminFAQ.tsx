"use client";

import React from "react";
import { FAQ } from "@/components/sections";
import { EditableWrapper } from "@/components/admin/EditableWrapper";

export const AdminFAQ: React.FC = () => {
  return (
    <div className="relative">
      <EditableWrapper
        id="faq-section"
        type="section"
        label="FAQ Section"
        content={{
          title: "Got questions? We have answers",
          subtitle: "Everything you need to know about ECG Buddy, from getting started to advanced features and enterprise solutions.",
          badge: "Frequently Asked Questions"
        }}
        metadata={{
          section: "faq",
          priority: "medium"
        }}
      >
        <FAQ />
      </EditableWrapper>
    </div>
  );
};