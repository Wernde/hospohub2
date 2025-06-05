
import React from 'react';
import { Link } from 'react-router-dom';

interface QuickActionProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
}

const QuickActionCard = ({ id, title, description, icon, iconBg, href }: QuickActionProps) => {
  return (
    <Link 
      to={href} 
      className="group relative bg-orange-50 rounded-lg p-6 hover:bg-orange-100 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <h4 className="text-base font-semibold text-orange-900 group-hover:text-orange-700">
          {title}
        </h4>
      </div>
      <p className="mt-2 text-sm text-orange-600">{description}</p>
    </Link>
  );
};

export default QuickActionCard;
