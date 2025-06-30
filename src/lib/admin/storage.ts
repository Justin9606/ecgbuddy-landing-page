import { SiteContent } from './types';

const STORAGE_KEY = 'ecgbuddy_admin_content';
const PREVIEW_STORAGE_KEY = 'ecgbuddy_admin_preview_draft';

/**
 * Save site content to localStorage
 */
export const saveSiteContent = (content: SiteContent): void => {
  try {
    const serializedContent = JSON.stringify(content);
    localStorage.setItem(STORAGE_KEY, serializedContent);
    console.log('Site content saved to localStorage');
  } catch (error) {
    console.error('Failed to save site content:', error);
  }
};

/**
 * Load site content from localStorage
 */
export const loadSiteContent = (): SiteContent | null => {
  try {
    const serializedContent = localStorage.getItem(STORAGE_KEY);
    if (!serializedContent) {
      return null;
    }
    return JSON.parse(serializedContent) as SiteContent;
  } catch (error) {
    console.error('Failed to load site content:', error);
    return null;
  }
};

/**
 * Save preview draft to localStorage
 */
export const savePreviewDraft = (content: SiteContent): void => {
  try {
    const serializedContent = JSON.stringify(content);
    localStorage.setItem(PREVIEW_STORAGE_KEY, serializedContent);
    console.log('Preview draft saved to localStorage');
  } catch (error) {
    console.error('Failed to save preview draft:', error);
  }
};

/**
 * Load preview draft from localStorage
 */
export const loadPreviewDraft = (): SiteContent | null => {
  try {
    const serializedContent = localStorage.getItem(PREVIEW_STORAGE_KEY);
    if (!serializedContent) {
      return null;
    }
    return JSON.parse(serializedContent) as SiteContent;
  } catch (error) {
    console.error('Failed to load preview draft:', error);
    return null;
  }
};

/**
 * Clear preview draft from localStorage
 */
export const clearPreviewDraft = (): void => {
  try {
    localStorage.removeItem(PREVIEW_STORAGE_KEY);
    console.log('Preview draft cleared from localStorage');
  } catch (error) {
    console.error('Failed to clear preview draft:', error);
  }
};

/**
 * Get default site content structure
 */
