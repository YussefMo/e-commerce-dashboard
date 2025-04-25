import '@/app/globals.css';
import Nav from '@/components/layout/nav';
import SideNav from '@/components/layout/sideNav';
import { ThemeProvider } from '@/components/themeProvider';
import { isAuthenticated } from '@/lib/action/auth.action';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { redirect } from 'next/navigation';

const geistPoppins = Poppins({
  variable: '--font-Poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'cyper',
  description: 'dashboard to control cyper e commerce'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/log-in');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistPoppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <SideNav />
            <main className="flex-1">
              <Nav />
              <section className="mt-16 ml-67 overflow-auto px-4.5 py-7 max-lg:ml-0">
                {children}
              </section>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
