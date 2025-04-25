'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormFieldComp from './FormField';
import { Button } from './UI/button';
import { Form } from './UI/form';
import { useState } from 'react';
import { toast } from 'sonner';
import { signIn } from '@/lib/action/auth.action';
import { auth } from '@/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';

const authFormSchema = () => {
  return z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });
};

export function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const formSchema = authFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const { email, password } = data;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();
      if (!idToken) {
        toast.error('Sign in Failed. Please try again.');
        return;
      }

      await signIn({
        email,
        idToken
      });

      toast.success('Signed in successfully.');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
    form.reset();
    setSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormFieldComp
              control={form.control}
              name="email"
              label="Email"
              placeholder="example@emil.com"
              type="email"
            />
          </div>
          <div className="grid gap-3">
            <FormFieldComp
              control={form.control}
              name="password"
              label="Password"
              type="password"
            />
          </div>
          <Button
            type="submit"
            className="bg-icon w-full cursor-pointer disabled:grayscale"
            disabled={submitting}
          >
            Login
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
        </div>
      </form>
    </Form>
  );
}
