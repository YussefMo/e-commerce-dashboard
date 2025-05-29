import MessagesHolder from '@/components/messages/MessagesHolder';
import MessageContent from '@/components/messages/MessageContent';
import Spinner from '@/components/Spinner';
import { Suspense } from 'react';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ searchParams }: PageProps) {
  const { id } = await searchParams;

  return (
    <section className="flex h-[87vh]">
      <div className="bg-card h-full w-[30%] overflow-auto">
        <Suspense fallback={<Spinner />}>
          <MessagesHolder />
        </Suspense>
      </div>
      <div className="bg-card h-full w-[70%] overflow-auto p-4">
        <Suspense key={id as string} fallback={<Spinner />}>
          <MessageContent id={id as string} />
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
