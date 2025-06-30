// Simple content types like Strapi
export interface ContentType {
  id: string;
  name: string;
  fields: ContentField[];
}

export interface ContentField {
  name: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'repeater';
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
}

// Simple content structure - no nested complexity
export interface HeroContent {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface FeaturesContent {
  sectionTitle: string;
  sectionDescription: string;
  features: FeatureItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

export interface TestimonialsContent {
  sectionTitle: string;
  testimonials: TestimonialItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  sectionTitle: string;
  sectionDescription: string;
  faqs: FAQItem[];
}

export interface AboutContent {
  companyName: string;
  description: string;
  mission: string;
  vision: string;
  foundedYear: string;
  location: string;
  teamSize: string;
}

export interface ContactContent {
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Main site content - flat structure
export interface SiteContent {
  hero: HeroContent;
  features: FeaturesContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  about: AboutContent;
  contact: ContactContent;
}

// Content type definitions
export const CONTENT_TYPES: Record<string, ContentType> = {
  hero: {
    id: 'hero',
    name: 'Hero Section',
    fields: [
      { name: 'title', type: 'text', label: 'Main Title', required: true },
      { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
      { name: 'primaryButtonText', type: 'text', label: 'Primary Button Text' },
      { name: 'secondaryButtonText', type: 'text', label: 'Secondary Button Text' },
    ]
  },
  features: {
    id: 'features',
    name: 'Features Section',
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title' },
      { name: 'sectionDescription', type: 'textarea', label: 'Section Description' },
      { name: 'features', type: 'repeater', label: 'Features' },
    ]
  },
  testimonials: {
    id: 'testimonials',
    name: 'Testimonials',
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title' },
      { name: 'testimonials', type: 'repeater', label: 'Testimonials' },
    ]
  },
  faq: {
    id: 'faq',
    name: 'FAQ Section',
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title' },
      { name: 'sectionDescription', type: 'textarea', label: 'Section Description' },
      { name: 'faqs', type: 'repeater', label: 'FAQ Items' },
    ]
  },
  about: {
    id: 'about',
    name: 'About Us',
    fields: [
      { name: 'companyName', type: 'text', label: 'Company Name' },
      { name: 'description', type: 'textarea', label: 'Company Description' },
      { name: 'mission', type: 'textarea', label: 'Mission Statement' },
      { name: 'vision', type: 'textarea', label: 'Vision Statement' },
      { name: 'foundedYear', type: 'text', label: 'Founded Year' },
      { name: 'location', type: 'text', label: 'Location' },
      { name: 'teamSize', type: 'text', label: 'Team Size' },
    ]
  },
  contact: {
    id: 'contact',
    name: 'Contact Information',
    fields: [
      { name: 'email', type: 'text', label: 'Email Address' },
      { name: 'phone', type: 'text', label: 'Phone Number' },
      { name: 'address', type: 'text', label: 'Address' },
    ]
  },
};