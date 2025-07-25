
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
      className="group relative bg-gray-50 rounded-lg p-6 hover:bg-amber-50 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <h4 className="text-base font-semibold text-black group-hover:text-black">
          {title}
        </h4>
      </div>
      <p className="mt-2 text-sm text-black">{description}</p>
    </Link>
  );
};

export default QuickActionCard;
