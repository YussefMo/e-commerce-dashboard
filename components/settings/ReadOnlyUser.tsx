'use client';

import { auth } from '@/firebase/client';
import { getCurrentUser, signUp } from '@/lib/action/auth.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import FormFieldComp from '../FormField';
import { Button } from '../UI/button';
import { Form } from '../UI/form';

const ReadOnlyUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

function ReadOnlyUser() {
  const form = useForm<z.infer<typeof ReadOnlyUserSchema>>({
    resolver: zodResolver(ReadOnlyUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(data: z.infer<typeof ReadOnlyUserSchema>) {
    const { name, email, password } = data;

    const user = await getCurrentUser();
    if (user?.role === 'admin') {
      toast.loading('creating read-only user');

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = await signUp({
        uid: userCredential.user.uid,
        name: name!,
        email,
        role: 'read-only'
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Account created successfully.');
    } else {
      toast.warning('your not an admin to preform this action');
    }
  }

  return (
    <div className="bg-card mx-auto max-w-4xl rounded-2xl p-6 shadow-xl sm:p-8 lg:p-10">
      <h2 className="mb-4 text-2xl font-semibold">Create Read-Only User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldComp
            name="name"
            label="User Name"
            placeholder="Enter user's name"
          />
          <FormFieldComp
            name="email"
            label="User Email"
            placeholder="Enter user's email"
          />
          <FormFieldComp
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
          />
          <Button type="submit">Create User</Button>
        </form>
      </Form>
    </div>
  );
}

export default ReadOnlyUser;
