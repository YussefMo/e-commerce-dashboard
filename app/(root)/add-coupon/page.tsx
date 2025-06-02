'use client';

import DateSelector from '@/components/DateSelector';
import FormFieldComp from '@/components/FormField';
import { Button } from '@/components/UI/button';
import { Form } from '@/components/UI/form';
import { addCoupon } from '@/lib/action/coupons.action';
import { usePageContext } from '@/lib/PageContextProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Define the schema for the coupon form
const addCouponFormSchema = z.object({
  couponCode: z.string().min(1, { message: 'Coupon code is required.' }),
  StartDate: z.date({ required_error: 'Start date is required.' }),
  ExpireDate: z.date({ required_error: 'Expire date is required.' }),
  discount: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(0, { message: 'Discount must be a positive number.' })
  )
});

type AddCouponFormValues = z.infer<typeof addCouponFormSchema>;

export default function Page() {
  const { setPageContextData } = usePageContext();

  const form = useForm<AddCouponFormValues>({
    // @ts-ignore
    resolver: zodResolver(addCouponFormSchema),
    defaultValues: {
      couponCode: '',
      StartDate: undefined,
      ExpireDate: undefined,
      discount: 0
    }
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: AddCouponFormValues) => {
    setSubmitting(true);
    try {
      toast.loading('adding coupon');
      const result = await addCoupon(data);

      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error(result.message || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error('Error submitting coupon:', error);
      toast.error(error.message || 'Failed to add coupon. Please try again.');
    }
    setSubmitting(false);
  };

  const watchedValues = form.watch();

  useEffect(() => {
    setPageContextData({ pageName: 'add-coupon', watchedValues });
  }, [JSON.stringify(watchedValues), setPageContextData]);

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="bg-card mx-auto max-w-4xl rounded-2xl p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Add New Coupon</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Fill in the details below to add a new coupon.
          </p>
        </div>
        <Form {...form}>
          {/* @ts-ignore */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFieldComp
              name="couponCode"
              label="Coupon Code"
              placeholder="e.g. SUMMER20"
            />

            <DateSelector
              control={form.control}
              name="StartDate"
              label="Start Date"
              description="The date when the coupon becomes active."
            />

            <DateSelector
              control={form.control}
              name="ExpireDate"
              label="Expire Date"
              description="The date when the coupon expires."
            />

            <FormFieldComp
              name="discount"
              label="Discount (%)"
              placeholder="e.g. 20"
              type="number"
            />

            <Button
              type="submit"
              className="bg-icon hover:bg-icon/90 text-primary-foreground w-full cursor-pointer rounded-lg py-3 font-semibold transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Creating Coupon...' : 'Create Coupon'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
