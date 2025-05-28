import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext'; // Adjust path as necessary
import ChatMessage from './ChatMessage'; // Adjust path as necessary
import { ScrollArea } from '../ui/scroll-area'; // Assuming shadcn/ui components

const MessageList: React.FC = () => {
  const { messages } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollAreaRef} className="h-[400px] w-full flex-grow p-4 border rounded-md bg-background">
      <div ref={viewportRef} className="h-full"> {/* This div is the viewport for ScrollArea */}
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
