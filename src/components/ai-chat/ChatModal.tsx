
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatModalProps {
  messages: { role: 'user' | 'assistant'; content: string }[];
  isLoading: boolean;
  isSearching: boolean;
  onSubmit: (message: string) => void;
  onClose: () => void;
}

const ChatModal = ({ messages, isLoading, isSearching, onSubmit, onClose }: ChatModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col bg-white">
        <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between space-y-0 bg-[#2c2c2c]">
          <div className="flex items-center gap-2">
            <img 
              src="/Images/Logo-HospoHub4.png" 
              alt="HospoHub" 
              className="h-6 w-6 object-contain"
            />
            <CardTitle className="text-lg text-white">HospoHub Assistant</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 text-white hover:bg-[#1a1a1a]"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            isSearching={isSearching}
          />
        </CardContent>
        <CardFooter className="border-t p-3">
          <ChatInput 
            onSendMessage={onSubmit} 
            isLoading={isLoading} 
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatModal;
