'use client';

import { InputArray } from '@/components/InputArray';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { AddProductFormValues } from '@/lib/schemas/add-product-schema';
import { useState } from 'react';
import { Control, useFieldArray, UseFormReturn } from 'react-hook-form';

interface ProductVarietiesProps {
  form: UseFormReturn<AddProductFormValues>;
  control: Control<AddProductFormValues>;
}

export default function ProductVarieties({
  form,
  control
}: ProductVarietiesProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variety'
  });
  const [newVarietyType, setNewVarietyType] = useState('');

  return (
    <div>
      <h3 className="mb-2 text-lg font-medium">Product Varieties</h3>
      <div className="mb-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter new variety type (e.g., Color, Size)"
          value={newVarietyType}
          onChange={(e) => setNewVarietyType(e.target.value)}
          className="input"
        />
        <Button
          type="button"
          onClick={() => {
            if (newVarietyType.trim() !== '') {
              append({ type: newVarietyType.trim(), options: [] });
              setNewVarietyType('');
            }
          }}
          className="bg-icon cursor-pointer"
        >
          Add Type
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 space-y-3 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">
              {form.watch(`variety.${index}.type`)}
            </h4>
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="destructive"
              size="sm"
              className="cursor-pointer"
            >
              Remove Type
            </Button>
          </div>
          <InputArray
            values={form.watch(`variety.${index}.options`)}
            onAdd={(value) => {
              const currentOptions =
                form.getValues(`variety.${index}.options`) || [];
              form.setValue(`variety.${index}.options`, [
                ...currentOptions,
                value as string
              ]);
            }}
            onRemove={(optionIndex) => {
              const currentOptions =
                form.getValues(`variety.${index}.options`) || [];
              form.setValue(
                `variety.${index}.options`,
                currentOptions.filter((_, i) => i !== optionIndex)
              );
            }}
            label={`Options for ${form.watch(`variety.${index}.type`)}`}
            placeholder={`Add option for ${form.watch(
              `variety.${index}.type`
            )}`}
            name={`variety.${index}.options`}
          />
        </div>
      ))}
    </div>
  );
}
