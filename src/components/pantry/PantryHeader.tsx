
import React from 'react';

const PantryHeader = () => {
  return (
    <div className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CulinaryHub - Pantry Management</h1>
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">Jane Smith</span>
          <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
            <span className="text-blue-700 font-bold">JS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryHeader;
