'use client';

import { uploadImages } from '@/cloudinary/cloudinary';
import DragAndDropInput from '@/components/DragAndDropInput';
import { Dropdown } from '@/components/Dropdown';
import FormFieldComp from '@/components/FormField';
import { InputArray } from '@/components/InputArray';
import ProductVarieties from '@/components/ProductVarieties';
import { Button } from '@/components/UI/button';
import { Form } from '@/components/UI/form';
import { addProduct } from '@/lib/action/product.action';
import { usePageContext } from '@/lib/PageContextProvider';
import {
  addProductFormSchema,
  AddProductFormValues
} from '@/lib/schemas/add-product-schema';
import { handleAddFile, handleRemoveFile } from '@/lib/utils/form-helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {
  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      productName: '',
      category: '',
      price: 0,
      stock: 0,
      discount: 0,
      description: '',
      tags: [],
      imageFiles: [],
      variety: []
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const { setPageContextData } = usePageContext();

  const onSubmit = async (data: AddProductFormValues) => {
    setSubmitting(true);
    try {
      const uploadedImageUrls = await uploadImages(data.imageFiles);
      const productDataToSave: AddProductProp = {
        ...data,
        imageUrls: uploadedImageUrls,
        // @ts-ignore
        imageFiles: undefined
      };
      // @ts-ignore
      delete productDataToSave.imageFiles;

      const result = await addProduct(productDataToSave);

      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error('Error submitting product:', error);
      toast.error(error.message || 'Failed to add product. Please try again.');
    }
    setSubmitting(false);
  };

  const watchedValues = form.watch();

  useEffect(() => {
    setPageContextData({ pageName: 'add-product', watchedValues });
  }, [JSON.stringify(watchedValues), setPageContextData]);

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="bg-card mx-auto max-w-4xl rounded-2xl p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Add New Product</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Fill in the details below to add a new product to your catalog.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormFieldComp
                name="productName"
                label="Product Name"
                placeholder="e.g. iPhone 15 Pro"
              />
              <Dropdown
                name="category"
                label="Product Category"
                placeholder="Select a category"
                options={[
                  'Smart Phones',
                  'Smart Watches',
                  'Cameras',
                  'Headphones',
                  'Computer',
                  'Gaming'
                ]}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <FormFieldComp
                name="price"
                label="Price ($)"
                placeholder="e.g. 999.99"
                type="number"
              />
              <FormFieldComp
                name="stock"
                label="Stock Quantity"
                placeholder="e.g. 100"
                type="number"
              />
              <FormFieldComp
                name="discount"
                label="Discount (%)"
                placeholder="e.g. 10"
                type="number"
              />
            </div>

            <FormFieldComp
              name="description"
              label="Product Description"
              placeholder="Provide a detailed description of the product..."
              type="textarea"
            />

            <InputArray
              values={form.watch('tags')}
              onAdd={(value) =>
                form.setValue('tags', [...form.watch('tags'), value as string])
              }
              onRemove={(index) =>
                form.setValue(
                  'tags',
                  form.watch('tags').filter((_, i) => i !== index)
                )
              }
              label="Product Tags"
              placeholder="Add a tag and press Enter"
              name="tags"
            />

            <ProductVarieties form={form} control={form.control} />

            <DragAndDropInput
              form={form}
              name="imageFiles"
              label="Product Images (max 5 images, 5MB per image)"
              values={form.watch('imageFiles') || []}
              onAdd={(file) => handleAddFile(form, file)}
              onRemove={(index) => handleRemoveFile(form, index)}
            />

            <Button
              type="submit"
              className="bg-icon hover:bg-icon/90 text-primary-foreground w-full cursor-pointer rounded-lg py-3 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Creating Product...' : 'Create Product'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
