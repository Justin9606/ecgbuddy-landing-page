// Page Builder utilities and types

export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  category: string;
  icon: string;
  defaultProps: Record<string, any>;
  schema: ComponentSchema;
}

export interface ComponentSchema {
  properties: Record<string, PropertySchema>;
  required?: string[];
}

export interface PropertySchema {
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'textarea';
  label: string;
  description?: string;
  default?: any;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
}

export interface PageComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: PageComponent[];
  style?: Record<string, any>;
}

export interface PageSection {
  id: string;
  name: string;
  components: PageComponent[];
  settings: {
    background?: string;
    padding?: string;
    margin?: string;
    maxWidth?: string;
  };
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  sections: PageSection[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  settings: {
    layout: 'full-width' | 'boxed';
    theme: 'light' | 'dark';
  };
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

// Component Library Definitions
export const componentLibrary: ComponentDefinition[] = [
  // Layout Components
  {
    id: 'container',
    type: 'container',
    name: 'Container',
    category: 'layout',
    icon: 'Layout',
    defaultProps: {
      maxWidth: '1200px',
      padding: '2rem',
      margin: '0 auto',
    },
    schema: {
      properties: {
        maxWidth: {
          type: 'string',
          label: 'Max Width',
          description: 'Maximum width of the container',
          default: '1200px',
        },
        padding: {
          type: 'string',
          label: 'Padding',
          description: 'Internal spacing',
          default: '2rem',
        },
        margin: {
          type: 'string',
          label: 'Margin',
          description: 'External spacing',
          default: '0 auto',
        },
      },
    },
  },
  {
    id: 'grid',
    type: 'grid',
    name: 'Grid',
    category: 'layout',
    icon: 'Grid',
    defaultProps: {
      columns: 3,
      gap: '1rem',
      responsive: true,
    },
    schema: {
      properties: {
        columns: {
          type: 'number',
          label: 'Columns',
          description: 'Number of grid columns',
          default: 3,
          min: 1,
          max: 12,
        },
        gap: {
          type: 'string',
          label: 'Gap',
          description: 'Space between grid items',
          default: '1rem',
        },
        responsive: {
          type: 'boolean',
          label: 'Responsive',
          description: 'Enable responsive behavior',
          default: true,
        },
      },
    },
  },

  // Content Components
  {
    id: 'heading',
    type: 'heading',
    name: 'Heading',
    category: 'content',
    icon: 'Type',
    defaultProps: {
      text: 'Your Heading Here',
      level: 'h2',
      size: '2xl',
      color: '#1f2937',
      align: 'left',
      fontWeight: 'bold',
    },
    schema: {
      properties: {
        text: {
          type: 'string',
          label: 'Text',
          description: 'Heading text content',
          default: 'Your Heading Here',
        },
        level: {
          type: 'select',
          label: 'HTML Level',
          description: 'Semantic heading level',
          default: 'h2',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
            { label: 'H4', value: 'h4' },
            { label: 'H5', value: 'h5' },
            { label: 'H6', value: 'h6' },
          ],
        },
        size: {
          type: 'select',
          label: 'Size',
          description: 'Visual size of the heading',
          default: '2xl',
          options: [
            { label: 'Small', value: 'lg' },
            { label: 'Medium', value: 'xl' },
            { label: 'Large', value: '2xl' },
            { label: 'Extra Large', value: '3xl' },
            { label: 'Huge', value: '4xl' },
          ],
        },
        color: {
          type: 'color',
          label: 'Color',
          description: 'Text color',
          default: '#1f2937',
        },
        align: {
          type: 'select',
          label: 'Alignment',
          description: 'Text alignment',
          default: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
    },
  },
  {
    id: 'paragraph',
    type: 'paragraph',
    name: 'Paragraph',
    category: 'content',
    icon: 'Type',
    defaultProps: {
      text: 'Your paragraph text goes here. This is a sample text that you can edit.',
      size: 'base',
      color: '#6b7280',
      align: 'left',
      lineHeight: 'relaxed',
    },
    schema: {
      properties: {
        text: {
          type: 'textarea',
          label: 'Text',
          description: 'Paragraph content',
          default: 'Your paragraph text goes here.',
        },
        size: {
          type: 'select',
          label: 'Size',
          description: 'Text size',
          default: 'base',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'base' },
            { label: 'Large', value: 'lg' },
            { label: 'Extra Large', value: 'xl' },
          ],
        },
        color: {
          type: 'color',
          label: 'Color',
          description: 'Text color',
          default: '#6b7280',
        },
        align: {
          type: 'select',
          label: 'Alignment',
          description: 'Text alignment',
          default: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
            { label: 'Justify', value: 'justify' },
          ],
        },
      },
    },
  },

