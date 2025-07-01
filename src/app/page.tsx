"use client";

import {
  Header,
  Footer,
  Hero,
  Features,
  MobileDownload,
  FAQ,
  AboutARPI,
} from "@/components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAdminView={false} />
      <Hero isAdminView={false} />
      <Features isAdminView={false} />
      <MobileDownload isAdminView={false} />
      <FAQ isAdminView={false} />
      <AboutARPI isAdminView={false} />
      <Footer isAdminView={false} />
    </div>
  );
}