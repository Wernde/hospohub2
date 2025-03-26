
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { ImportMethodProps } from './types';

const PasteImport: React.FC<ImportMethodProps> = ({ 
  onCancel, 
  processing, 
  pasteContent = '', 
  setPasteContent = () => {}, 
  handlePasteImport = () => {}, 
  analyzeWithAI = () => {} 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="paste-content">Paste student data</Label>
        <Textarea
          id="paste-content"
          placeholder="Paste student data here. You can use unstructured text, and our AI will attempt to extract student information, or use CSV format (name, email, dietary requirements, allergies, notes)."
          className="min-h-[200px] mt-1"
          value={pasteContent}
          onChange={(e) => setPasteContent(e.target.value)}
          disabled={processing}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handlePasteImport}
          disabled={processing || !pasteContent.trim()}
        >
          <Check className="mr-2 h-4 w-4" />
          Import as CSV
        </Button>
        
        <Button
          variant="outline"
          onClick={analyzeWithAI}
          disabled={processing || !pasteContent.trim()}
        >
          Analyze with AI
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onCancel}
          disabled={processing}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PasteImport;
