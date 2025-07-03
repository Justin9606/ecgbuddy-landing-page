"use client";

import React from "react";
import { useAdminEditing } from "@/lib/contexts/AdminEditingContext";
import { sectionComponents } from "@/components/admin/sections";
import { Header, Footer } from "@/components";

export const AdminHomePage: React.FC = () => {
  const { pageStructure } = useAdminEditing();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Dynamic Section Rendering */}
      {pageStructure.map((sectionId, index) => {
        const SectionComponent = sectionComponents[sectionId as keyof typeof sectionComponents];
        
        if (!SectionComponent) {
          console.warn(`Section component not found for: ${sectionId}`);
          return null;
        }

        return (
          <React.Fragment key={`${sectionId}-${index}`}>
            <SectionComponent />
          </React.Fragment>
        );
      })}
      
      <Footer />
    </div>
  );
};