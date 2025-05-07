/* eslint-disable no-unused-vars */
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormMessage } from './UI/form';

type InputArrayProps = {
  type?: 'text' | 'file';
  values: string[] | File[];
  onAdd: (value: string | File) => void;
  onRemove: (index: number) => void;
  label: string;
  placeholder?: string;
  name: string;
};

export function InputArray({
  type = 'text',
  values,
  onAdd,
  onRemove,
  label,
  placeholder,
  name
}: InputArrayProps) {
  const [inputValue, setInputValue] = useState('');
  const {
    formState: { errors }
  } = useFormContext();

  const handleAddText = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      for (const file of e.target.files) {
        onAdd(file);
      }
      e.target.value = ''; // reset file input
    }
  };

  return (
    <div className="space-y-2">
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        {type === 'text' ? (
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
            />
            <Button
              type="button"
              onClick={handleAddText}
              className="bg-icon cursor-pointer"
            >
              Add
            </Button>
          </div>
        ) : (
          <Input type="file" multiple onChange={handleFileChange} />
        )}
        <FormMessage>{errors[name]?.message?.toString()}</FormMessage>
      </FormItem>

      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => {
          const displayValue =
            type === 'file' && value instanceof File
              ? value.name
              : String(value);

          return (
            <div
              key={index}
              className="bg-accent flex items-center gap-1 rounded-full px-3 py-1 text-sm"
            >
              <span>{displayValue}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-muted-foreground hover:text-destructive cursor-pointer rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
