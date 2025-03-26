
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StudentInfoFormProps {
  name: string;
  email: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  name,
  email,
  onNameChange,
  onEmailChange
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Student Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={name} 
          onChange={onNameChange} 
          placeholder="Enter student name" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={email} 
          onChange={onEmailChange} 
          placeholder="Enter student email" 
          required 
        />
      </div>
    </div>
  );
};

export default StudentInfoForm;
