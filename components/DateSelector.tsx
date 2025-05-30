import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/UI/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/UI/popover';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/UI/form';
import { Control } from 'react-hook-form';
import { Button } from './UI/button';
import { Calendar1 } from 'lucide-react';

interface DateSelectorProps {
  control: Control<any>;
  name: string;
  label: string;
  description: string;
}

function DateSelector({
  control,
  name,
  label,
  description
}: DateSelectorProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <Calendar1 className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DateSelector;
