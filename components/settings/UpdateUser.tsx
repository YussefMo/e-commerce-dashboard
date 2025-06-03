'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/UI/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/UI/form';
import { Input } from '@/components/UI/input';
import { toast } from 'sonner';
import { getCurrentUser } from '@/lib/action/auth.action'; // Keep getCurrentUser for pre-filling email
import { useEffect } from 'react';
import {
  getAuth,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth'; // Import client-side auth

const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters.' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword']
  });

export default function UpdateUser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    async function fetchUserEmail() {
      const user = await getCurrentUser(); // Use server action to get email
      if (user && user.email) {
        form.setValue('email', user.email);
      }
    }
    fetchUserEmail();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCheck = await getCurrentUser();
      if (userCheck?.role === 'read-only') {
        return toast.info('you dont have the permission to edit password');
      } else {
        toast.info('Updating password...');
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          await firebaseUpdatePassword(user, values.password);
          toast.success('Password updated successfully!');
          form.reset({
            email: values.email, // Keep the email pre-filled after reset
            password: '',
            confirmPassword: ''
          });
        } else {
          toast.error('No user is currently signed in.');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password.');
    }
  }

  return (
    <div className="bg-card mx-auto mt-5 max-w-4xl rounded-2xl p-6 shadow-xl sm:p-8 lg:p-10">
      <h2 className="mb-4 text-2xl font-bold">Update User Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Password</Button>
        </form>
      </Form>
    </div>
  );
}
