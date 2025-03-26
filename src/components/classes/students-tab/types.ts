
import { Student } from '../dietary-form/types';

// Define recipe type
export interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
}

export interface ClassDetailsFormData {
  className: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface StudentsTabProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onNavigateBack: () => void;
  onSubmit: (event: React.FormEvent) => void;
  classDetails: ClassDetailsFormData;
  date: Date | undefined;
  selectedRecipes: Recipe[];
}

export interface StudentListProps {
  students: Student[];
  onRemoveStudent: (studentId: string) => void;
}

export interface ImportOptionProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  onAddStudent: (student: Student) => void;
  onImportStudents: (importedStudents: Student[]) => void;
}
