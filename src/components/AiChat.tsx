
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import ChatModal from './ai-chat/ChatModal';
import { 
  searchWeb, 
  generateRecipeResponse, 
  getContextAwareResponse,
  searchStoreData
} from './ai-chat/helpers';

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your HospoHub Assistant. I can help with recipes, ingredient calculations, shopping list prices, and answer questions about cooking techniques. What can I help you with today?' 
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
      // Check if asking for store pricing data
      else if (message.toLowerCase().includes('price') || 
               message.toLowerCase().includes('cost') || 
               message.toLowerCase().includes('store') ||
               message.toLowerCase().includes('shop') ||
               message.toLowerCase().includes('how much') ||
               message.toLowerCase().includes('where can i buy')) {
        
        // Try to extract the item name from the message
        let itemName = "";
        const priceOfRegex = /price of ([\w\s]+)(?:at|in|from|$)/i;
        const costOfRegex = /cost of ([\w\s]+)(?:at|in|from|$)/i;
        const whereCanIBuyRegex = /where can i buy ([\w\s]+)(?:\?|$)/i;
        const howMuchIsRegex = /how much is ([\w\s]+)(?:at|in|from|\?|$)/i;
        
        const priceMatch = message.match(priceOfRegex);
        const costMatch = message.match(costOfRegex);
        const whereMatch = message.match(whereCanIBuyRegex);
        const howMuchMatch = message.match(howMuchIsRegex);
        
        if (priceMatch && priceMatch[1]) {
          itemName = priceMatch[1].trim();
        } else if (costMatch && costMatch[1]) {
          itemName = costMatch[1].trim();
        } else if (whereMatch && whereMatch[1]) {
          itemName = whereMatch[1].trim();
        } else if (howMuchMatch && howMuchMatch[1]) {
          itemName = howMuchMatch[1].trim();
        }
        
        if (itemName) {
          setIsSearching(true);
          aiResponse = await searchStoreData(itemName);
          setIsSearching(false);
        } else {
          aiResponse = "I'd be happy to check store prices for you. What specific item are you looking for?";
        }
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
          "I can help you with recipe management, ingredient substitutions, price comparisons, or cooking techniques. What specifically are you looking for?",
          "Would you like me to suggest recipes based on ingredients you have available or check prices at local stores?",
          "I can assist with meal planning, scaling recipes, finding the best prices, or cooking techniques. What would you like to know?",
          "I'm your culinary assistant. I can help with recipes, techniques, price comparisons, or ingredient questions. How can I help today?"
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
      {/* Chat button with high visibility */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 p-0 bg-stone-600 hover:bg-stone-700 shadow-2xl border-2 border-white z-50"
        aria-label="Open AI Chat"
      >
        <MessageSquare className="h-7 w-7 text-white" />
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
