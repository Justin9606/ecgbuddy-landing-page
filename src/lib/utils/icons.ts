// Centralized icon utility for dynamic icon rendering
import {
  Activity,
  Users,
  Target,
  Heart,
  Clock,
  Shield,
  Award,
  TrendingUp,
  Brain,
  Zap,
  Star,
  CheckCircle,
  Building2,
  Globe,
  Smartphone,
  HelpCircle,
  FileText,
  Settings,
  Edit3,
  Link,
  Image,
  Type,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  RotateCcw,
  AlertCircle,
  Sparkles,
  Apple,
  Play,
  Monitor,
  Download,
  Home,
  Layout,
  Layers,
  BarChart3,
} from "lucide-react";

// Icon mapping for dynamic rendering
export const iconMap = {
  Activity,
  Users,
  Target,
  Heart,
  Clock,
  Shield,
  Award,
  TrendingUp,
  Brain,
  Zap,
  Star,
  CheckCircle,
  Building2,
  Globe,
  Smartphone,
  HelpCircle,
  FileText,
  Settings,
  Edit3,
  Link,
  Image,
  Type,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  RotateCcw,
  AlertCircle,
  Sparkles,
  Apple,
  Play,
  Monitor,
  Download,
  Home,
  Layout,
  Layers,
  BarChart3,
} as const;

export type IconName = keyof typeof iconMap;

/**
 * Get icon component by name
 */
export const getIconComponent = (iconName: string | IconName) => {
  return iconMap[iconName as IconName] || Activity;
};

/**
 * Check if icon name exists
 */
export const isValidIconName = (iconName: string): iconName is IconName => {
  return iconName in iconMap;
};

/**
 * Get all available icon names
 */
export const getAvailableIcons = (): IconName[] => {
  return Object.keys(iconMap) as IconName[];
};