'use client';

import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef } from 'react'; // Import useRef
import { Button } from './UI/button';

const SESSION_STORAGE_KEY = 'chatMessages';

function AiChat() {
  const [initialMessages, setInitialMessages] = useState<Message[] | undefined>(
    undefined
  );
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for the messages container

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMessages = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedMessages) {
        try {
          setInitialMessages(JSON.parse(storedMessages));
        } catch (error) {
          console.error('Failed to parse messages from sessionStorage', error);
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      } else {
        // If no messages are stored, initialize with a welcome message
        setInitialMessages([
          {
            id: 'welcome-message',
            role: 'assistant',
            content: 'Hello! How can I help you today?'
          }
        ]);
      }
    }
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: initialMessages as
        | import('@ai-sdk/ui-utils').Message[]
        | undefined
    });
  useEffect(() => {
    if (typeof window !== 'undefined' && initialMessages !== undefined) {
      if (
        messages.length > 0 ||
        (initialMessages && initialMessages.length === 0)
      ) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
      }
    }
  }, [messages, initialMessages]);

  // useEffect to scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  if (initialMessages === undefined) {
    return <div>Loading chat...</div>;
  }

  return (
    <div
      key={initialMessages ? 'loaded' : 'loading'}
      className="bg-card mb-25 flex h-[600px] w-[300px] flex-col overflow-auto rounded-lg shadow-2xl dark:shadow-stone-400 dark:shadow-lg border"
    >
      <div
        ref={messagesEndRef} // Attach the ref to the messages container
        className="flex-grow space-y-4 overflow-y-auto p-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-lg p-3 ${message.role === 'user' ? 'bg-icon text-white' : 'bg-gray-200 text-black'}`}
            >
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
            className="focus:ring-icon flex-grow rounded-md border p-2 focus:ring-2 focus:outline-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-icon cursor-pointer disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AiChat;
