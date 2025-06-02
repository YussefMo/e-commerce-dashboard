import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './UI/popover';
import { getMessagesWithAction } from '@/lib/action/messages..action';
import Link from 'next/link';

async function Notification() {
  let isNotify = false;

  const messages = await getMessagesWithAction();
  const messagesCount = messages?.length;

  if (messagesCount) {
    isNotify = true;
  }

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Bell className="cursor-pointer text-white max-sm:hidden" />
        {isNotify && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white" />
        )}
      </PopoverTrigger>
      <PopoverContent className="bg-card text-card-foreground w-80 rounded-lg p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-lg font-semibold">Notifications</h4>
        </div>
        {messagesCount ? (
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              You have {messagesCount} unread messages.
            </p>
            <Link
              href="/messages"
              className="mt-2 block text-sm hover:underline"
            >
              View All Messages
            </Link>
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center text-sm">
            No new notifications.
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notification;
