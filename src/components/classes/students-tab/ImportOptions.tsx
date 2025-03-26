
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DietaryRequirementsForm from '../DietaryRequirementsForm';
import StudentDataImport from '../StudentDataImport';
import { ImportOptionProps } from './types';

const ImportOptions: React.FC<ImportOptionProps> = ({ 
  activeTab, 
  setActiveTab, 
  onAddStudent, 
  onImportStudents 
}) => {
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add Student</TabsTrigger>
          <TabsTrigger value="import">Import Students</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="pt-4">
          <DietaryRequirementsForm onAddStudent={onAddStudent} />
        </TabsContent>
        
        <TabsContent value="import" className="pt-4">
          <StudentDataImport onImport={onImportStudents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportOptions;
