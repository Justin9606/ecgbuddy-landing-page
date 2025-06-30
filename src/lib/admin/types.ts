// Admin-specific types for content management

export interface ContentSection {
  id: string;
  title: string;
  lastModified: string;
  isPublished: boolean;
  data: Record<string, any>;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  lastLogin: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: string;
}

// Content structure for each section
export interface HeaderContent {
  logoText: string;
  tagline: string;
  navigationItems: Array<{
    name: string;
    href: string;
    description?: string;
  }>;
  ctaButton: {
    text: string;
    link: string;
  };
  languages: Array<{
    code: string;
    name: string;
    isActive: boolean;
  }>;
}

export interface HeroContent {
  mainHeading: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  testimonials: Array<{
    text: string;
    author: string;
    role: string;
    avatar: string;
    hospital: string;
    rating: number;
  }>;
  ctaButtons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  metrics: Array<{
    label: string;
    value: string;
    icon: string;
    color: string;
  }>;
  trustIndicators: Array<{
    icon: string;
    text: string;
    subtext: string;
    gradient: string;
  }>;
}

export interface FeatureContent {
  sectionHeader: {
    title: string;
    description: string;
  };
  categories: Array<{
    id: string;
    name: string;
  }>;
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    gradient: string;
    stats: string;
    highlight: string;
    category: string;
    benefits: string[];
    rating: number;
    badge: string;
  }>;
}

export interface MobileDownloadContent {
  sectionHeader: {
    title: string;
    description: string;
  };
  apps: Array<{
    id: string;
    name: string;
    icon: string;
    platform: string;
    version: string;
    size: string;
    rating: string;
    downloads: string;
    gradient: string;
    qrPlaceholder: string;
    storeLink: string;
    features: string[];
  }>;
  bottomFeatures: Array<{
    icon: string;
    title: string;
    description: string;
    gradient: string;
  }>;
}

export interface FAQContent {
  sectionHeader: {
    title: string;
    description: string;
  };
  categories: Array<{
    title: string;
    icon: string;
    gradient: string;
    questions: Array<{
      question: string;
      answer: string;
      highlights: string[];
    }>;
  }>;
  bottomCTA: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
}

export interface AboutARPIContent {
  sectionHeader: {
    title: string;
    description: string;
  };
  companyInfo: {
    name: string;
    description: string;
    founded: string;
    location: string;
    employees: string;
  };
  values: Array<{
    icon: string;
    title: string;
    description: string;
    gradient: string;
  }>;
  team: Array<{
    name: string;
    role: string;
    avatar: string;
    bio: string;
  }>;
  achievements: Array<{
    icon: string;
    title: string;
    description: string;
    stats: string;
  }>;
}

export interface FooterContent {
  companyInfo: {
    name: string;
    description: string;
    logo: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  sections: Array<{
    title: string;
    links: Array<{
      name: string;
      href: string;
      description: string;
      external?: boolean;
    }>;
  }>;
  socialLinks: Array<{
    platform: string;
    href: string;
    icon: string;
  }>;
  legal: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
}

// Combined content type
export interface SiteContent {
  header: HeaderContent;
  hero: HeroContent;
  features: FeatureContent;
  mobileDownload: MobileDownloadContent;
  faq: FAQContent;
  aboutARPI: AboutARPIContent;
  footer: FooterContent;
}

// Admin activity tracking
export interface AdminActivity {
  id: string;
  userId: string;
  action: string;
  section: string;
  timestamp: string;
  details?: string;
}

// Preview mode
export interface PreviewSession {
  id: string;
  content: Partial<SiteContent>;
  createdAt: string;
  expiresAt: string;
}