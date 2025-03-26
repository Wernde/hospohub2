
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ImagePlus, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value: File | null;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    
    onChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="recipe-image" className="flex items-center gap-1">
        <ImageIcon className="h-4 w-4" />
        Recipe Image
      </Label>
      
      {preview ? (
        <div className="relative rounded-md overflow-hidden border border-input">
          <img 
            src={preview} 
            alt="Recipe preview" 
            className="w-full h-48 object-cover"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center border border-dashed border-input rounded-md p-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </div>
            <input
              type="file"
              id="recipe-image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => document.getElementById('recipe-image')?.click()}
            >
              Select Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
