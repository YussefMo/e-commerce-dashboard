import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeProvider';
import SideNav from '@/components/layout/sideNav';
import Nav from '@/components/layout/nav';

const geistPoppins = Poppins({
  variable: '--font-Poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'cyper',
  description: 'dashboard to control cyper e commerce'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <div>
              <SideNav />
            </div>
            <main className="flex flex-1 flex-col">
              <Nav />
              <section className="flex-1 overflow-auto px-4.5 py-7">
                {children}
              </section>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
