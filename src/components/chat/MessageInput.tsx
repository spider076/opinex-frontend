import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext'; // Adjust path as necessary
import { Input } from '../ui/input'; // Assuming shadcn/ui components
import { Button } from '../ui/button';
import { SendHorizonal } from 'lucide-react'; // Using SendHorizonal for a filled send icon

const MessageInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Assuming user avatar is /user-avatar.png or undefined
      sendMessage(inputValue, 'user', '/user-avatar.png'); 
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 p-3 border-t bg-background">
      <Input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow"
        aria-label="Message input"
      />
      <Button type="submit" size="icon" aria-label="Send message">
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default MessageInput;
