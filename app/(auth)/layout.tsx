import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeProvider';

export const metadata = {
  title: 'log in to your dashboard',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
