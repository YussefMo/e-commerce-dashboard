'use client';

import { Dropdown } from '@/components/Dropdown';
import FormFieldComp from '@/components/FormField';
import { InputArray } from '@/components/InputArray';
import { Button } from '@/components/UI/button';
import { Form } from '@/components/UI/form';
import { Input } from '@/components/UI/input';
import { addProduct } from '@/lib/action/add-product.action';
import { usePageContext } from '@/lib/PageContextProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  productName: z.string().min(3).max(25),
  category: z.string().min(1),
  price: z.coerce.number().min(1).max(999999),
  stock: z.coerce.number().min(1).max(999999),
  discount: z.coerce.number().min(0).max(9999),
  description: z.string().min(20).max(2000),
  tags: z.array(z.string()).min(1),
  imageUrls: z.array(z.string()).min(1).max(5),
  variety: z
    .array(
      z.object({
        type: z.string().min(1, 'Variety type cannot be empty'),
        options: z.array(z.string()).min(1, 'At least one option is required')
      })
    )
    .min(0)
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variety'
  });

  const [newVarietyType, setNewVarietyType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { setPageContextData } = usePageContext(); // Get the context setter function

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Changed AddProductProp to inferred type for now
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

  const watchedValues = form.watch();

  useEffect(() => {
    setPageContextData({ pageName: 'add-product', watchedValues });
  }, [JSON.stringify(watchedValues), setPageContextData]);

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
              <div
                key={field.id}
                className="mb-4 space-y-3 rounded-md border p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">
                    {form.watch(`variety.${index}.type`)}
                  </h4>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="destructive"
                    size="sm"
                    className='cursor-pointer'
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
                      value
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
                  placeholder={`Add option for ${form.watch(`variety.${index}.type`)}`}
                  name={`variety.${index}.options`}
                />
              </div>
            ))}
          </div>
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
