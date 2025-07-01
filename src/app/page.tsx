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
      <Header />
      <Hero />
      <Features />
      <MobileDownload />
      <FAQ />
      <AboutARPI />
      <Footer />
    </div>
  );
}
