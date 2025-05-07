import { UseFormReturn } from 'react-hook-form';
import { AddProductFormValues } from '@/lib/schemas/add-product-schema';

export const handleAddFile = (
  form: UseFormReturn<AddProductFormValues>,
  file: File
) => {
  const current = form.getValues('imageFiles') || [];
  const updated = [...current, file];
  form.setValue('imageFiles', updated as any);
  form.trigger('imageFiles');
};

export const handleRemoveFile = (
  form: UseFormReturn<AddProductFormValues>,
  index: number
) => {
  const current = form.getValues('imageFiles') || [];
  const updated = current.filter((_, i) => i !== index);
  form.setValue('imageFiles', updated as any);
  form.trigger('imageFiles');
};
