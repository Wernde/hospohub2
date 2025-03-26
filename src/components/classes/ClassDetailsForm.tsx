
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ClassFormValues {
  className: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="className"
              rules={{ required: "Class name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter class name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {!date && form.formState.isSubmitted && (
                <p className="text-sm font-medium text-destructive">Date is required</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="startTime"
              rules={{ required: "Start time is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endTime"
              rules={{ required: "End time is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="instructor"
            rules={{ required: "Instructor name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter instructor's name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    placeholder="Enter class description" 
                    className="min-h-[100px]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
