import '@/app/globals.css';
import AiChatToggler from '@/components/AiChatToggler';
import Nav from '@/components/layout/nav';
import SideNav from '@/components/layout/sideNav';
import { PageContextProvider } from '@/lib/PageContextProvider';
// import UserProfile from '@/components/layout/userProfile';
// import UserProfileSkeleton from '@/components/layout/userProfileSkeleton';
// import { isAuthenticated } from '@/lib/action/auth.action';
import type { Metadata } from 'next';
// import { redirect } from 'next/navigation';
// import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'cyper',
  description: 'dashboard to control cyper e commerce'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const isUserAuthenticated = await isAuthenticated();

  // if (!isUserAuthenticated) redirect('/log-in');

  return (
    <PageContextProvider>
      <div className="flex">
        <AiChatToggler />
        <SideNav>
          {/* <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile />
          </Suspense> */}
        </SideNav>
        <main className="flex-1">
          <Nav />
          <section className="mt-16 ml-67 h-fit overflow-auto px-4.5 py-7 max-lg:ml-0">
            {children}
          </section>
        </main>
      </div>
    </PageContextProvider>
  );
}
