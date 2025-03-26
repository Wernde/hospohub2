
import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
} from '@/components/ui/form';
import BasicInfoFields from './class-form/BasicInfoFields';
import TimeLocationFields from './class-form/TimeLocationFields';
import DescriptionField from './class-form/DescriptionField';
import { ClassFormValues } from './class-form/types';

interface ClassDetailsFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onNavigateBack: () => void;
  onNavigateNext: () => void;
  onFormData: (data: ClassFormValues) => void;
}

const ClassDetailsForm: React.FC<ClassDetailsFormProps> = ({
  date,
  setDate,
  onNavigateBack,
  onNavigateNext,
  onFormData
}) => {
  const { toast } = useToast();
  const form = useForm<ClassFormValues>({
    defaultValues: {
      className: '',
      instructor: '',
      location: '',
      startTime: '',
      endTime: '',
      description: '',
    },
  });

  const handleNextStep = form.handleSubmit((data) => {
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for the class",
        variant: "destructive",
      });
      return;
    }
    
    // Pass the form data to the parent component
    onFormData(data);
    
    // All fields are validated, proceed to the next step
    onNavigateNext();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleNextStep} className="space-y-6">
        <div className="space-y-4">
          <BasicInfoFields form={form} date={date} setDate={setDate} />
          <TimeLocationFields form={form} />
          <DescriptionField form={form} />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onNavigateBack}
          >
            Cancel
          </Button>
          <Button type="submit">
            Next: Recipe Selection
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClassDetailsForm;
