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
    
    // Trigger content update event
    window.dispatchEvent(new CustomEvent('adminContentUpdate'));
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
    
    // Trigger content update event
    window.dispatchEvent(new CustomEvent('adminContentUpdate'));
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
    
    // Trigger content update event
    window.dispatchEvent(new CustomEvent('adminContentUpdate'));
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
        link: "#download-app",
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
          text: "Download App",
          link: "#download-app",
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
        {
          id: "medical-grade-security",
          title: "Medical Grade Security",
          description: "HIPAA-compliant platform with end-to-end encryption and enterprise-level security protocols.",
          icon: "Shield",
          gradient: "from-emerald-500 via-green-600 to-teal-600",
          stats: "100% Compliant",
          highlight: "HIPAA Certified",
          category: "security",
          benefits: ["End-to-end encryption", "Audit trails", "Access controls"],
          rating: 4.9,
          badge: "Enterprise Ready",
        },
        {
          id: "team-collaboration",
          title: "Team Collaboration",
          description: "Share ECG analyses with colleagues, add annotations, and collaborate on complex cases in real-time.",
          icon: "Users",
          gradient: "from-blue-500 via-indigo-600 to-purple-600",
          stats: "Real-time Sync",
          highlight: "Team Features",
          category: "collaboration",
          benefits: ["Real-time sharing", "Annotations", "Case discussions"],
          rating: 4.7,
          badge: "Team Favorite",
        },
        {
          id: "advanced-analytics",
          title: "Advanced Analytics",
          description: "Comprehensive reporting and analytics dashboard with trend analysis and performance metrics.",
          icon: "BarChart3",
          gradient: "from-orange-500 via-red-500 to-pink-600",
          stats: "50+ Metrics",
          highlight: "Data Insights",
          category: "analytics",
          benefits: ["Trend analysis", "Performance metrics", "Custom reports"],
          rating: 4.6,
          badge: "Data Driven",
        },
        {
          id: "ehr-integration",
          title: "EHR Integration",
          description: "Seamlessly integrate with major Electronic Health Record systems for streamlined workflow.",
          icon: "Stethoscope",
          gradient: "from-teal-500 via-cyan-600 to-blue-600",
          stats: "20+ EHR Systems",
          highlight: "Universal Compatibility",
          category: "integration",
          benefits: ["Direct EHR sync", "Workflow automation", "Data consistency"],
          rating: 4.8,
          badge: "Integration Leader",
        },
      ],
    },
    downloadApp: {
      sectionHeader: {
        title: "Download ECG Buddy\nfor all your devices",
        description: "Access powerful ECG analysis on any platform. Download our native apps for seamless real-time analysis, cloud sync, and platform-specific integrations across iOS, Android, and Windows.",
      },
      apps: [
        {
          id: "ios",
          name: "ECG Buddy for iOS",
          icon: "Apple",
          platform: "iPhone & iPad",
          version: "v2.1.4",
          size: "45.2 MB",
          rating: "4.9",
          downloads: "50K+",
          gradient: "from-slate-600 via-slate-700 to-slate-800",
          qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5pT1MgUVIgQ29kZTwvdGV4dD4KPC9zdmc+",
          storeLink: "https://apps.apple.com/app/ecg-buddy",
          features: ["Face ID Security", "HealthKit Integration", "Real-time Analysis", "Apple Watch Support", "Siri Shortcuts", "iCloud Sync"],
          systemRequirements: ["iOS 14.0 or later", "iPhone 8 or newer", "iPad (6th generation) or newer", "Apple Watch Series 3 or later"],
          releaseNotes: "• Improved AI accuracy by 15%\n• Added Apple Watch ECG support\n• Enhanced HealthKit integration\n• Bug fixes and performance improvements",
        },
        {
          id: "android",
          name: "ECG Buddy for Android",
          icon: "Play",
          platform: "Android Devices",
          version: "v2.1.3",
          size: "38.7 MB",
          rating: "4.8",
          downloads: "100K+",
          gradient: "from-green-500 via-green-600 to-emerald-600",
          qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5BbmRyb2lkIFFSPC90ZXh0Pgo8L3N2Zz4=",
          storeLink: "https://play.google.com/store/apps/details?id=com.arpi.ecgbuddy",
          features: ["Biometric Security", "Google Health Connect", "Real-time Processing", "Wear OS Support", "Google Assistant", "Drive Backup"],
          systemRequirements: ["Android 8.0 (API level 26) or higher", "2GB RAM minimum", "50MB storage space", "Internet connection required"],
          releaseNotes: "• New Material You design\n• Google Health Connect integration\n• Improved performance on older devices\n• Enhanced security features",
        },
        {
          id: "windows",
          name: "ECG Buddy for Windows",
          icon: "Monitor",
          platform: "Windows Desktop",
          version: "v2.0.8",
          size: "125.4 MB",
          rating: "4.7",
          downloads: "25K+",
          gradient: "from-blue-500 via-blue-600 to-indigo-600",
          qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5XaW5kb3dzIFFSPC90ZXh0Pgo8L3N2Zz4=",
          storeLink: "https://www.microsoft.com/store/apps/ecg-buddy",
          features: ["Windows Hello", "Multi-monitor Support", "Keyboard Shortcuts", "File Integration", "Print Support", "Offline Mode"],
          systemRequirements: ["Windows 10 version 1903 or later", "4GB RAM minimum", "200MB storage space", "DirectX 11 compatible graphics"],
          releaseNotes: "• Windows 11 optimization\n• New keyboard shortcuts\n• Improved multi-monitor support\n• Enhanced file handling",
        },
      ],
      crossPlatformFeatures: [
        {
          icon: "Smartphone",
          title: "Cross-Platform Sync",
          description: "Seamlessly sync your ECG data across all devices with real-time cloud synchronization and automatic backup.",
          gradient: "from-red-500 to-pink-600",
        },
        {
          icon: "Target",
          title: "Consistent Experience",
          description: "Enjoy the same powerful features and intuitive interface across iOS, Android, and Windows platforms.",
          gradient: "from-blue-500 to-indigo-600",
        },
        {
          icon: "Shield",
          title: "Universal Security",
          description: "Industry-leading security standards maintained across all platforms with biometric authentication support.",
          gradient: "from-emerald-500 to-teal-600",
        },
        {
          icon: "Brain",
          title: "AI Everywhere",
          description: "Access the same advanced AI analysis engine on any device, with cloud processing for consistent results.",
          gradient: "from-purple-500 to-violet-600",
        },
      ],
      downloadStats: {
        totalDownloads: "175K+",
        activeUsers: "50K+",
        averageRating: "4.8",
        supportedCountries: "120+",
      },
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
            {
              question: "What file formats are supported?",
              answer: "ECG Buddy supports all major ECG file formats including PDF, XML, SCP-ECG, DICOM, and direct device integration with popular ECG machines from GE, Philips, and other manufacturers.",
              highlights: ["Multiple formats", "Device integration", "Universal compatibility"],
            },
          ],
        },
        {
          title: "Features & Accuracy",
          icon: "Brain",
          gradient: "from-purple-500 to-indigo-600",
          questions: [
            {
              question: "How accurate is the AI analysis?",
              answer: "Our AI has been validated against cardiologist interpretations with 99.2% accuracy for rhythm classification and 97.8% for abnormality detection. The system is continuously learning and improving with each analysis.",
              highlights: ["99.2% accuracy", "Validated by cardiologists", "Continuous learning"],
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
        {
          icon: "Brain",
          title: "Innovation-Driven",
          description: "We leverage cutting-edge AI and machine learning to push the boundaries of medical technology.",
          gradient: "from-purple-500 to-indigo-600",
        },
        {
          icon: "Shield",
          title: "Security-First",
          description: "We maintain the highest standards of data security and privacy protection for healthcare information.",
          gradient: "from-emerald-500 to-teal-600",
        },
      ],
      team: [
        {
          name: "Dr. Kim Min-jun",
          role: "CEO & Co-founder",
          avatar: "👨‍⚕️",
          bio: "Cardiologist and AI researcher with 15+ years of experience in cardiac care and medical technology.",
        },
        {
          name: "Dr. Sarah Park",
          role: "CTO & Co-founder",
          avatar: "👩‍💻",
          bio: "Former Google AI researcher specializing in medical imaging and machine learning applications.",
        },
        {
          name: "Dr. James Lee",
          role: "Chief Medical Officer",
          avatar: "👨‍⚕️",
          bio: "Emergency medicine physician with expertise in point-of-care diagnostics and clinical workflows.",
        },
      ],
      achievements: [
        {
          icon: "Award",
          title: "FDA Approval",
          description: "First Korean AI ECG analysis platform to receive FDA clearance",
          stats: "2023",
        },
        {
          icon: "Users",
          title: "Healthcare Professionals",
          description: "Trusted by medical professionals across 120+ countries worldwide",
          stats: "10,000+",
        },
        {
          icon: "Target",
          title: "Analysis Accuracy",
          description: "Validated accuracy rate for ECG rhythm classification",
          stats: "99.2%",
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
            { name: "Download Apps", href: "#download-app", description: "iOS, Android, Windows" },
            { name: "Pricing", href: "#pricing", description: "Flexible plans" },
          ],
        },
        {
          title: "Solutions",
          links: [
            { name: "Hospitals", href: "#hospitals", description: "Enterprise solutions" },
            { name: "Clinics", href: "#clinics", description: "Small practice tools" },
            { name: "Research", href: "#research", description: "Academic partnerships" },
          ],
        },
        {
          title: "Support",
          links: [
            { name: "Help Center", href: "#help", description: "Documentation & guides" },
            { name: "Contact Us", href: "#contact", description: "Get in touch" },
            { name: "System Status", href: "#status", description: "Service availability" },
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