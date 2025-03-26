
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface StudentNotesFieldProps {
  notes: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const StudentNotesField: React.FC<StudentNotesFieldProps> = ({ notes, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Additional Notes</Label>
      <Textarea 
        id="notes" 
        name="notes" 
        value={notes || ''} 
        onChange={onChange} 
        placeholder="Enter any additional notes about the student"
        className="min-h-[80px]"
      />
    </div>
  );
};

export default StudentNotesField;
