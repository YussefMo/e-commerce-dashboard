'use client';

import { Dropdown } from '@/components/Dropdown';
import FormFieldComp from '@/components/FormField';
import { InputArray } from '@/components/InputArray';
import { Button } from '@/components/UI/button';
import { Form } from '@/components/UI/form';
import { addProduct } from '@/lib/action/add-product.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  productName: z.string().min(3).max(25),
  category: z.string().min(1),
  price: z.coerce.number().min(1).max(999999),
  stock: z.coerce.number().min(1).max(999999),
  discount: z.coerce.number().min(0).max(9999),
  description: z.string().min(20).max(500),
  tags: z.array(z.string()).min(1),
  imageUrls: z.array(z.string()).min(1),
  variety: z.array(z.string()).min(1)
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      category: '',
      price: 0,
      stock: 0,
      discount: 0,
      description: '',
      tags: [],
      imageUrls: [],
      variety: []
    }
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: AddProductProp) => {
    setSubmitting(true);
    form.reset();
    const result = await addProduct(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-card mx-auto max-w-3xl rounded-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormFieldComp
            name="productName"
            label="Product Name"
            placeholder="Enter product name"
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

          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            <FormFieldComp
              name="price"
              label="Price"
              placeholder="Enter price"
              type="number"
            />
            <FormFieldComp
              name="stock"
              label="Stock"
              placeholder="Enter stock quantity"
              type="number"
            />
            <FormFieldComp
              name="discount"
              label="Discount"
              placeholder="Enter Discount"
              type="number"
            />
          </div>

          <FormFieldComp
            name="description"
            label="Description"
            placeholder="Enter product description"
            type="textarea"
          />

          <InputArray
            values={form.watch('tags')}
            onAdd={(value) =>
              form.setValue('tags', [...form.watch('tags'), value])
            }
            onRemove={(index) =>
              form.setValue(
                'tags',
                form.watch('tags').filter((_, i) => i !== index)
              )
            }
            label="Product Tags"
            placeholder="Add new tag"
            name="tags"
          />

          <InputArray
            values={form.watch('imageUrls')}
            onAdd={(value) =>
              form.setValue('imageUrls', [...form.watch('imageUrls'), value])
            }
            onRemove={(index) =>
              form.setValue(
                'imageUrls',
                form.watch('imageUrls').filter((_, i) => i !== index)
              )
            }
            label="Image URLs"
            placeholder="Add image URL"
            name="imageUrls"
          />

          <InputArray
            values={form.watch('variety')}
            onAdd={(value) =>
              form.setValue('variety', [...form.watch('variety'), value])
            }
            onRemove={(index) =>
              form.setValue(
                'variety',
                form.watch('variety').filter((_, i) => i !== index)
              )
            }
            label="Product Variety"
            placeholder="Add Product Variety"
            name="variety"
          />

          <Button
            type="submit"
            className="bg-icon w-full cursor-pointer disabled:grayscale"
            disabled={submitting}
          >
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
}
