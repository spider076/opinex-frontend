import React from 'react';
import { ChatProvider } from '../context/ChatContext'; // Adjust path as necessary
import MessageList from '../components/chat/MessageList'; // Adjust path as necessary
import MessageInput from '../components/chat/MessageInput'; // Adjust path as necessary
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'; // Assuming shadcn/ui components

const ChatPage: React.FC = () => {
  return (
    <ChatProvider>
      <div className="container mx-auto py-6 lg:py-10 max-w-3xl">
        <Card className="h-[calc(100vh-12rem)] sm:h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col shadow-lg rounded-lg border">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold text-center text-foreground">
              Chat Room
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow p-0 overflow-hidden">
            <MessageList />
            <MessageInput />
          </CardContent>
        </Card>
      </div>
    </ChatProvider>
  );
};

export default ChatPage;
