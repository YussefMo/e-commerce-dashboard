import { getAllMessages } from '@/lib/action/messages..action';
import MessageLink from './MessageLink';

async function MessagesHolder() {
  const messages = await getAllMessages();

  return (
    <>
      {messages.map((message) => (
        <MessageLink key={message.id} message={message} />
      ))}
    </>
  );
}

export default MessagesHolder;
