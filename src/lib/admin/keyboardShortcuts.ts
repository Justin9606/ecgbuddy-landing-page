// Enhanced keyboard shortcuts with better performance and UX
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
  private activeModifiers = new Set<string>();

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
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

    // Track modifier keys
    if (event.ctrlKey) this.activeModifiers.add('ctrl');
    if (event.shiftKey) this.activeModifiers.add('shift');
    if (event.altKey) this.activeModifiers.add('alt');

    // Don't trigger shortcuts when typing in inputs, textareas, or contenteditable
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.contentEditable === 'true' ||
      target.closest('.ql-editor') // Quill editor
    ) {
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
      event.stopPropagation();
      
      try {
        matchingShortcut.action();
      } catch (error) {
        console.error('Error executing keyboard shortcut:', error);
      }
    }
  }

  // Handle keyup events
  private handleKeyUp(event: KeyboardEvent) {
    // Clear modifier keys
    if (!event.ctrlKey) this.activeModifiers.delete('ctrl');
    if (!event.shiftKey) this.activeModifiers.delete('shift');
    if (!event.altKey) this.activeModifiers.delete('alt');
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

  // Check if shortcut is currently possible
  isShortcutActive(shortcut: KeyboardShortcut): boolean {
    return (
      (!shortcut.ctrlKey || this.activeModifiers.has('ctrl')) &&
      (!shortcut.shiftKey || this.activeModifiers.has('shift')) &&
      (!shortcut.altKey || this.activeModifiers.has('alt'))
    );
  }

  // Cleanup
  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.shortcuts = [];
    this.activeModifiers.clear();
  }
}

// Hook for using keyboard shortcuts with better performance
import { useEffect, useRef, useMemo } from 'react';

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const manager = useRef<KeyboardShortcutManager | null>(null);
  
  // Memoize shortcuts to prevent unnecessary re-registrations
  const memoizedShortcuts = useMemo(() => shortcuts, [JSON.stringify(shortcuts.map(s => ({
    key: s.key,
    ctrlKey: s.ctrlKey,
    shiftKey: s.shiftKey,
    altKey: s.altKey,
    description: s.description,
    category: s.category
  })))]);

  useEffect(() => {
    // Destroy existing manager
    if (manager.current) {
      manager.current.destroy();
    }

    // Create new manager with current shortcuts
    manager.current = new KeyboardShortcutManager();
    manager.current.registerMultiple(memoizedShortcuts);

    return () => {
      manager.current?.destroy();
    };
  }, [memoizedShortcuts]);

  return manager.current;
};

// Enhanced admin shortcuts with better organization
export const createAdminShortcuts = (actions: {
  onSave: () => void;
  onPreview: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSearch?: () => void;
  onHelp?: () => void;
  onDuplicate?: () => void;
  onReset?: () => void;
}): KeyboardShortcut[] => [
  // File operations
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
    category: 'File',
  },
  
  // Edit operations
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
    key: 'd',
    ctrlKey: true,
    action: actions.onDuplicate || (() => {}),
    description: 'Duplicate section',
    category: 'Edit',
  },
  {
    key: 'r',
    ctrlKey: true,
    shiftKey: true,
    action: actions.onReset || (() => {}),
    description: 'Reset to saved',
    category: 'Edit',
  },
  
  // Navigation
  {
    key: 'f',
    ctrlKey: true,
    action: actions.onSearch || (() => {}),
    description: 'Search content',
    category: 'Navigation',
  },
  
  // Help
  {
    key: 'h',
    ctrlKey: true,
    action: actions.onHelp || (() => {}),
    description: 'Show help',
    category: 'Help',
  },
  {
    key: '?',
    action: actions.onHelp || (() => {}),
    description: 'Show help',
    category: 'Help',
  },
];