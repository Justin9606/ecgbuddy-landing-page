"use client";

import {
  Header,
  Footer,
  Hero,
  Features,
  Pricing,
  MobileDownload,
  FAQ,
  AboutARPI,
} from "@/components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <MobileDownload />
      <FAQ />
      <AboutARPI />
      <Footer />
    </div>
  );
}