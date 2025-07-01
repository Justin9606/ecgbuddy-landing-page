// Enhanced content validation with comprehensive rules
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'url' | 'number' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface FieldSchema {
  name: string;
  type: 'text' | 'textarea' | 'richtext' | 'email' | 'url' | 'number' | 'boolean' | 'select' | 'image' | 'array' | 'draggable';
  label: string;
  description?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: Array<{ label: string; value: any }>;
  defaultValue?: any;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface ContentSchema {
  [sectionName: string]: {
    title: string;
    description: string;
    fields: FieldSchema[];
  };
}

// Enhanced validation functions
export const validateField = (value: any, field: FieldSchema): string[] => {
  const errors: string[] = [];
  
  // Required validation
  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push(`${field.label} is required`);
    return errors; // Return early if required field is empty
  }
  
  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return errors;
  }
  
  if (field.validation) {
    for (const rule of field.validation) {
      switch (rule.type) {
        case 'required':
          // Already handled above
          break;
          
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
          if (!emailRegex.test(value)) {
            errors.push(rule.message);
          }
          break;
          
        case 'url':
          try {
            new URL(value);
          } catch {
            errors.push(rule.message);
          }
          break;
          
        case 'number':
          if (isNaN(Number(value))) {
            errors.push(rule.message);
          }
          break;
          
        case 'min':
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue < rule.value) {
            errors.push(rule.message);
          }
          break;
          
        case 'max':
          const maxNumValue = Number(value);
          if (!isNaN(maxNumValue) && maxNumValue > rule.value) {
            errors.push(rule.message);
          }
          break;
          
        case 'pattern':
          const regex = new RegExp(rule.value);
          if (typeof value === 'string' && !regex.test(value)) {
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

export const validateSectionContent = (sectionContent: any, fields: FieldSchema[]): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};
  
  fields.forEach(field => {
    const fieldValue = getNestedValue(sectionContent, field.name);
    const fieldErrors = validateField(fieldValue, field);
    
    if (fieldErrors.length > 0) {
      errors[field.name] = fieldErrors;
    }
  });
  
  return errors;
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Utility functions for common validations
export const createEmailValidation = (message?: string): ValidationRule => ({
  type: 'email',
  message: message || 'Please enter a valid email address',
});

export const createUrlValidation = (message?: string): ValidationRule => ({
  type: 'url',
  message: message || 'Please enter a valid URL',
});

export const createRequiredValidation = (fieldName: string): ValidationRule => ({
  type: 'required',
  message: `${fieldName} is required`,
});

export const createLengthValidation = (min?: number, max?: number, fieldName?: string): ValidationRule[] => {
  const rules: ValidationRule[] = [];
  
  if (min !== undefined) {
    rules.push({
      type: 'minLength',
      value: min,
      message: `${fieldName || 'Field'} must be at least ${min} characters long`,
    });
  }
  
  if (max !== undefined) {
    rules.push({
      type: 'maxLength',
      value: max,
      message: `${fieldName || 'Field'} must be no more than ${max} characters long`,
    });
  }
  
  return rules;
};

export const createNumberValidation = (min?: number, max?: number, fieldName?: string): ValidationRule[] => {
  const rules: ValidationRule[] = [
    {
      type: 'number',
      message: `${fieldName || 'Field'} must be a valid number`,
    },
  ];
  
  if (min !== undefined) {
    rules.push({
      type: 'min',
      value: min,
      message: `${fieldName || 'Field'} must be at least ${min}`,
    });
  }
  
  if (max !== undefined) {
    rules.push({
      type: 'max',
      value: max,
      message: `${fieldName || 'Field'} must be no more than ${max}`,
    });
  }
  
  return rules;
};