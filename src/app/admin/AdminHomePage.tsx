"use client";

import React from "react";
import { AdminHero } from "@/components/admin/sections/AdminHero";
import { AdminFeatures } from "@/components/admin/sections/AdminFeatures";
import { AdminPricing } from "@/components/admin/sections/AdminPricing";
import { AdminMobileDownload } from "@/components/admin/sections/AdminMobileDownload";
import { AdminFAQ } from "@/components/admin/sections/AdminFAQ";
import { AdminAboutARPI } from "@/components/admin/sections/AdminAboutARPI";
import { Header, Footer } from "@/components";

export const AdminHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AdminHero />
      <AdminFeatures />
      <AdminPricing />
      <AdminMobileDownload />
      <AdminFAQ />
      <AdminAboutARPI />
      <Footer />
    </div>
  );
};