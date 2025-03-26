
import { ReactNode } from 'react';

export interface FeatureItem {
  name: string;
  available: boolean;
  comingSoonInfo?: string;
  icon?: ReactNode;
  link?: string;
}

export interface FeatureItemProps {
  feature: FeatureItem;
  onClick: (feature: FeatureItem) => void;
  isSelected?: boolean;
}
