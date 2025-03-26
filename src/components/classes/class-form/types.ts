
import { UseFormReturn } from 'react-hook-form';

export interface ClassFormValues {
  className: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface FormFieldProps {
  form: UseFormReturn<ClassFormValues>;
}
