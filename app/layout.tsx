import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeProvider';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/next"

const geistPoppins = Poppins({
  variable: '--font-Poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistPoppins.variable} h-screen antialiased`}
        suppressHydrationWarning={true}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
