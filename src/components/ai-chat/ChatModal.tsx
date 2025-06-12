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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-5">
      <Card className="w-full max-w-md h-[600px] max-h-[80vh] flex flex-col bg-[#e5e5e5] shadow-2xl rounded-2xl overflow-hidden relative">
        {/* Background logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
        <div className="mb-50 animate-image-breathe">
          <img 
            src="/hospohub2/public/Images/Logo-HospoHub4.png" 
            alt="HospoHub Background" 
            className="logo-breathing h-50 w-auto object-contain drop-shadow-2x1"
          />
        </div>
        </div>

        <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between space-y-0 bg-[#737373] relative z-0">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg text-white font-bold">HospoHub AI Assistant</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 text-white hover:bg-black/20 rounded-full transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 bg-transparent relative z-10">
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            isSearching={isSearching}
          />
        </CardContent>
        <CardFooter className="border-t p-4 bg-transparent relative z-10">
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

