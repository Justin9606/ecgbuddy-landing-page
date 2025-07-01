import { AdminSection } from './types';

export interface FieldSchema {
  id: string;
  type: 'text' | 'richtext' | 'email' | 'url' | 'image' | 'draggable' | 'select' | 'number' | 'boolean';
  label: string;
  path: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  // For draggable fields
  itemFields?: string[];
  defaultItem?: any;
  // For select fields
  options?: Array<{ label: string; value: any }>;
  // For number fields
  min?: number;
  max?: number;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'url' | 'number' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface SectionSchema {
  id: string;
  title: string;
  icon: string;
  fields: FieldSchema[];
}

export interface ContentSectionConfig {
  title: string;
  description: string;
  icon: string;
  sections: SectionSchema[];
}

export const contentSchemas: Record<AdminSection, ContentSectionConfig> = {
  dashboard: {
    title: "Dashboard",
    description: "Overview and analytics",
    icon: "Home",
    sections: [],
  },
  
  header: {
    title: "Header",
    description: "Manage navigation, logo, and header elements",
    icon: "Globe",
    sections: [
      {
        id: "basic-info",
        title: "Basic Information",
        icon: "Edit3",
        fields: [
          {
            id: "logoText",
            type: "text",
            label: "Logo Text",
            path: "logoText",
            description: "The main logo text displayed in the header",
            required: true,
            validation: [
              {
                type: "required",
                message: "Logo text is required",
              },
              {
                type: "maxLength",
                value: 50,
                message: "Logo text must be less than 50 characters",
              },
            ],
          },
          {
            id: "tagline",
            type: "richtext",
            label: "Tagline",
            path: "tagline",
            description: "Short description below the logo",
            placeholder: "Enter a compelling tagline...",
          },
        ],
      },
      {
        id: "navigation",
        title: "Navigation Menu",
        icon: "Link",
        fields: [
          {
            id: "nav-items",
            type: "draggable",
            label: "Navigation Items",
            path: "navigationItems",
            itemFields: ["name", "href", "description"],
            defaultItem: { 
              name: "New Item", 
              href: "#new", 
              description: "Menu item description" 
            },
            description: "Main navigation menu items",
          },
        ],
      },
      {
        id: "cta-button",
        title: "Call-to-Action Button",
        icon: "Target",
        fields: [
          {
            id: "cta-text",
            type: "text",
            label: "Button Text",
            path: "ctaButton.text",
            description: "Text displayed on the CTA button",
            required: true,
            validation: [
              {
                type: "required",
                message: "Button text is required",
              },
            ],
          },
          {
            id: "cta-link",
            type: "url",
            label: "Button Link",
            path: "ctaButton.link",
            description: "URL or anchor link for the button",
            validation: [
              {
                type: "url",
                message: "Please enter a valid URL",
              },
            ],
          },
        ],
      },
      {
        id: "languages",
        title: "Language Settings",
        icon: "Globe",
        fields: [
          {
            id: "languages-list",
            type: "draggable",
            label: "Available Languages",
            path: "languages",
            itemFields: ["code", "name", "isActive"],
            defaultItem: { 
              code: "en", 
              name: "ENG", 
              isActive: false 
            },
            description: "Available language options",
          },
        ],
      },
    ],
  },

  hero: {
    title: "Hero Section",
    description: "Manage the main landing area content",
    icon: "Zap",
    sections: [
      {
        id: "basic-info",
        title: "Main Content",
        icon: "Edit3",
        fields: [
          {
            id: "main-heading-line1",
            type: "text",
            label: "Main Heading Line 1",
            path: "mainHeading.line1",
            description: "First line of the main heading",
            required: true,
            validation: [
              {
                type: "required",
                message: "Main heading line 1 is required",
              },
            ],
          },
          {
            id: "main-heading-line2",
            type: "text",
            label: "Main Heading Line 2",
            path: "mainHeading.line2",
            description: "Second line of the main heading",
            required: true,
            validation: [
              {
                type: "required",
                message: "Main heading line 2 is required",
              },
            ],
          },
          {
            id: "subtitle",
            type: "richtext",
            label: "Subtitle",
            path: "subtitle",
            description: "Supporting text below the main heading",
            placeholder: "Enter compelling subtitle text...",
          },
        ],
      },
      {
        id: "testimonials",
        title: "Testimonials",
        icon: "Users",
        fields: [
          {
            id: "testimonial-list",
            type: "draggable",
            label: "Testimonials",
            path: "testimonials",
            itemFields: ["text", "author", "role", "avatar", "hospital", "rating"],
            defaultItem: {
              text: "New testimonial",
              author: "Dr. Name",
              role: "Position, Hospital",
              avatar: "👨‍⚕️",
              hospital: "Hospital Name",
              rating: 5,
            },
            description: "Customer testimonials and reviews",
          },
        ],
      },
      {
        id: "cta-buttons",
        title: "Call-to-Action Buttons",
        icon: "Target",
        fields: [
          {
            id: "primary-cta",
            type: "text",
            label: "Primary Button Text",
            path: "ctaButtons.primary.text",
            description: "Text for the primary action button",
            required: true,
          },
          {
            id: "secondary-cta",
            type: "text",
            label: "Secondary Button Text",
            path: "ctaButtons.secondary.text",
            description: "Text for the secondary action button",
            required: true,
          },
        ],
      },
      {
        id: "metrics",
        title: "Live Metrics",
        icon: "BarChart3",
        fields: [
          {
            id: "metrics-list",
            type: "draggable",
            label: "Metrics",
            path: "metrics",
            itemFields: ["label", "value", "icon", "color"],
            defaultItem: {
              label: "New Metric",
              value: "0",
              icon: "Activity",
              color: "blue",
            },
            description: "Live metrics displayed in hero section",
          },
        ],
      },
      {
        id: "trust-indicators",
        title: "Trust Indicators",
        icon: "Shield",
        fields: [
          {
            id: "trust-list",
            type: "draggable",
            label: "Trust Indicators",
            path: "trustIndicators",
            itemFields: ["icon", "text", "subtext", "gradient"],
            defaultItem: {
              icon: "Award",
              text: "Certified",
              subtext: "Quality Assured",
              gradient: "from-emerald-500 to-teal-600",
            },
            description: "Trust badges and certifications",
          },
        ],
      },
    ],
  },

  features: {
    title: "Features",
    description: "Manage product features and capabilities",
    icon: "Settings",
    sections: [
      {
        id: "basic-info",
        title: "Section Header",
        icon: "Edit3",
        fields: [
          {
            id: "section-title",
            type: "richtext",
            label: "Section Title",
            path: "sectionHeader.title",
            description: "Main title for the features section",
            required: true,
          },
          {
            id: "section-description",
            type: "richtext",
            label: "Section Description",
            path: "sectionHeader.description",
            description: "Description text for the features section",
          },
        ],
      },
      {
        id: "categories",
        title: "Feature Categories",
        icon: "Layers",
        fields: [
          {
            id: "categories-list",
            type: "draggable",
            label: "Categories",
            path: "categories",
            itemFields: ["id", "name"],
            defaultItem: {
              id: "new-category",
              name: "New Category",
            },
            description: "Feature filter categories",
          },
        ],
      },
      {
        id: "feature-list",
        title: "Features",
        icon: "Settings",
        fields: [
          {
            id: "features",
            type: "draggable",
            label: "Feature Items",
            path: "features",
            itemFields: ["title", "description", "icon", "gradient", "stats", "highlight", "category", "benefits", "rating", "badge"],
            defaultItem: {
              id: "new-feature",
              title: "New Feature",
              description: "Feature description",
              icon: "Star",
              gradient: "from-blue-500 to-blue-600",
              stats: "100%",
              highlight: "New",
              category: "general",
              benefits: ["Benefit 1", "Benefit 2"],
              rating: 4.5,
              badge: "Popular",
            },
            description: "Individual feature items and their details",
          },
        ],
      },
    ],
  },

  "mobile-download": {
    title: "Download App",
    description: "Manage app download section",
    icon: "Download",
    sections: [
      {
        id: "basic-info",
        title: "Section Header",
        icon: "Edit3",
        fields: [
          {
            id: "section-title",
            type: "richtext",
            label: "Section Title",
            path: "sectionHeader.title",
            description: "Main title for the app download section",
            required: true,
          },
          {
            id: "section-description",
            type: "richtext",
            label: "Section Description",
            path: "sectionHeader.description",
            description: "Description text for the app download section",
          },
        ],
      },
      {
        id: "apps",
        title: "Mobile Apps",
        icon: "Download",
        fields: [
          {
            id: "apps-list",
            type: "draggable",
            label: "App Information",
            path: "apps",
            itemFields: ["name", "platform", "version", "size", "rating", "downloads", "storeLink", "features"],
            defaultItem: {
              id: "new-app",
              name: "New App",
              icon: "Smartphone",
              platform: "Platform",
              version: "v1.0.0",
              size: "50 MB",
              rating: "4.5",
              downloads: "1K+",
              gradient: "from-slate-600 to-slate-800",
              qrPlaceholder: "QR-CODE",
              storeLink: "#",
              features: ["Feature 1", "Feature 2"],
            },
            description: "Mobile app download information",
          },
        ],
      },
      {
        id: "bottom-features",
        title: "Bottom Features",
        icon: "Star",
        fields: [
          {
            id: "bottom-features-list",
            type: "draggable",
            label: "Bottom Features",
            path: "bottomFeatures",
            itemFields: ["icon", "title", "description", "gradient"],
            defaultItem: {
              icon: "Smartphone",
              title: "New Feature",
              description: "Feature description",
              gradient: "from-blue-500 to-blue-600",
            },
            description: "Additional features shown below apps",
          },
        ],
      },
    ],
  },

  faq: {
    title: "FAQ",
    description: "Manage frequently asked questions",
    icon: "HelpCircle",
    sections: [
      {
        id: "basic-info",
        title: "Section Header",
        icon: "Edit3",
        fields: [
          {
            id: "section-title",
            type: "richtext",
            label: "Section Title",
            path: "sectionHeader.title",
            description: "Main title for the FAQ section",
            required: true,
          },
          {
            id: "section-description",
            type: "richtext",
            label: "Section Description",
            path: "sectionHeader.description",
            description: "Description text for the FAQ section",
          },
        ],
      },
      {
        id: "faq-categories",
        title: "FAQ Categories",
        icon: "HelpCircle",
        fields: [
          {
            id: "categories",
            type: "draggable",
            label: "FAQ Categories",
            path: "categories",
            itemFields: ["title", "icon", "gradient", "questions"],
            defaultItem: {
              title: "New Category",
              icon: "HelpCircle",
              gradient: "from-blue-500 to-blue-600",
              questions: [],
            },
            description: "FAQ category groups",
          },
        ],
      },
      {
        id: "bottom-cta",
        title: "Bottom Call-to-Action",
        icon: "Target",
        fields: [
          {
            id: "cta-title",
            type: "text",
            label: "CTA Title",
            path: "bottomCTA.title",
            description: "Title for the bottom CTA section",
          },
          {
            id: "cta-description",
            type: "richtext",
            label: "CTA Description",
            path: "bottomCTA.description",
            description: "Description for the bottom CTA section",
          },
          {
            id: "primary-button",
            type: "text",
            label: "Primary Button Text",
            path: "bottomCTA.primaryButton",
            description: "Text for the primary button",
          },
          {
            id: "secondary-button",
            type: "text",
            label: "Secondary Button Text",
            path: "bottomCTA.secondaryButton",
            description: "Text for the secondary button",
          },
        ],
      },
    ],
  },

  "about-arpi": {
    title: "About ARPI",
    description: "Manage company information and team details",
    icon: "Building2",
    sections: [
      {
        id: "basic-info",
        title: "Company Information",
        icon: "Building2",
        fields: [
          {
            id: "section-title",
            type: "richtext",
            label: "Section Title",
            path: "sectionHeader.title",
            description: "Main title for the about section",
            required: true,
          },
          {
            id: "section-description",
            type: "richtext",
            label: "Section Description",
            path: "sectionHeader.description",
            description: "Description for the about section",
          },
          {
            id: "company-name",
            type: "text",
            label: "Company Name",
            path: "companyInfo.name",
            description: "Official company name",
            required: true,
          },
          {
            id: "company-description",
            type: "richtext",
            label: "Company Description",
            path: "companyInfo.description",
            description: "Brief description of the company",
          },
          {
            id: "founded",
            type: "text",
            label: "Founded Year",
            path: "companyInfo.founded",
            description: "Year the company was founded",
          },
          {
            id: "location",
            type: "text",
            label: "Location",
            path: "companyInfo.location",
            description: "Company headquarters location",
          },
          {
            id: "employees",
            type: "text",
            label: "Employee Count",
            path: "companyInfo.employees",
            description: "Number of employees",
          },
        ],
      },
      {
        id: "values",
        title: "Company Values",
        icon: "Heart",
        fields: [
          {
            id: "values-list",
            type: "draggable",
            label: "Values",
            path: "values",
            itemFields: ["icon", "title", "description", "gradient"],
            defaultItem: {
              icon: "Heart",
              title: "New Value",
              description: "Value description",
              gradient: "from-red-500 to-pink-600",
            },
            description: "Company values and principles",
          },
        ],
      },
      {
        id: "team",
        title: "Team Members",
        icon: "Users",
        fields: [
          {
            id: "team-list",
            type: "draggable",
            label: "Team Members",
            path: "team",
            itemFields: ["name", "role", "bio", "avatar"],
            defaultItem: {
              name: "Team Member",
              role: "Position",
              bio: "Brief bio",
              avatar: "👤",
            },
            description: "Company team members",
          },
        ],
      },
      {
        id: "achievements",
        title: "Achievements",
        icon: "Award",
        fields: [
          {
            id: "achievements-list",
            type: "draggable",
            label: "Achievements",
            path: "achievements",
            itemFields: ["icon", "title", "description", "stats"],
            defaultItem: {
              icon: "Award",
              title: "New Achievement",
              description: "Achievement description",
              stats: "2024",
            },
            description: "Company achievements and milestones",
          },
        ],
      },
    ],
  },

  footer: {
    title: "Footer",
    description: "Manage footer content and links",
    icon: "FileText",
    sections: [
      {
        id: "basic-info",
        title: "Company Information",
        icon: "Building2",
        fields: [
          {
            id: "company-name",
            type: "text",
            label: "Company Name",
            path: "companyInfo.name",
            description: "Company name in footer",
            required: true,
          },
          {
            id: "company-description",
            type: "richtext",
            label: "Company Description",
            path: "companyInfo.description",
            description: "Brief company description in footer",
          },
          {
            id: "company-logo",
            type: "text",
            label: "Logo Icon",
            path: "companyInfo.logo",
            description: "Icon name for company logo",
          },
        ],
      },
      {
        id: "contact",
        title: "Contact Information",
        icon: "Link",
        fields: [
          {
            id: "email",
            type: "email",
            label: "Email Address",
            path: "contactInfo.email",
            description: "Contact email address",
            validation: [
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ],
          },
          {
            id: "phone",
            type: "text",
            label: "Phone Number",
            path: "contactInfo.phone",
            description: "Contact phone number",
          },
          {
            id: "address",
            type: "text",
            label: "Address",
            path: "contactInfo.address",
            description: "Company address",
          },
        ],
      },
      {
        id: "sections",
        title: "Footer Sections",
        icon: "Layers",
        fields: [
          {
            id: "sections-list",
            type: "draggable",
            label: "Footer Sections",
            path: "sections",
            itemFields: ["title", "links"],
            defaultItem: {
              title: "New Section",
              links: [],
            },
            description: "Footer link sections",
          },
        ],
      },
      {
        id: "social",
        title: "Social Links",
        icon: "Globe",
        fields: [
          {
            id: "social-links",
            type: "draggable",
            label: "Social Links",
            path: "socialLinks",
            itemFields: ["platform", "href", "icon"],
            defaultItem: {
              platform: "Platform",
              href: "#",
              icon: "Globe",
            },
            description: "Social media links",
          },
        ],
      },
      {
        id: "legal",
        title: "Legal Information",
        icon: "FileText",
        fields: [
          {
            id: "copyright",
            type: "text",
            label: "Copyright Text",
            path: "legal.copyright",
            description: "Copyright notice",
          },
          {
            id: "privacy-policy",
            type: "url",
            label: "Privacy Policy URL",
            path: "legal.privacyPolicy",
            description: "Link to privacy policy",
          },
          {
            id: "terms-of-service",
            type: "url",
            label: "Terms of Service URL",
            path: "legal.termsOfService",
            description: "Link to terms of service",
          },
        ],
      },
    ],
  },

  "page-builder": {
    title: "Page Builder",
    description: "Build custom pages",
    icon: "Layers",
    sections: [],
  },

  "media-library": {
    title: "Media Library",
    description: "Manage media assets",
    icon: "Image",
    sections: [],
  },

  settings: {
    title: "Settings",
    description: "System settings",
    icon: "Settings",
    sections: [],
  },

  users: {
    title: "Users",
    description: "User management",
    icon: "Users",
    sections: [],
  },
};

// Helper function to get schema for a section
export const getSectionSchema = (section: AdminSection): ContentSectionConfig => {
  return contentSchemas[section] || {
    title: "Unknown Section",
    description: "Section not found",
    icon: "HelpCircle",
    sections: [],
  };
};

// Helper function to validate field value
export const validateFieldValue = (value: any, field: FieldSchema): string[] => {
  const errors: string[] = [];
  
  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push(`${field.label} is required`);
  }
  
  if (field.validation) {
    for (const rule of field.validation) {
      switch (rule.type) {
        case 'minLength':
          if (typeof value === 'string' && value.length < rule.value) {
            errors.push(rule.message);
          }
          break;
        case 'maxLength':
          if (typeof value === 'string' && value.length > rule.value) {
            errors.push(rule.message);
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
            errors.push(rule.message);
          }
          break;
        case 'url':
          try {
            if (value) new URL(value);
          } catch {
            errors.push(rule.message);
          }
          break;
        case 'number':
          if (value && isNaN(Number(value))) {
            errors.push(rule.message);
          }
          break;
        case 'custom':
          if (rule.validator && !rule.validator(value)) {
            errors.push(rule.message);
          }
          break;
      }
    }
  }
  
  return errors;
};