
import React from 'react';
import { 
  Utensils, Users, Flag, Egg, 
  DollarSign, ArrowDown, LucideIcon
} from 'lucide-react';

interface FeatureIconProps {
  iconName?: string;
  iconColor?: string;
  className?: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ iconName, iconColor, className }) => {
  const getIconColor = (color: string = 'green') => {
    return color === 'amber' ? 'text-amber-500' : 'text-green-500';
  };

  const defaultClassName = `h-5 w-5 ${getIconColor(iconColor)} flex-shrink-0`;
  const finalClassName = className || defaultClassName;

  switch (iconName) {
    case 'Utensils':
      return <Utensils className={finalClassName} />;
    case 'Users':
      return <Users className={finalClassName} />;
    case 'Flag':
      return <Flag className={finalClassName} />;
    case 'Egg':
      return <Egg className={finalClassName} />;
    case 'DollarSign':
      return <DollarSign className={finalClassName} />;
    case 'ArrowDown':
      return <ArrowDown className={finalClassName} />;
    default:
      return <Utensils className={finalClassName} />;
  }
};

export default FeatureIcon;
