'use client';

import { useState } from 'react';
import AiChat from './AiChat';
import { BotMessageSquare, X } from 'lucide-react';

function AiChatToggler() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleHandler() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="fixed right-0 bottom-0 mr-5 flex flex-col justify-end">
      {isOpen ? (
        <>
          <AiChat />
          <button
            onClick={toggleHandler}
            className="absolute right-5 bg-icon mt-5 mb-10 w-fit cursor-pointer rounded-full p-2"
          >
            <X className="text-right text-white" />
          </button>
        </>
      ) : (
        <button
          onClick={toggleHandler}
          className="bg-icon mr-5 mb-10 cursor-pointer rounded-full p-2 text-right text-white"
        >
          <BotMessageSquare />
        </button>
      )}
    </div>
  );
}

export default AiChatToggler;