  // Interactive Components
  {
    id: 'button',
    type: 'button',
    name: 'Button',
    category: 'interactive',
    icon: 'Button',
    defaultProps: {
      text: 'Click Me',
      variant: 'primary',
      size: 'md',
      href: '#',
      target: '_self',
      fullWidth: false,
    },
    schema: {
      properties: {
        text: {
          type: 'string',
          label: 'Button Text',
          description: 'Text displayed on the button',
          default: 'Click Me',
        },
        variant: {
          type: 'select',
          label: 'Style',
          description: 'Button style variant',
          default: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        size: {
          type: 'select',
          label: 'Size',
          description: 'Button size',
          default: 'md',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        href: {
          type: 'string',
          label: 'Link URL',
          description: 'Where the button links to',
          default: '#',
        },
        target: {
          type: 'select',
          label: 'Link Target',
          description: 'How the link opens',
          default: '_self',
          options: [
            { label: 'Same Window', value: '_self' },
            { label: 'New Window', value: '_blank' },
          ],
        },
        fullWidth: {
          type: 'boolean',
          label: 'Full Width',
          description: 'Make button full width',
          default: false,
        },
      },
    },
  },

  // Medical Components
  {
    id: 'feature-card',
    type: 'feature-card',
    name: 'Feature Card',
    category: 'medical',
    icon: 'Heart',
    defaultProps: {
      icon: 'Heart',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning for accurate ECG interpretation',
      gradient: 'from-red-500 to-pink-600',
      showBadge: false,
      badge: 'New',
    },
    schema: {
      properties: {
        icon: {
          type: 'select',
          label: 'Icon',
          description: 'Feature icon',
          default: 'Heart',
          options: [
            { label: 'Heart', value: 'Heart' },
            { label: 'Brain', value: 'Brain' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Activity', value: 'Activity' },
            { label: 'Users', value: 'Users' },
          ],
        },
        title: {
          type: 'string',
          label: 'Title',
          description: 'Feature title',
          default: 'AI-Powered Analysis',
        },
        description: {
          type: 'textarea',
          label: 'Description',
          description: 'Feature description',
          default: 'Advanced machine learning for accurate ECG interpretation',
        },
        gradient: {
          type: 'select',
          label: 'Color Gradient',
          description: 'Icon background gradient',
          default: 'from-red-500 to-pink-600',
          options: [
            { label: 'Red to Pink', value: 'from-red-500 to-pink-600' },
            { label: 'Blue to Purple', value: 'from-blue-500 to-purple-600' },
            { label: 'Green to Teal', value: 'from-green-500 to-teal-600' },
            { label: 'Orange to Red', value: 'from-orange-500 to-red-600' },
          ],
        },
        showBadge: {
          type: 'boolean',
          label: 'Show Badge',
          description: 'Display a badge on the card',
          default: false,
        },
        badge: {
          type: 'string',
          label: 'Badge Text',
          description: 'Text for the badge',
          default: 'New',
        },
      },
    },
  },
];

// Utility functions
export const generateComponentId = (type: string): string => {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getComponentDefinition = (type: string): ComponentDefinition | undefined => {
  return componentLibrary.find(comp => comp.type === type);
};

export const createComponent = (type: string, customProps?: Record<string, any>): PageComponent => {
  const definition = getComponentDefinition(type);
  if (!definition) {
    throw new Error(`Component type "${type}" not found`);
  }

  return {
    id: generateComponentId(type),
    type,
    props: { ...definition.defaultProps, ...customProps },
  };
};

export const validateComponent = (component: PageComponent): boolean => {
  const definition = getComponentDefinition(component.type);
  if (!definition) return false;

  // Check required properties
  if (definition.schema.required) {
    for (const requiredProp of definition.schema.required) {
      if (!(requiredProp in component.props)) {
        return false;
      }
    }
  }

  return true;
};

// Page management
export const createNewPage = (name: string, slug: string): Page => {
  return {
    id: `page-${Date.now()}`,
    name,
    slug,
    sections: [
      {
        id: `section-${Date.now()}`,
        name: 'Hero Section',
        components: [],
        settings: {
          background: 'white',
          padding: '4rem 0',
          maxWidth: '1200px',
        },
      },
    ],
    seo: {
      title: name,
      description: '',
      keywords: [],
    },
    settings: {
      layout: 'full-width',
      theme: 'light',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: false,
  };
};

export const savePage = (page: Page): void => {
  try {
    const pages = loadPages();
    const existingIndex = pages.findIndex(p => p.id === page.id);
    
    const updatedPage = {
      ...page,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      pages[existingIndex] = updatedPage;
    } else {
      pages.push(updatedPage);
    }

    localStorage.setItem('ecgbuddy_pages', JSON.stringify(pages));
    console.log('Page saved successfully');
  } catch (error) {
    console.error('Failed to save page:', error);
  }
};

export const loadPages = (): Page[] => {
  try {
    const pagesData = localStorage.getItem('ecgbuddy_pages');
    return pagesData ? JSON.parse(pagesData) : [];
  } catch (error) {
    console.error('Failed to load pages:', error);
    return [];
  }
};

export const loadPage = (id: string): Page | null => {
  const pages = loadPages();
  return pages.find(p => p.id === id) || null;
};

export const deletePage = (id: string): void => {
  try {
    const pages = loadPages();
    const filteredPages = pages.filter(p => p.id !== id);
    localStorage.setItem('ecgbuddy_pages', JSON.stringify(filteredPages));
    console.log('Page deleted successfully');
  } catch (error) {
    console.error('Failed to delete page:', error);
  }
};