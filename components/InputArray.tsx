/* eslint-disable no-unused-vars */
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormMessage } from './UI/form';

export function InputArray({
  values,
  onAdd,
  onRemove,
  label,
  placeholder,
  name
}: {
  values: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  label: string;
  placeholder: string;
  name: string;
}) {
  const [inputValue, setInputValue] = useState('');
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <div className="space-y-2">
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
          />
          <Button
            type="button"
            onClick={() => {
              if (inputValue.trim()) {
                onAdd(inputValue.trim());
                setInputValue('');
              }
            }}
            className='bg-icon cursor-pointer'
          >
            Add
          </Button>
        </div>
        <FormMessage>{errors[name]?.message?.toString()}</FormMessage>
      </FormItem>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-accent flex items-center gap-1 rounded-full px-3 py-1 text-sm"
          >
            <span>{value}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-muted-foreground hover:text-destructive cursor-pointer rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
