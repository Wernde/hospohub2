
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileUp, AlertCircle } from 'lucide-react';

interface RecipeFileUploadProps {
  onFileSelect: (file: File) => void;
}

const RecipeFileUpload = ({ onFileSelect }: RecipeFileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="recipe-file" className="flex items-center gap-1">
          <FileUp className="h-4 w-4" />
          Upload Recipe File
        </Label>
        <div className="text-xs text-muted-foreground">
          Supported formats: .txt, .docx, .pdf
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 text-blue-800 rounded-md flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          Upload a recipe file to automatically extract recipe information. The AI will attempt to fill in the fields below based on the file content.
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="file"
          id="recipe-file"
          className="hidden"
          accept=".txt,.docx,.pdf"
          onChange={handleFileChange}
        />
        <Button 
          type="button"
          onClick={() => document.getElementById('recipe-file')?.click()}
          variant="outline"
          className="gap-2"
        >
          <FileUp className="h-4 w-4" />
          {selectedFile ? "Change File" : "Select File"}
        </Button>
        {selectedFile && (
          <span className="text-sm text-muted-foreground">
            {selectedFile.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecipeFileUpload;