export const getDefaultSiteContent = (): SiteContent => {
  return {
    header: {
      logoText: "ECG Buddy",
      tagline: "AI-powered ECG analysis",
      navigationItems: [
        { name: "Product", href: "#product" },
        { name: "Solutions", href: "#solutions" },
        { name: "Resources", href: "#resources" },
        { name: "FAQ", href: "#faq" },
        { name: "About Us", href: "#about" },
      ],
      ctaButton: {
        text: "Try ECG Buddy",
        link: "#mobile-download",
      },
      languages: [
        { code: "ko", name: "KOR", isActive: true },
        { code: "en", name: "ENG", isActive: false },
      ],
    },
    hero: {
      mainHeading: {
        line1: "Revolutionize",
        line2: "ECG Analysis",
      },
      subtitle: "Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide.",
      testimonials: [
        {
          text: "ECG Buddy has revolutionized our emergency department workflow",
          author: "Dr. Sarah Kim",
          role: "Emergency Medicine, Seoul National University Hospital",
          avatar: "👩‍⚕️",
          hospital: "Seoul National University Hospital",
          rating: 5,
        },
        {
          text: "The AI accuracy is remarkable - it's like having a cardiologist available 24/7",
          author: "Dr. Michael Chen",
          role: "Cardiology, Samsung Medical Center",
          avatar: "👨‍⚕️",
          hospital: "Samsung Medical Center",
          rating: 5,
        },
      ],
      ctaButtons: {
        primary: {
          text: "Start Analysis",
          link: "#mobile-download",
        },
        secondary: {
          text: "Watch Demo",
          link: "#demo",
        },
      },
      metrics: [
        { label: "Analyses Today", value: "1,247", icon: "Activity", color: "red" },
        { label: "Active Users", value: "892", icon: "Users", color: "pink" },
        { label: "Accuracy Rate", value: "99.2%", icon: "Target", color: "rose" },
      ],
      trustIndicators: [
        {
          icon: "Award",
          text: "FDA Approved",
          subtext: "Medical Device",
          gradient: "from-emerald-500 to-teal-600",
        },
        {
          icon: "Shield",
          text: "HIPAA Compliant",
          subtext: "Enterprise Security",
          gradient: "from-blue-500 to-indigo-600",
        },
        {
          icon: "Users",
          text: "10,000+ Users",
          subtext: "Healthcare Professionals",
          gradient: "from-purple-500 to-violet-600",
        },
      ],
    },
    features: {
      sectionHeader: {
        title: "Professional-grade tools\nfor modern healthcare",
        description: "Comprehensive suite of advanced features designed to enhance diagnostic accuracy and streamline cardiac care workflows for healthcare professionals.",
      },
      categories: [
        { id: "all", name: "All Features" },
        { id: "ai", name: "AI & ML" },
        { id: "performance", name: "Performance" },
        { id: "security", name: "Security" },
        { id: "collaboration", name: "Collaboration" },
        { id: "analytics", name: "Analytics" },
        { id: "integration", name: "Integration" },
      ],
      features: [
        {
          id: "ai-powered-analysis",
          title: "AI-Powered Analysis",
          description: "Advanced machine learning algorithms trained on millions of ECG patterns for unprecedented accuracy and reliability.",
          icon: "Brain",
          gradient: "from-violet-500 via-purple-600 to-indigo-600",
          stats: "99.2% Accuracy",
          highlight: "Deep Learning",
          category: "ai",
          benefits: ["Real-time interpretation", "Continuous learning", "Pattern recognition"],
          rating: 4.9,
          badge: "Most Popular",
        },
        {
          id: "real-time-processing",
          title: "Real-time Processing",
          description: "Get comprehensive ECG analysis results in under 30 seconds with our optimized cloud processing engine.",
          icon: "Clock",
          gradient: "from-amber-500 via-orange-500 to-red-500",
          stats: "<30s Processing",
          highlight: "Lightning Fast",
          category: "performance",
          benefits: ["Instant results", "Cloud optimization", "Batch processing"],
          rating: 4.8,
          badge: "Speed Champion",
        },
      ],
    },
    mobileDownload: {
      sectionHeader: {
        title: "Take ECG Buddy\neverywhere you go",
        description: "Access powerful ECG analysis on any device. Download our native apps for seamless real-time analysis, cloud sync, and platform-specific integrations.",
      },
      apps: [
        {
          id: "ios",
          name: "iOS App",
          icon: "Apple",
          platform: "iPhone & iPad",
          version: "v2.1.4",
          size: "45.2 MB",
          rating: "4.9",
          downloads: "50K+",
          gradient: "from-slate-600 via-slate-700 to-slate-800",
          qrPlaceholder: "iOS-QR-CODE",
          storeLink: "https://apps.apple.com/app/ecg-buddy",
          features: ["Face ID Security", "HealthKit Integration", "Accurate Analysis", "Apple Watch Support"],
        },
        {
          id: "android",
          name: "Android App",
          icon: "Play",
          platform: "Android 8.0+",
          version: "v2.1.3",
          size: "38.7 MB",
          rating: "4.8",
          downloads: "100K+",
          gradient: "from-slate-600 via-slate-700 to-slate-800",
          qrPlaceholder: "ANDROID-QR-CODE",
          storeLink: "https://play.google.com/store/apps/details?id=com.arpi.ecgbuddy",
          features: ["Biometric Security", "Google Health Connect", "Real-time Processing", "Wear OS Support"],
        },
      ],
      bottomFeatures: [
        {
          icon: "Smartphone",
          title: "Cross-Platform Sync",
          description: "Seamlessly sync your ECG data across all devices with real-time cloud synchronization.",
          gradient: "from-red-500 to-pink-600",
        },
        {
          icon: "Target",
          title: "Accurate Analysis",
          description: "Get precise ECG interpretations with our advanced AI algorithms trained on millions of cardiac patterns.",
          gradient: "from-pink-500 to-rose-600",
        },
      ],
    },
    faq: {
      sectionHeader: {
        title: "Got questions?\nWe have answers",
        description: "Everything you need to know about ECG Buddy, from getting started to advanced features and enterprise solutions.",
      },
      categories: [
        {
          title: "Getting Started",
          icon: "HelpCircle",
          gradient: "from-red-500 to-pink-600",
          questions: [
            {
              question: "How does ECG Buddy work?",
              answer: "ECG Buddy uses advanced AI algorithms trained on millions of ECG patterns to analyze your cardiac data. Simply upload your ECG file, and our system processes it in under 30 seconds, providing detailed analysis including rhythm classification, abnormality detection, and clinical recommendations.",
              highlights: ["AI-powered analysis", "Under 30 seconds", "Clinical recommendations"],
            },
          ],
        },
      ],
      bottomCTA: {
        title: "We're here to help",
        description: "Can't find what you're looking for? Our support team is available 24/7 to answer any questions about ECG Buddy.",
        primaryButton: "Contact Support",
        secondaryButton: "Schedule a demo",
      },
    },
    aboutARPI: {
      sectionHeader: {
        title: "About ARPI Inc.",
        description: "Leading the future of AI-powered healthcare solutions with innovative technology and dedicated expertise.",
      },
      companyInfo: {
        name: "ARPI Inc.",
        description: "We are a cutting-edge healthcare technology company focused on developing AI-powered solutions that enhance diagnostic accuracy and improve patient outcomes.",
        founded: "2020",
        location: "Seoul, South Korea",
        employees: "50+",
      },
      values: [
        {
          icon: "Heart",
          title: "Patient-Centered",
          description: "Every solution we develop prioritizes patient safety and improved healthcare outcomes.",
          gradient: "from-red-500 to-pink-600",
        },
      ],
      team: [
        {
          name: "Dr. Kim Min-jun",
          role: "CEO & Co-founder",
          avatar: "👨‍⚕️",
          bio: "Cardiologist and AI researcher with 15+ years of experience in cardiac care and medical technology.",
        },
      ],
      achievements: [
        {
          icon: "Award",
          title: "FDA Approval",
          description: "First Korean AI ECG analysis platform to receive FDA clearance",
          stats: "2023",
        },
      ],
    },
    footer: {
      companyInfo: {
        name: "ARPI Inc.",
        description: "Empowering healthcare professionals with AI-driven ECG analysis for better patient outcomes and streamlined cardiac care.",
        logo: "Building2",
      },
      contactInfo: {
        email: "contact@ecgbuddy.ai",
        phone: "+82 (0)2-1234-5678",
        address: "Seoul, South Korea",
      },
      sections: [
        {
          title: "Product",
          links: [
            { name: "ECG Analysis", href: "#analysis", description: "AI-powered diagnostics" },
            { name: "Features", href: "#features", description: "Complete feature set" },
          ],
        },
      ],
      socialLinks: [
        { platform: "Twitter", href: "#twitter", icon: "Twitter" },
        { platform: "LinkedIn", href: "#linkedin", icon: "Linkedin" },
        { platform: "GitHub", href: "#github", icon: "Github" },
      ],
      legal: {
        copyright: "© 2024 ARPI Inc. All rights reserved.",
        privacyPolicy: "#privacy",
        termsOfService: "#terms",
      },
    },
  };
};

/**
 * Check if localStorage is available
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};