
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import ChatModal from './ai-chat/ChatModal';
import { 
  searchWeb, 
  generateRecipeResponse, 
  getContextAwareResponse 
} from './ai-chat/helpers';

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your HospoHub assistant. I can help with recipes, ingredient calculations, and answer questions about cooking techniques. What can I help you with today?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Handle user message submission
  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let aiResponse = "";
      
      // Check if the user is asking for web information
      if (message.toLowerCase().includes('search') || 
          message.toLowerCase().includes('find') || 
          message.toLowerCase().includes('latest') ||
          message.toLowerCase().includes('what is')) {
        setIsSearching(true);
        aiResponse = await searchWeb(message);
        setIsSearching(false);
      } 
      // Recipe-related queries
      else if (message.toLowerCase().includes('recipe') || 
               message.toLowerCase().includes('cook') || 
               message.toLowerCase().includes('bake') ||
               message.toLowerCase().includes('food')) {
        aiResponse = generateRecipeResponse(message);
      }
      // Contextual responses based on the current page
      else if (location.pathname in {'/dashboard': true, '/recipes': true, '/classes': true, '/pantry': true}) {
        aiResponse = getContextAwareResponse(location.pathname);
      } 
      // General responses
      else {
        const generalResponses = [
          "I can help you with recipe management, ingredient substitutions, or cooking techniques. What specifically are you looking for?",
          "Would you like me to suggest recipes based on ingredients you have available?",
          "I can assist with meal planning, scaling recipes for different class sizes, or cooking techniques. What would you like to know?",
          "I'm your culinary assistant. I can help with recipes, techniques, or ingredient questions. How can I help today?"
        ];
        
        aiResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }
      
      // Add AI response to chat after a small delay to simulate thinking
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: 'Error',
        description: 'Unable to get response from AI assistant.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
        aria-label="Open AI Chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat modal */}
      {isOpen && (
        <ChatModal
          messages={messages}
          isLoading={isLoading}
          isSearching={isSearching}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AiChat;
