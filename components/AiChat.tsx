'use client';

import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Button } from './UI/button';
import { usePageContext } from '@/lib/PageContextProvider';

const SESSION_STORAGE_KEY = 'chatMessages';
const AVAILABLE_TOOLS = [
  '/getProductDetails',
  '/deleteProduct',
  '/analyzeProduct',
  '/dataAnalysis'
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function AiChat() {
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [filteredTools, setFilteredTools] = useState<string[]>(AVAILABLE_TOOLS);
  const [initialMessages, setInitialMessages] = useState<Message[] | undefined>(
    undefined
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { pageContextData } = usePageContext(); // Get the context data

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
            content:
              'Hello! How can I help you today?\n\n' +
              '- Usage instruction\n\n' +
              'Type / to see available tools.\n\n'
          }
        ]);
      }
    }
  }, []);

  const {
    messages,
    input,
    setInput,
    handleInputChange: originalHandleInputChange,
    handleSubmit,
    isLoading
  } = useChat({
    initialMessages: initialMessages as
      | import('@ai-sdk/ui-utils').Message[]
      | undefined,
    // Pass a function to body to get the latest context on each request
    body: {
      get pageContext() {
        return pageContextData;
      }
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    originalHandleInputChange(e);
    const value = e.target.value;
    if (value.includes('/') && value.endsWith('/')) {
      setFilteredTools(AVAILABLE_TOOLS);
      setShowToolsMenu(true);
    } else if (value.includes('/')) {
      const query = value.substring(value.lastIndexOf('/') + 1);
      setFilteredTools(
        AVAILABLE_TOOLS.filter((tool) =>
          tool.toLowerCase().startsWith(`/${query.toLowerCase()}`)
        )
      );
      setShowToolsMenu(true);
    } else {
      setShowToolsMenu(false);
    }
  };

  const handleToolSelect = (tool: string) => {
    const lastSlashIndex = input.lastIndexOf('/');
    const textBeforeSlash = input.substring(0, lastSlashIndex);
    setInput(textBeforeSlash + tool + ' ');
    setShowToolsMenu(false);
    inputRef.current?.focus();
  };

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
      className="bg-card mb-25 flex h-[600px] w-[400px] flex-col overflow-auto rounded-lg border shadow-2xl max-sm:w-[300px] dark:shadow-lg dark:shadow-stone-400"
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

      <form onSubmit={handleSubmit} className="relative border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something... or type / for tools"
            className="focus:ring-icon flex-grow rounded-md border p-2 focus:ring-2 focus:outline-none"
            disabled={isLoading}
            autoComplete="off"
          />
          {showToolsMenu && filteredTools.length > 0 && (
            <div className="bg-card absolute bottom-full left-0 z-10 mb-1 w-full rounded-md border shadow-lg">
              <ul className="max-h-40 overflow-y-auto">
                {filteredTools.map((tool) => (
                  <li
                    key={tool}
                    onClick={() => handleToolSelect(tool)}
                    className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
