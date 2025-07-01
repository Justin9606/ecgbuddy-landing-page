// Keyboard shortcuts for admin panel
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
  category: string;
}

export class KeyboardShortcutManager {
  private shortcuts: KeyboardShortcut[] = [];
  private isEnabled = true;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  // Register a shortcut
  register(shortcut: KeyboardShortcut) {
    this.shortcuts.push(shortcut);
  }

  // Register multiple shortcuts
  registerMultiple(shortcuts: KeyboardShortcut[]) {
    this.shortcuts.push(...shortcuts);
  }

  // Unregister a shortcut
  unregister(key: string, ctrlKey?: boolean, shiftKey?: boolean, altKey?: boolean) {
    this.shortcuts = this.shortcuts.filter(shortcut => 
      !(shortcut.key === key && 
        shortcut.ctrlKey === ctrlKey && 
        shortcut.shiftKey === shiftKey && 
        shortcut.altKey === altKey)
    );
  }

  // Handle keydown events
  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isEnabled) return;

    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      return;
    }

    const matchingShortcut = this.shortcuts.find(shortcut => 
      shortcut.key.toLowerCase() === event.key.toLowerCase() &&
      !!shortcut.ctrlKey === event.ctrlKey &&
      !!shortcut.shiftKey === event.shiftKey &&
      !!shortcut.altKey === event.altKey
    );

    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.action();
    }
  }

  // Enable/disable shortcuts
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  // Get all shortcuts grouped by category
  getShortcutsByCategory(): Record<string, KeyboardShortcut[]> {
    return this.shortcuts.reduce((acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    }, {} as Record<string, KeyboardShortcut[]>);
  }

  // Format shortcut for display
  formatShortcut(shortcut: KeyboardShortcut): string {
    const parts = [];
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.altKey) parts.push('Alt');
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  }

  // Cleanup
  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.shortcuts = [];
  }
}

// Hook for using keyboard shortcuts
import { useEffect, useRef } from 'react';

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const manager = useRef<KeyboardShortcutManager | null>(null);

  useEffect(() => {
    manager.current = new KeyboardShortcutManager();
    manager.current.registerMultiple(shortcuts);

    return () => {
      manager.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (manager.current) {
      // Clear existing shortcuts and register new ones
      manager.current.destroy();
      manager.current = new KeyboardShortcutManager();
      manager.current.registerMultiple(shortcuts);
    }
  }, [shortcuts]);

  return manager.current;
};

// Common admin shortcuts
export const createAdminShortcuts = (actions: {
  onSave: () => void;
  onPreview: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSearch?: () => void;
  onHelp?: () => void;
}): KeyboardShortcut[] => [
  {
    key: 's',
    ctrlKey: true,
    action: actions.onSave,
    description: 'Save changes',
    category: 'File',
  },
  {
    key: 'p',
    ctrlKey: true,
    action: actions.onPreview,
    description: 'Preview changes',
    category: 'View',
  },
  {
    key: 'z',
    ctrlKey: true,
    action: actions.onUndo || (() => {}),
    description: 'Undo last change',
    category: 'Edit',
  },
  {
    key: 'y',
    ctrlKey: true,
    action: actions.onRedo || (() => {}),
    description: 'Redo last change',
    category: 'Edit',
  },
  {
    key: 'f',
    ctrlKey: true,
    action: actions.onSearch || (() => {}),
    description: 'Search content',
    category: 'Navigation',
  },
  {
    key: 'h',
    ctrlKey: true,
    action: actions.onHelp || (() => {}),
    description: 'Show help',
    category: 'Help',
  },
];