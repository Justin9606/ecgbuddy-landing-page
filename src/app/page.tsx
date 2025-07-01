"use client";

import {
  Header,
  Footer,
  Hero,
  Features,
  FAQ,
  AboutARPI,
} from "@/components";
import DownloadApp from "@/components/sections/DownloadApp";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAdminView={false} />
      <Hero isAdminView={false} />
      <Features isAdminView={false} />
      <DownloadApp isAdminView={false} />
      <FAQ isAdminView={false} />
      <AboutARPI isAdminView={false} />
      <Footer isAdminView={false} />
    </div>
  );
}