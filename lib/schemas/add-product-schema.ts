import { z } from 'zod';

export const addProductFormSchema = z.object({
  productName: z.string().min(3).max(25),
  category: z.string().min(1),
  price: z.coerce.number().min(1).max(999999),
  stock: z.coerce.number().min(1).max(999999),
  discount: z.coerce.number().min(0).max(9999),
  description: z.string().min(20).max(2000),
  tags: z.array(z.string()).min(1),
  imageFiles: z
    .array(z.instanceof(File))
    .min(1, 'At least one image is required.')
    .max(5, 'Maximum of 5 images allowed.')
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      `Each file size should be less than 5MB.`
    )
    .refine(
      (files) =>
        files.every((file) =>
          ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(
            file.type
          )
        ),
      '.jpg, .png, .webp, .gif files are accepted.'
    ),
  variety: z
    .array(
      z.object({
        type: z.string().min(1, 'Variety type cannot be empty'),
        options: z.array(z.string()).min(1, 'At least one option is required')
      })
    )
    .min(0)
});

export type AddProductFormValues = z.infer<typeof addProductFormSchema>;
