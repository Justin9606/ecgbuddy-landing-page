// Auto-save functionality with debouncing
export class AutoSaveManager {
  private saveTimeout: NodeJS.Timeout | null = null;
  private readonly SAVE_DELAY = 500; // 500ms debounce
  private readonly STORAGE_KEY = 'ecgbuddy_admin_autosave';
  
  constructor(
    private onSave: (content: any) => void,
    private onSaveStart?: () => void,
    private onSaveComplete?: () => void,
    private onSaveError?: (error: Error) => void
  ) {}

  // Schedule auto-save with debouncing
  scheduleAutoSave(content: any) {
    // Clear existing timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // Set new timeout
    this.saveTimeout = setTimeout(() => {
      this.performSave(content);
    }, this.SAVE_DELAY);
  }

  // Perform immediate save
  async performSave(content: any) {
    try {
      this.onSaveStart?.();
      
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        content,
        timestamp: Date.now(),
        version: this.generateVersion()
      }));
      
      // Call the save callback
      await this.onSave(content);
      
      this.onSaveComplete?.();
      console.log('Auto-save completed successfully');
    } catch (error) {
      console.error('Auto-save failed:', error);
      this.onSaveError?.(error as Error);
    }
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

// Hook for using auto-save
import { useEffect, useRef, useState } from 'react';

export const useAutoSave = (
  content: any,
  onSave: (content: any) => void,
  enabled: boolean = true
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const autoSaveManager = useRef<AutoSaveManager | null>(null);
  const lastContentRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    autoSaveManager.current = new AutoSaveManager(
      onSave,
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
  }, [onSave, enabled]);

  // Schedule auto-save when content changes
  useEffect(() => {
    if (autoSaveManager.current && content && 
        JSON.stringify(content) !== JSON.stringify(lastContentRef.current)) {
      lastContentRef.current = content;
      autoSaveManager.current.scheduleAutoSave(content);
    }
  }, [content]);

  const forceSave = () => {
    if (autoSaveManager.current && content) {
      autoSaveManager.current.performSave(content);
    }
  };

  const loadAutoSaved = () => {
    return autoSaveManager.current?.loadAutoSavedContent();
  };

  const clearAutoSaved = () => {
    autoSaveManager.current?.clearAutoSavedContent();
  };

  return {
    isSaving,
    lastSaved,
    saveError,
    forceSave,
    loadAutoSaved,
    clearAutoSaved,
  };
};