// Content validation and schema management
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'url' | 'number' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface FieldSchema {
  name: string;
  type: 'text' | 'textarea' | 'richtext' | 'email' | 'url' | 'number' | 'boolean' | 'select' | 'image' | 'array';
  label: string;
  description?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: Array<{ label: string; value: any }>;
  defaultValue?: any;
  placeholder?: string;
}

export interface ContentSchema {
  [sectionName: string]: {
    title: string;
    description: string;
    fields: FieldSchema[];
  };
}

// Validation functions
export const validateField = (value: any, field: FieldSchema): string[] => {
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

export const validateContent = (content: any, schema: ContentSchema): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};
  
  Object.entries(schema).forEach(([sectionName, sectionSchema]) => {
    const sectionContent = content[sectionName] || {};
    
    sectionSchema.fields.forEach(field => {
      const fieldValue = getNestedValue(sectionContent, field.name);
      const fieldErrors = validateField(fieldValue, field);
      
      if (fieldErrors.length > 0) {
        errors[`${sectionName}.${field.name}`] = fieldErrors;
      }
    });
  });
  
  return errors;
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};