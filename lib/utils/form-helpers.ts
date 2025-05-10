import { UseFormReturn, Path } from 'react-hook-form';
import {
  AddProductFormValues,
  UpdateProductFormValues
} from '@/lib/schemas/product-schema';

export const handleAddFile = <
  T extends AddProductFormValues | UpdateProductFormValues
>(
  form: UseFormReturn<T>,
  file: File
) => {
  const imageFilesPath = 'imageFiles' as Path<T>;
  // currentFiles should be File[] based on schema and defaultValues
  const currentFiles =
    (form.getValues(imageFilesPath) as File[] | undefined) || [];
  const updatedFiles = [...currentFiles, file];
  // Cast to T[typeof imageFilesPath] (which is File[]) to satisfy setValue's type requirements
  form.setValue(
    imageFilesPath,
    // @ts-ignore
    updatedFiles as unknown as PathValueImpl<T, Path<T>>,
    {
      shouldValidate: true,
      shouldDirty: true
    }
  );
  form.trigger(imageFilesPath);
};

export const handleRemoveFile = <
  T extends AddProductFormValues | UpdateProductFormValues
>(
  form: UseFormReturn<T>,
  index: number
) => {
  const imageFilesPath = 'imageFiles' as Path<T>;
  const currentFiles =
    (form.getValues(imageFilesPath) as File[] | undefined) || [];
  const updatedFiles = currentFiles.filter((_, i) => i !== index);
  form.setValue(
    imageFilesPath,
    // @ts-ignore
    updatedFiles as unknown as PathValueImpl<T, Path<T>>,
    {
      shouldValidate: true,
      shouldDirty: true
    }
  );
  form.trigger(imageFilesPath);
};
