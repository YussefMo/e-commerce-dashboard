import '@/app/globals.css';
import { isAuthenticated } from '@/lib/action/auth.action';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'log in to your dashboard'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect('/');

  return <section>{children}</section>;
}
