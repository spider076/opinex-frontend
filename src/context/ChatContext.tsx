import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  avatar?: string; // URL to avatar image
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string, sender: 'user' | 'bot', avatar?: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: 'Welcome to the Chat Room! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      avatar: '/bot-avatar.png', // Example avatar path
    },
  ]);

  const sendMessage = (text: string, sender: 'user' | 'bot', avatar?: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      sender,
      timestamp: new Date(),
      avatar,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (sender === 'user') {
      // Simulate bot reply
      setTimeout(() => {
        const botReply: Message = {
          id: uuidv4(),
          text: `Bot received: "${text}". Thanks for your message!`,
          sender: 'bot',
          timestamp: new Date(),
          avatar: '/bot-avatar.png', // Example avatar path
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, Math.random() * 1000 + 1000); // Reply in 1-2 seconds
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
