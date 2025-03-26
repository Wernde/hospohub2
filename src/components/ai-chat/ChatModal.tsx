
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, X } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col">
        <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">HospoHub Assistant</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8"
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
