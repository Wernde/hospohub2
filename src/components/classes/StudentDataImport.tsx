
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Student } from './dietary-form/types';
import { StudentDataImportProps } from './student-import/types';
import CSVImport from './student-import/CSVImport';
import PasteImport from './student-import/PasteImport';
import ImportMethodSelector from './student-import/ImportMethodSelector';
import { parseCSVContent, simulateAIAnalysis } from './student-import/parser';

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
    
    simulateAIAnalysis()
      .then(students => {
        onImport(students);
        setPasteContent('');
        setImportMethod(null);
        
        toast({
          title: "AI Analysis Complete",
          description: `Successfully extracted ${students.length} student records`,
        });
      })
      .catch(() => {
        toast({
          title: "Analysis failed",
          description: "The AI couldn't process this text. Try using a more structured format.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const handleCancel = () => {
    setImportMethod(null);
    setPasteContent('');
  };

  const renderImportMethod = () => {
    switch (importMethod) {
      case 'csv':
        return (
          <CSVImport 
            onCancel={handleCancel}
            processing={processing}
            handleFileUpload={handleFileUpload}
          />
        );
        
      case 'paste':
        return (
          <PasteImport
            onCancel={handleCancel}
            processing={processing}
            pasteContent={pasteContent}
            setPasteContent={setPasteContent}
            handlePasteImport={handlePasteImport}
            analyzeWithAI={analyzeWithAI}
          />
        );
        
      default:
        return (
          <ImportMethodSelector setImportMethod={setImportMethod} />
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
