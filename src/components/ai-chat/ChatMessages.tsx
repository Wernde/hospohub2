
import { useRef, useEffect } from 'react';
import { Loader2, Search } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isSearching: boolean;
}

const ChatMessages = ({ messages, isLoading, isSearching }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === 'user' 
                ? 'bg-white/60 text-gray-900'  
                : 'bg-gray-300/50 text-gray-800'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-500">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-rgba(0, 0, 0, 0.12)-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-rgba(0, 0, 0, 0.12)-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-rgba(0, 0, 0, 0.12)-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      {isSearching && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-500 flex items-center">
            <Search className="h-4 w-4 mr-2" />
            <span>Searching web for information...</span>
            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
