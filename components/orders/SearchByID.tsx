'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/UI/form';

const formSchema = z.object({
  id: z.string().min(1, { message: 'Order ID is required.' })
});

type SearchFormValues = z.infer<typeof formSchema>;

function SearchByID() {
  const router = useRouter();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: ''
    }
  });

  const onSubmit = (values: SearchFormValues) => {
    router.push(`/orders?id=${values.id}`);
  };

  const handleClear = () => {
    form.reset();
    router.push('/orders');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search by Order ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
        {form.formState.isDirty && (
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}

export default SearchByID;
