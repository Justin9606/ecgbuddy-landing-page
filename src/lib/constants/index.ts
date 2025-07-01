// App Information
export const APP_INFO = {
  name: "ECG Buddy",
  company: "ARPI Inc.",
  description: "AI-powered ECG analysis platform for healthcare professionals",
  version: "2.1.4",
  website: "https://ecgbuddy.com",
  blog: "https://ecgbuddy.tistory.com",
} as const;

// Contact Information
export const CONTACT_INFO = {
  email: "contact@ecgbuddy.ai",
  phone: "+82 (0)2-1234-5678",
  location: "Seoul, South Korea",
} as const;

// Social Links
export const SOCIAL_LINKS = {
  twitter: "#twitter",
  linkedin: "#linkedin",
  github: "#github",
} as const;

// Navigation Sections
export const NAV_SECTIONS = {
  HERO: "hero",
  FEATURES: "features",
  FAQ: "faq-section",
  ABOUT: "about-arpi-section",
  MOBILE_DOWNLOAD: "mobile-download",
} as const;

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const;

// Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Brand Colors
export const BRAND_COLORS = {
  PRIMARY: "red",
  SECONDARY: "pink",
  ACCENT: "rose",
  NEUTRAL: "slate",
} as const;

// Language and internationalization
export { LanguageProvider, useLanguage } from "@/lib/contexts/LanguageContext";
export type { Language, Translations } from "@/lib/contexts/LanguageContext";
