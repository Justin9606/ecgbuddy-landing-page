// Common Types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

// Navigation Types
export interface NavLink {
  name: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

export interface MegaMenuSection {
  title: string;
  items: NavLink[];
}

export interface MegaMenu {
  sections: MegaMenuSection[];
  cta: {
    title: string;
    description: string;
    button: string;
    link: string;
  };
}

// Feature Types
export interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  stats: string;
  highlight: string;
  category: string;
  benefits: string[];
  rating: number;
  badge: string;
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
  highlights: string[];
}

export interface FAQCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  questions: FAQ[];
}

// Testimonial Types
export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
  hospital: string;
  rating: number;
}

// App Types
export interface AppInfo {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  platform: string;
  version: string;
  size: string;
  rating: string;
  downloads: string;
  gradient: string;
  qrPlaceholder: string;
  storeLink: string;
  features: string[];
}
