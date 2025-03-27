
import React from 'react';

interface PreferredStoreDisplayProps {
  preferredStore: string | null;
  storeColor: string;
  storeName: string;
}

const PreferredStoreDisplay = ({ 
  preferredStore, 
  storeColor, 
  storeName 
}: PreferredStoreDisplayProps) => {
  if (!preferredStore) return null;
  
  return (
    <div className="flex items-center gap-1">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: storeColor }}
      />
      <span className="font-medium">{storeName}</span>
    </div>
  );
};

export default PreferredStoreDisplay;
