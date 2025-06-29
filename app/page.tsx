'use client'

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MobileDownload from '../components/MobileDownload';
import FAQ from '../components/FAQ';
import AboutARPI from '../components/AboutARPI';
import Footer from '../components/Footer';

export default function Home() {
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