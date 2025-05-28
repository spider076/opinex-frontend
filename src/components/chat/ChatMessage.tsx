import React from 'react';
import { Message } from '../../context/ChatContext'; // Adjust path as necessary
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'; // Assuming shadcn/ui components are here
import { format } from 'date-fns'; // For formatting timestamp

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const avatarFallback = message.sender === 'user' ? 'U' : 'B';
  const avatarSrc = message.avatar;

  return (
    <div className={`flex items-end space-x-3 my-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={`${message.sender} avatar`} />}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`p-3 rounded-lg max-w-xs lg:max-w-md xl:max-w-lg break-words ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted rounded-bl-none'
        }`}
      >
        {!isUser && (
          <p className="text-xs font-semibold mb-1 text-muted-foreground">
            {message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}
          </p>
        )}
        <p className="text-sm">{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            isUser ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'
          }`}
        >
          {format(new Date(message.timestamp), 'HH:mm')}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
           {avatarSrc && <AvatarImage src={avatarSrc} alt={`${message.sender} avatar`} />}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
