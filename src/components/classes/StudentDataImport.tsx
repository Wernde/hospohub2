
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

interface StudentDataImportProps {
  onImport: (students: Student[]) => void;
}

const StudentDataImport: React.FC<StudentDataImportProps> = ({ onImport }) => {
  const [importMethod, setImportMethod] = useState<'csv' | 'paste' | null>(null);
  const [pasteContent, setPasteContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const students = parseCSVContent(content);
        onImport(students);
        setImportMethod(null);
        setProcessing(false);
      } catch (error) {
        console.error('Error parsing CSV:', error);
        toast({
          title: "Import failed",
          description: "There was an error processing the CSV file. Please check the format.",
          variant: "destructive",
        });
        setProcessing(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "Import failed",
        description: "There was an error reading the file.",
        variant: "destructive",
      });
      setProcessing(false);
    };
    
    reader.readAsText(file);
  };

  const handlePasteImport = () => {
    if (!pasteContent.trim()) {
      toast({
        title: "Import failed",
        description: "Please paste some content first.",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    try {
      const students = parseCSVContent(pasteContent);
      onImport(students);
      setPasteContent('');
      setImportMethod(null);
      setProcessing(false);
    } catch (error) {
      console.error('Error parsing pasted content:', error);
      toast({
        title: "Import failed",
        description: "There was an error processing the pasted data. Please check the format.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  // Simple CSV parser - in a real app this would be more robust
  const parseCSVContent = (content: string): Student[] => {
    const lines = content.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) throw new Error('No data found');
    
    // Check if first line is headers
    const firstLine = lines[0].toLowerCase();
    const hasHeaders = firstLine.includes('name') || firstLine.includes('email');
    const startIndex = hasHeaders ? 1 : 0;
    
    return lines.slice(startIndex).map((line, index) => {
      const parts = line.split(',').map(part => part.trim());
      if (parts.length < 2) throw new Error(`Line ${index + 1} has insufficient data`);
      
      const name = parts[0];
      const email = parts[1];
      
      // Extract dietary requirements if present (comma-separated list)
      const dietaryRequirements = parts[2] ? parts[2].split(';').map(item => item.trim()) : [];
      
      // Extract allergies if present (comma-separated list)
      const allergies = parts[3] ? parts[3].split(';').map(item => item.trim()) : [];
      
      // Extract notes if present
      const notes = parts[4] || undefined;
      
      return {
        id: `imported-${index}-${Date.now()}`, // Generate a unique ID
        name,
        email,
        dietaryRequirements,
        allergies,
        notes
      };
    });
  };

  // AI text analysis of pasted content
  const analyzeWithAI = () => {
    if (!pasteContent.trim()) {
      toast({
        title: "Analysis failed",
        description: "Please paste some content first.",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    // Simulate AI analysis - in a real app, this would call an AI service
    setTimeout(() => {
      try {
        // Example analysis result
        const students: Student[] = [
          {
            id: `ai-1-${Date.now()}`,
            name: 'John Smith',
            email: 'john@example.com',
            dietaryRequirements: ['Vegetarian'],
            allergies: ['Nuts', 'Shellfish'],
            notes: 'Extracted from unstructured text with AI'
          },
          {
            id: `ai-2-${Date.now()}`,
            name: 'Jane Doe',
            email: 'jane@example.com',
            dietaryRequirements: ['Gluten-free'],
            allergies: ['Dairy'],
            notes: 'Extracted from unstructured text with AI'
          }
        ];
        
        onImport(students);
        setPasteContent('');
        setImportMethod(null);
        
        toast({
          title: "AI Analysis Complete",
          description: `Successfully extracted ${students.length} student records`,
        });
      } catch (error) {
        toast({
          title: "Analysis failed",
          description: "The AI couldn't process this text. Try using a more structured format.",
          variant: "destructive",
        });
      }
      
      setProcessing(false);
    }, 1500);
  };

  const renderImportMethod = () => {
    switch (importMethod) {
      case 'csv':
        return (
          <div className="p-6 border-2 border-dashed rounded-lg bg-gray-50 flex flex-col items-center justify-center">
            <FileText className="h-10 w-10 text-blue-500 mb-2" />
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
              />
              <label htmlFor="csv-upload">
                <Button className="cursor-pointer">
                  Select CSV File
                </Button>
              </label>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setImportMethod(null)} 
              className="mt-4"
            >
              Cancel
            </Button>
          </div>
        );
        
      case 'paste':
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
                onClick={() => {
                  setImportMethod(null);
                  setPasteContent('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        );
        
      default:
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
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-3">Import Student Data</h3>
        <p className="text-sm text-gray-500 mb-4">
          Import your student data including dietary requirements and allergies.
          You can upload a CSV file or paste the data directly.
        </p>
      </div>
      
      {renderImportMethod()}
    </div>
  );
};

export default StudentDataImport;
