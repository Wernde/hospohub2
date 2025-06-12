
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface ClassItem {
  id: number;
  title: string;
  time: string;
  location: string;
  status: string;
}

const UpcomingClassCard = ({ cls }: { cls: ClassItem }) => {
  return (
    <li>
      <Link to="#" className="block hover:bg-[#f0fdf4]">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-rgba(0, 0, 0, 0.12)-600 truncate">{cls.title}</div>
            <div className="ml-2 flex-shrink-0 flex">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                cls.status === 'Today' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-rgba(0, 0, 0, 0.12)-100 text-rgba(0, 0, 0, 0.12)-800'
              }`}>
                {cls.status}
              </span>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="sm:flex">
              <div className="flex items-center text-sm text-rgba(0, 0, 0, 0.12)-500">
                <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-rgba(0, 0, 0, 0.12)-400" />
                <p>{cls.time}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-rgba(0, 0, 0, 0.12)-500">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-rgba(0, 0, 0, 0.12)-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p>{cls.location}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default UpcomingClassCard;
