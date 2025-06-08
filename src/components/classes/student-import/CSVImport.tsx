
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { ImportMethodProps } from './types';

const CSVImport: React.FC<ImportMethodProps> = ({ 
  onCancel, 
  processing, 
  handleFileUpload 
}) => {
  return (
    <div className="p-6 border-2 border-dashed rounded-lg bg-gray-50 flex flex-col items-center justify-center">
      <FileText className="h-10 w-10 text-rgba(0, 0, 0, 0.12)-500 mb-2" />
      <p className="mb-4 text-center max-w-md">
        Upload a CSV file with the following format:<br />
        <code className="text-xs bg-gray-100 p-1 rounded">name, email, dietary requirements (optional), allergies (optional), notes (optional)</code>
      </p>
      <p className="text-sm text-gray-500 mb-4">
        For dietary requirements and allergies, use semicolons (;) to separate multiple items
      </p>
      <div>
        <input
          type="file"
          accept=".csv"
          id="csv-upload"
          className="hidden"
          onChange={handleFileUpload}
          disabled={processing}
        />
        <label htmlFor="csv-upload">
          <Button className="cursor-pointer" disabled={processing}>
            Select CSV File
          </Button>
        </label>
      </div>
      <Button 
        variant="ghost" 
        onClick={onCancel} 
        className="mt-4"
        disabled={processing}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CSVImport;
