'use client';

import { replaceImages } from '@/cloudinary/cloudinary';
import DragAndDropInput from '@/components/DragAndDropInput';
import { Dropdown } from '@/components/Dropdown';
import FormFieldComp from '@/components/FormField';
import { InputArray } from '@/components/InputArray';
import ProductVarieties from '@/components/ProductVarieties';
import { Button } from '@/components/UI/button';
import { Form } from '@/components/UI/form';
import { getProductById, updateProduct } from '@/lib/action/product.action';
import { usePageContext } from '@/lib/PageContextProvider';
import {
  UpdateProductFormValues,
  updateProductFormSchema
} from '@/lib/schemas/product-schema';
import { handleAddFile, handleRemoveFile } from '@/lib/utils/form-helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {
  const params = useParams();
  const productId = params.id as string;

  const form = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductFormSchema),
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
  const [isLoading, setIsLoading] = useState(true);
  const { setPageContextData } = usePageContext();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const product = await getProductById(productId);
          if (product) {
            form.reset({
              productName: product.productName,
              category: product.category,
              price: product.price,
              stock: product.stock,
              discount: product.discount,
              description: product.description,
              tags: product.tags || [],
              variety: product.variety || [],
              imageFiles: [],
              imageUrls: product.imageUrls || []
            });
          } else {
            toast.error('Product not found.');
          }
        } catch (error) {
          console.error('Failed to fetch product:', error);
          toast.error('Failed to load product details.');
        }
        setIsLoading(false);
      };
      fetchProduct();
    }
  }, [productId, form]);

  const onSubmit = async (data: UpdateProductFormValues) => {
    setSubmitting(true);
    try {
      const existingImageUrls: string[] = form.getValues().imageUrls || [];
      let finalImageUrls: string[] = existingImageUrls; // Initialize with existing URLs

      if (data.imageFiles && data.imageFiles.length > 0) {
        // If new files are provided, delete old (if any) and upload new ones
        toast.info('Replacing images... This may take a moment.');
        finalImageUrls = await replaceImages(
          existingImageUrls,
          data.imageFiles
        );
      }
      // If no new files, finalImageUrls remains as existingImageUrls

      const productDataToUpdate: Partial<AddProductProp> = {
        ...data,
        imageUrls: finalImageUrls, // Use the determined final URLs
        imageFiles: undefined // Ensure imageFiles is not sent to Firestore
      };
      // @ts-ignore
      delete productDataToUpdate.imageFiles;

      const result = await updateProduct(productId, productDataToUpdate);

      if (result.success) {
        toast.success(result.message || 'Product updated successfully!');
        // Optionally, refetch data or reset form with updated values
        const updatedProduct = await getProductById(productId);
        if (updatedProduct) {
          form.reset({
            productName: updatedProduct.productName,
            category: updatedProduct.category,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            discount: updatedProduct.discount,
            description: updatedProduct.description,
            tags: updatedProduct.tags || [],
            variety: updatedProduct.variety || [],
            imageFiles: [],
            // @ts-ignore
            imageUrls: updatedProduct.imageUrls || []
          });
        }
      } else {
        toast.error(result.message || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error(
        error.message || 'Failed to update product. Please try again.'
      );
    }
    setSubmitting(false);
  };

  const watchedValues = form.watch();

  useEffect(() => {
    if (!isLoading && form.getValues().productName) {
      setPageContextData({ pageName: 'edit-product', data: watchedValues });
    }
  }, [JSON.stringify(watchedValues), setPageContextData, isLoading, form]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="bg-card mx-auto max-w-4xl rounded-2xl p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Edit Product</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Update the details of your product below.
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

            {/* @ts-ignore */}
            <ProductVarieties form={form as any} control={form.control} />

            <DragAndDropInput
              form={form as any}
              name="imageFiles"
              label="Product Images (max 5 images, 5MB per image) - Add new or replace existing"
              values={form.watch('imageFiles')}
              onAdd={(file) => handleAddFile(form, file)}
              onRemove={(index) => handleRemoveFile(form, index)}
            />

            <Button
              type="submit"
              className="bg-icon hover:bg-icon/90 text-primary-foreground w-full cursor-pointer rounded-lg py-3 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting || isLoading}
            >
              {submitting ? 'Updating Product...' : 'Update Product'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
