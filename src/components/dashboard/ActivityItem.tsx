
import React from 'react';
import { Link } from 'react-router-dom';

interface ActivityItemProps {
  id: number;
  title: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const ActivityItem = ({ id, title, time, icon, iconBg }: ActivityItemProps) => {
  return (
    <li>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <div className={`h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
                {icon}
              </div>
            </div>
            <div className="min-w-0 flex-1 px-4">
              <p className="text-sm font-medium text-orange-600 truncate">{title}</p>
              <p className="mt-1 text-sm text-orange-500">{time}</p>
            </div>
          </div>
          <div>
            <Link to="#" className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-orange-300 text-sm leading-5 font-medium rounded-full text-orange-700 bg-white hover:bg-orange-50">
              View
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ActivityItem;
