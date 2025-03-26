
export interface Student {
  id: string;
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  dietaryRequirements: string[];
  allergies: string[];
  notes?: string;
}

export interface DietaryRequirementsFormProps {
  onAddStudent: (student: Student) => void;
}

export interface RequirementsSectionProps {
  formData: StudentFormData;
  setFormData: React.Dispatch<React.SetStateAction<StudentFormData>>;
  customValue: string;
  setCustomValue: React.Dispatch<React.SetStateAction<string>>;
  addCustomItem: () => void;
  removeItem: (item: string) => void;
  itemType: 'dietaryRequirements' | 'allergies';
  commonItems: string[];
  itemLabel: string;
  itemColor: string;
}
