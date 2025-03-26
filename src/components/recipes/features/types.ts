
import { ReactNode } from 'react';

export interface FeatureItem {
  name: string;
  available: boolean;
  comingSoonInfo?: string;
  iconName?: string;
  iconColor?: string;
  icon?: ReactNode; // Keep for backwards compatibility
  link?: string;
}

export interface FeatureItemProps {
  feature: FeatureItem;
  onClick: (feature: FeatureItem) => void;
  isSelected?: boolean;
}
