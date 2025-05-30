'use client';

import DateSelector from '@/components/DateSelector';
import FormFieldComp from '@/components/FormField';
import { Button } from '@/components/UI/button';
import { Form } from '@/components/UI/form';
import { getCouponById, updateCoupon } from '@/lib/action/coupons.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useParams } from 'next/navigation';

// Define the schema for the coupon form
const updateCouponFormSchema = z.object({
  couponCode: z.string().min(1, { message: 'Coupon code is required.' }),
  StartDate: z.date({ required_error: 'Start date is required.' }),
  ExpireDate: z.date({ required_error: 'Expire date is required.' }),
  discount: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(0, { message: 'Discount must be a positive number.' })
  )
});

type UpdateCouponFormValues = z.infer<typeof updateCouponFormSchema>;

export default function Page() {
  const { id } = useParams();
  const couponId = Array.isArray(id) ? id[0] : id;

  const form = useForm<UpdateCouponFormValues>({
    // @ts-ignore
    resolver: zodResolver(updateCouponFormSchema),
    defaultValues: {
      couponCode: '',
      StartDate: undefined,
      ExpireDate: undefined,
      discount: 0
    }
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      if (couponId) {
        const coupon = await getCouponById(couponId);
        if (coupon) {
          form.reset({
            couponCode: coupon.couponCode,
            // @ts-ignore
            StartDate: new Date(coupon.StartDate),
            // @ts-ignore
            ExpireDate: new Date(coupon.ExpireDate),
            discount: coupon.discount
          });
        } else {
          toast.error('Coupon not found.');
        }
      }
      setLoading(false);
    };

    fetchCoupon();
  }, [couponId, form]);

  const onSubmit = async (data: UpdateCouponFormValues) => {
    setSubmitting(true);
    try {
      if (!couponId) {
        toast.error('Coupon ID is missing.');
        return;
      }
      toast.info('Updating coupon...');
      const result = await updateCoupon(couponId, data);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || 'An unknown error occurred.');
      }
    } catch (error: any) {
      console.error('Error updating coupon:', error);
      toast.error(
        error.message || 'Failed to update coupon. Please try again.'
      );
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="text-center">Loading coupon...</div>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="bg-card mx-auto max-w-4xl rounded-2xl p-6 shadow-xl sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Update Coupon</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Edit the details of the coupon below.
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
              {submitting ? 'Updating Coupon...' : 'Update Coupon'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
