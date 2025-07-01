// Optimized content provider with proper caching and performance
import React, { useMemo, useCallback } from 'react';
import { SiteContent, getDefaultSiteContent, loadSiteContent, loadPreviewDraft } from './storage';

// Cache for content to avoid repeated parsing
let contentCache: SiteContent | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 1000; // 1 second cache

/**
 * Get content for the landing page with caching
 */
export const getLandingPageContent = (): SiteContent => {
  const now = Date.now();
  
  // Return cached content if still valid
  if (contentCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return contentCache;
  }

  // First try to load preview draft (for preview mode)
  const previewContent = loadPreviewDraft();
  if (previewContent) {
    contentCache = previewContent;
    cacheTimestamp = now;
    return previewContent;
  }

  // Then try to load saved content
  const savedContent = loadSiteContent();
  if (savedContent) {
    contentCache = savedContent;
    cacheTimestamp = now;
    return savedContent;
  }

  // Fall back to default content
  const defaultContent = getDefaultSiteContent();
  contentCache = defaultContent;
  cacheTimestamp = now;
  return defaultContent;
};

/**
 * Clear content cache
 */
export const clearContentCache = () => {
  contentCache = null;
  cacheTimestamp = 0;
};

/**
 * Get specific section content with memoization
 */
export const getSectionContent = <T>(sectionKey: keyof SiteContent): T => {
  const content = getLandingPageContent();
  return content[sectionKey] as T;
};

/**
 * Optimized hook for admin content with reduced polling
 */
export const useAdminContentData = () => {
  const [content, setContent] = React.useState<SiteContent>(() => getLandingPageContent());
  const [updateTrigger, setUpdateTrigger] = React.useState(0);

  // Memoized update handler
  const handleContentUpdate = useCallback(() => {
    clearContentCache();
    setContent(getLandingPageContent());
  }, []);

  // Trigger manual update
  const triggerUpdate = useCallback(() => {
    setUpdateTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    // Listen for localStorage changes
    window.addEventListener('storage', handleContentUpdate);
    
    // Listen for custom events (for same-tab updates)
    window.addEventListener('adminContentUpdate', handleContentUpdate);

    return () => {
      window.removeEventListener('storage', handleContentUpdate);
      window.removeEventListener('adminContentUpdate', handleContentUpdate);
    };
  }, [handleContentUpdate]);

  // Manual update trigger effect
  useEffect(() => {
    if (updateTrigger > 0) {
      handleContentUpdate();
    }
  }, [updateTrigger, handleContentUpdate]);

  return { content, triggerUpdate };
};

/**
 * Standard hook for landing page (no polling)
 */
export const useContentData = () => {
  const [content, setContent] = React.useState<SiteContent>(() => getLandingPageContent());

  const handleStorageChange = useCallback(() => {
    clearContentCache();
    setContent(getLandingPageContent());
  }, []);

  React.useEffect(() => {
    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('adminContentUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminContentUpdate', handleStorageChange);
    };
  }, [handleStorageChange]);

  return content;
};

// Helper to trigger content updates efficiently
export const triggerContentUpdate = () => {
  clearContentCache();
  window.dispatchEvent(new CustomEvent('adminContentUpdate'));
};