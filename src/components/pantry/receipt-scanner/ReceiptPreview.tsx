
import React from 'react';

interface ReceiptPreviewProps {
  image: string;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ image }) => {
  return (
    <div className="flex justify-center">
      <div className="max-h-[400px] overflow-auto border rounded-md shadow-sm">
        <img 
          src={image} 
          alt="Receipt preview" 
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ReceiptPreview;
