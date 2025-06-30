import { SiteContent } from './content-types';

const STORAGE_KEY = 'ecgbuddy_content';

// Default content - simple and clean
export const getDefaultContent = (): SiteContent => ({
  hero: {
    title: 'Revolutionize ECG Analysis',
    subtitle: 'AI-powered ECG analysis platform for healthcare professionals',
    primaryButtonText: 'Get Started',
    secondaryButtonText: 'Watch Demo',
  },
  features: {
    sectionTitle: 'Powerful Features',
    sectionDescription: 'Everything you need for professional ECG analysis',
    features: [
      {
        title: 'AI-Powered Analysis',
        description: 'Advanced machine learning for accurate ECG interpretation',
        icon: 'brain',
        category: 'ai'
      },
      {
        title: 'Real-time Processing',
        description: 'Get results in under 30 seconds',
        icon: 'clock',
        category: 'performance'
      }
    ]
  },
  testimonials: {
    sectionTitle: 'What Healthcare Professionals Say',
    testimonials: [
      {
        quote: 'ECG Buddy has transformed our workflow',
        author: 'Dr. Sarah Kim',
        position: 'Cardiologist',
        company: 'Seoul National University Hospital'
      }
    ]
  },
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'Everything you need to know about ECG Buddy',
    faqs: [
      {
        question: 'How accurate is the AI analysis?',
        answer: 'Our AI achieves 99.2% accuracy in clinical validation studies.'
      }
    ]
  },
  about: {
    companyName: 'ARPI Inc.',
    description: 'Leading healthcare technology company focused on AI-powered diagnostic solutions.',
    mission: 'To improve patient outcomes through innovative AI technology.',
    vision: 'A world where AI enhances every healthcare decision.',
    foundedYear: '2020',
    location: 'Seoul, South Korea',
    teamSize: '50+ professionals'
  },
  contact: {
    email: 'contact@ecgbuddy.ai',
    phone: '+82 (0)2-1234-5678',
    address: 'Seoul, South Korea',
    socialLinks: {
      twitter: 'https://twitter.com/ecgbuddy',
      linkedin: 'https://linkedin.com/company/arpi',
      github: 'https://github.com/arpi'
    }
  }
});

export const saveContent = (content: SiteContent): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};

export const loadContent = (): SiteContent => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : getDefaultContent();
};