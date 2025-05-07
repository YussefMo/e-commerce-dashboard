/* eslint-disable no-unused-vars */
'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AddProductFormValues } from '@/lib/schemas/add-product-schema';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { X } from 'lucide-react';

interface DragAndDropInputProps {
  form: UseFormReturn<AddProductFormValues>;
  name: keyof AddProductFormValues;
  label: string;
  onAdd: (file: File) => void;
  onRemove: (index: number) => void;
  values: File[];
}

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({
  form,
  name,
  label,
  onAdd,
  onRemove,
  values
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => onAdd(file));
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => onAdd(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name as string}
        className="block text-sm font-medium"
      >
        {label}
      </label>
      <div
        className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 5MB per image, 5 images max)
          </p>
        </div>
        <Input
          id={name as string}
          name={name as string}
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      {values && values.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
            {values.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-3 py-2 text-sm"
              >
                <span>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(index)}
                  className="text-destructive hover:text-destructive-hover cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragAndDropInput;
