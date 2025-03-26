
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Upload } from 'lucide-react';
import { ImportMethodSelectorProps } from './types';

const ImportMethodSelector: React.FC<ImportMethodSelectorProps> = ({ setImportMethod }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        onClick={() => setImportMethod('csv')}
        variant="outline"
        className="flex-1 p-6 h-auto"
      >
        <div className="flex flex-col items-center">
          <FileText className="h-10 w-10 mb-2" />
          <span>Upload CSV File</span>
        </div>
      </Button>
      
      <Button
        onClick={() => setImportMethod('paste')}
        variant="outline"
        className="flex-1 p-6 h-auto"
      >
        <div className="flex flex-col items-center">
          <Upload className="h-10 w-10 mb-2" />
          <span>Paste Data</span>
        </div>
      </Button>
    </div>
  );
};

export default ImportMethodSelector;
