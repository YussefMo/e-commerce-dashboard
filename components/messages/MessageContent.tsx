'use client';

import { useEffect, useState } from 'react';
import {
  getMessagesById,
  updateMessageStatus
} from '@/lib/action/messages..action';
import { format } from 'date-fns';
import { Button } from '../UI/button';
import { toast } from 'sonner';
import Spinner from '../Spinner';

function MessageContent({ id = 'all' }: { id: string }) {
  const [message, setMessage] = useState<Messages | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const fetchedMessage = await getMessagesById(id);
        setMessage(fetchedMessage);
      } catch (err) {
        setError('Failed to load message.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const updateMessage = async () => {
    toast.info('Marking message as read...');
    try {
      await updateMessageStatus(id);
      toast.success('Message marked as read');
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  if (!id) {
    return (
      <div>
        <p>select a message to display</p>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="bg-card h-full w-[70%] overflow-auto p-4 text-red-500">
        {error}
      </div>
    );
  }

  if (!message) {
    return (
      <div className="bg-card h-full w-[70%] overflow-auto p-4">
        Message not found.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <section>
        <div className="mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">{message.title}</h2>
          <div className="text-sm text-gray-500">
            From:{' '}
            <a
              href={`mailto:${message.email}`}
              className="text-blue-600 hover:underline"
            >
              {message.userName} &lt;{message.email}&gt;
            </a>
          </div>
          <div className="text-xs text-gray-400">
            Date:{' '}
            {message.createdAt
              ? format(new Date(message.createdAt as string), 'PPP p')
              : 'N/A'}
          </div>
        </div>
        <p className="text-base whitespace-pre-wrap">{message.message}</p>
      </section>
      <footer>
        {!message.resolve && (
          <Button onClick={updateMessage}>Mark As Read</Button>
        )}
      </footer>
    </div>
  );
}

export default MessageContent;
