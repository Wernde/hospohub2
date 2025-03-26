
import { Student } from '../dietary-form/types';

export interface StudentDataImportProps {
  onImport: (students: Student[]) => void;
}

export interface ImportMethodProps {
  onCancel: () => void;
  processing: boolean;
  pasteContent?: string;
  setPasteContent?: (content: string) => void;
  handleFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasteImport?: () => void;
  analyzeWithAI?: () => void;
}

export interface ImportMethodSelectorProps {
  setImportMethod: (method: 'csv' | 'paste' | null) => void;
}
