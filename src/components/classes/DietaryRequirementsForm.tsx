
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import StudentInfoForm from './dietary-form/StudentInfoForm';
import RequirementsSection from './dietary-form/RequirementsSection';
import StudentNotesField from './dietary-form/StudentNotesField';
import { Student, StudentFormData, DietaryRequirementsFormProps } from './dietary-form/types';

// Common dietary requirements and allergies
const commonDietaryRequirements = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-free',
  'Dairy-free',
  'Kosher',
  'Halal',
  'Keto',
  'Paleo',
  'Low sodium'
];

const commonAllergies = [
  'Dairy',
  'Eggs',
  'Nuts',
  'Peanuts',
  'Shellfish',
  'Wheat',
  'Soy',
  'Fish',
  'Sesame'
];

const DietaryRequirementsForm: React.FC<DietaryRequirementsFormProps> = ({ onAddStudent }) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    dietaryRequirements: [],
    allergies: [],
    notes: ''
  });
  
  const [customDietary, setCustomDietary] = useState('');
  const [customAllergy, setCustomAllergy] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addCustomDietary = () => {
    if (customDietary.trim()) {
      setFormData(prev => ({
        ...prev,
        dietaryRequirements: [...prev.dietaryRequirements, customDietary.trim()]
      }));
      setCustomDietary('');
    }
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim()) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, customAllergy.trim()]
      }));
      setCustomAllergy('');
    }
  };

  const removeDietary = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRequirements: prev.dietaryRequirements.filter(item => item !== requirement)
    }));
  };

  const removeAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(item => item !== allergy)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent: Student = {
      ...formData,
      id: uuidv4()
    };
    
    onAddStudent(newStudent);
    
    setFormData({
      name: '',
      email: '',
      dietaryRequirements: [],
      allergies: [],
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StudentInfoForm 
        name={formData.name}
        email={formData.email}
        onNameChange={handleInputChange}
        onEmailChange={handleInputChange}
      />
      
      <RequirementsSection
        formData={formData}
        setFormData={setFormData}
        customValue={customDietary}
        setCustomValue={setCustomDietary}
        addCustomItem={addCustomDietary}
        removeItem={removeDietary}
        itemType="dietaryRequirements"
        commonItems={commonDietaryRequirements}
        itemLabel="Dietary Requirements"
        itemColor="bg-rgba(0, 0, 0, 0.12)-100 text-rgba(0, 0, 0, 0.12)-800"
      />
      
      <RequirementsSection
        formData={formData}
        setFormData={setFormData}
        customValue={customAllergy}
        setCustomValue={setCustomAllergy}
        addCustomItem={addCustomAllergy}
        removeItem={removeAllergy}
        itemType="allergies"
        commonItems={commonAllergies}
        itemLabel="Allergies"
        itemColor="bg-red-100 text-red-800"
      />
      
      <StudentNotesField
        notes={formData.notes}
        onChange={handleInputChange}
      />
      
      <div className="pt-2">
        <Button type="submit">
          Add Student
        </Button>
      </div>
    </form>
  );
};

export default DietaryRequirementsForm;
