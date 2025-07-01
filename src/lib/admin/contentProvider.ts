// Content provider to bridge admin data with landing page components
import React from 'react';
import { SiteContent, getDefaultSiteContent, loadSiteContent, loadPreviewDraft } from './storage';

/**
 * Get content for the landing page
 * Priority: Preview Draft > Saved Content > Default Content
 */
export const getLandingPageContent = (): SiteContent => {
  // First try to load preview draft (for preview mode)
  const previewContent = loadPreviewDraft();
  if (previewContent) {
    console.log('Using preview draft content');
    return previewContent;
  }

  // Then try to load saved content
  const savedContent = loadSiteContent();
  if (savedContent) {
    console.log('Using saved admin content');
    return savedContent;
  }

  // Fall back to default content
  console.log('Using default content');
  return getDefaultSiteContent();
};

/**
 * Get specific section content
 */
export const getSectionContent = <T>(sectionKey: keyof SiteContent): T => {
  const content = getLandingPageContent();
  return content[sectionKey] as T;
};

/**
 * Hook to get content with real-time updates for admin preview
 */
export const useAdminContentData = () => {
  const [content, setContent] = React.useState<SiteContent>(getLandingPageContent());

  React.useEffect(() => {
    const handleStorageChange = () => {
      setContent(getLandingPageContent());
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('adminContentUpdate', handleStorageChange);

    // Poll for changes every 100ms for real-time admin preview
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminContentUpdate', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return content;
};

/**
 * Hook to get content with real-time updates for landing page
 */
export const useContentData = () => {
  const [content, setContent] = React.useState<SiteContent>(getLandingPageContent());

  React.useEffect(() => {
    const handleStorageChange = () => {
      setContent(getLandingPageContent());
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('adminContentUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminContentUpdate', handleStorageChange);
    };
  }, []);

  return content;
};

// Helper to trigger content updates
export const triggerContentUpdate = () => {
  window.dispatchEvent(new CustomEvent('adminContentUpdate'));
};