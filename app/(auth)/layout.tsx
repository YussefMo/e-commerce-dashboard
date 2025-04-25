import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeProvider';
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-sidebar-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section>{children}</section>
        </ThemeProvider>
      </body>
    </html>
  );
}
