
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
  hoverColor?: string;
  descriptionBg?: string;
}

const StatsCard = ({ title, value, description, icon, iconBg, href, hoverColor = 'hover:bg-gray-100', descriptionBg = 'bg-gray-50' }: StatsCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className={`px-4 py-5 sm:p-6 transition-colors duration-200 ${hoverColor}`}>
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconBg} rounded-md p-3`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-black truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-black">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`${descriptionBg} px-4 py-4 sm:px-6 block hover:opacity-80 transition-opacity duration-200`}>
        <div className="text-sm">
          <Link to={href} className="font-medium text-black hover:text-gray-700">
            {description}
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
