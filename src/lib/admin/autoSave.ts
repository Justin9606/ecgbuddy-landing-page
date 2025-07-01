// Enhanced auto-save with proper debouncing and performance optimization
import { useEffect, useRef, useState, useCallback } from 'react';

export class AutoSaveManager {
  private saveTimeout: NodeJS.Timeout | null = null;
  private readonly SAVE_DELAY = 2000; // 2 seconds debounce (not 100ms!)
  private readonly STORAGE_KEY = 'ecgbuddy_admin_autosave';
  private lastSavedContent: string = '';
  
  constructor(
    private onSave: (content: any) => void,
    private onSaveStart?: () => void,
    private onSaveComplete?: () => void,
    private onSaveError?: (error: Error) => void
  ) {}

  // Schedule auto-save with proper debouncing
  scheduleAutoSave(content: any) {
    const contentString = JSON.stringify(content);
    
    // Don't save if content hasn't actually changed
    if (contentString === this.lastSavedContent) {
      return;
    }

    // Clear existing timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // Set new timeout with proper delay
    this.saveTimeout = setTimeout(() => {
      this.performSave(content);
    }, this.SAVE_DELAY);
  }

  // Perform immediate save
  async performSave(content: any) {
    try {
      const contentString = JSON.stringify(content);
      
      // Don't save if content hasn't changed
      if (contentString === this.lastSavedContent) {
        return;
      }

      this.onSaveStart?.();
      
      // Save to localStorage with timestamp
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        content,
        timestamp: Date.now(),
        version: this.generateVersion()
      }));
      
      // Call the save callback
      await this.onSave(content);
      
      this.lastSavedContent = contentString;
      this.onSaveComplete?.();
      console.log('Auto-save completed successfully');
    } catch (error) {
      console.error('Auto-save failed:', error);
      this.onSaveError?.(error as Error);
    }
  }

  // Force immediate save
  async forceSave(content: any) {
    this.cancelPendingSave();
    await this.performSave(content);
  }

  // Cancel pending save
  cancelPendingSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
  }

  // Load auto-saved content
  loadAutoSavedContent(): any | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.content;
      }
    } catch (error) {
      console.error('Failed to load auto-saved content:', error);
    }
    return null;
  }

  // Clear auto-saved content
  clearAutoSavedContent() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.lastSavedContent = '';
  }

  // Check if there's unsaved content
  hasUnsavedContent(currentContent: any): boolean {
    const autoSaved = this.loadAutoSavedContent();
    if (!autoSaved) return false;
    
    return JSON.stringify(autoSaved) !== JSON.stringify(currentContent);
  }

  // Generate version string
  private generateVersion(): string {
    return `v${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Cleanup
  destroy() {
    this.cancelPendingSave();
  }
}

// Optimized hook for auto-save
export const useAutoSave = (
  content: any,
  onSave: (content: any) => void,
  enabled: boolean = true
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const autoSaveManager = useRef<AutoSaveManager | null>(null);
  const lastContentRef = useRef<string>('');

  // Memoized save callback to prevent unnecessary re-renders
  const memoizedOnSave = useCallback(onSave, []);

  useEffect(() => {
    if (!enabled) return;

    autoSaveManager.current = new AutoSaveManager(
      memoizedOnSave,
      () => {
        setIsSaving(true);
        setSaveError(null);
      },
      () => {
        setIsSaving(false);
        setLastSaved(new Date());
      },
      (error) => {
        setIsSaving(false);
        setSaveError(error.message);
      }
    );

    return () => {
      autoSaveManager.current?.destroy();
    };
  }, [memoizedOnSave, enabled]);

  // Only trigger auto-save when content actually changes
  useEffect(() => {
    if (autoSaveManager.current && content) {
      const contentString = JSON.stringify(content);
      if (contentString !== lastContentRef.current) {
        lastContentRef.current = contentString;
        autoSaveManager.current.scheduleAutoSave(content);
      }
    }
  }, [content]);

  const forceSave = useCallback(() => {
    if (autoSaveManager.current && content) {
      return autoSaveManager.current.forceSave(content);
    }
  }, [content]);

  const loadAutoSaved = useCallback(() => {
    return autoSaveManager.current?.loadAutoSavedContent();
  }, []);

  const clearAutoSaved = useCallback(() => {
    autoSaveManager.current?.clearAutoSavedContent();
  }, []);

  return {
    isSaving,
    lastSaved,
    saveError,
    forceSave,
    loadAutoSaved,
    clearAutoSaved,
  };
};