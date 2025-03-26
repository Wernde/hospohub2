
import React from 'react';
import { Label } from '@/components/ui/label';

interface DifficultySelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DifficultySelector = ({ value, onChange }: DifficultySelectorProps) => {
  return (
    <div>
      <Label htmlFor="difficulty">Difficulty Level</Label>
      <select
        id="difficulty"
        name="difficulty"
        value={value}
        onChange={onChange}
        className="w-full h-10 px-3 bg-transparent border border-input rounded-md text-sm"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
