
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, X, ArrowUp, ChefHat, Search, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

// Define types for context-aware responses
interface ContextualResponse {
  context: string;
  responses: string[];
}

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m your HospoHub assistant. I can help with recipes, ingredient calculations, and answer questions about cooking techniques. What can I help you with today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const location = useLocation();

  // Context-aware responses based on the current page
  const contextualResponses: Record<string, ContextualResponse> = {
    '/dashboard': {
      context: 'dashboard',
      responses: [
        "I see you're on the dashboard. I can help you manage your recipes, classes, or inventory.",
        "Need help organizing your kitchen inventory? I can recommend recipes based on what you have.",
        "Would you like me to help you plan your upcoming classes or check inventory levels?"
      ]
    },
    '/recipes': {
      context: 'recipes',
      responses: [
        "Looking for recipe inspiration? I can suggest seasonal recipes or help with ingredient substitutions.",
        "I can help you scale a recipe up or down for different class sizes.",
        "Would you like me to search for recipes based on specific ingredients or dietary restrictions?"
      ]
    },
    '/classes': {
      context: 'classes',
      responses: [
        "Need help organizing your cooking classes? I can suggest optimal class sizes or equipment setups.",
        "I can help you pair recipes to create complete class menus.",
        "Would you like suggestions for adjusting recipes to different skill levels?"
      ]
    },
    '/pantry': {
      context: 'pantry',
      responses: [
        "I can help you track inventory or suggest recipes based on what's in your pantry.",
        "Looking to optimize your pantry organization? I have some tips for storage and rotation.",
        "Would you like suggestions for ingredients you could add to your pantry?"
      ]
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Find web information based on query
  const searchWeb = async (query: string): Promise<string> => {
    setIsSearching(true);
    
    // Simulate web search with delay
    // In a real implementation, this would be an actual API call to a search service
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsSearching(false);
        
        // Mock responses based on keywords
        if (query.toLowerCase().includes('recipe') || query.toLowerCase().includes('cook')) {
          return resolve("I found several relevant cooking resources on the web. The latest cooking trends include fermentation, plant-based alternatives, and sustainable cooking practices. Would you like me to explain any of these in more detail?");
        } else if (query.toLowerCase().includes('ingredient') || query.toLowerCase().includes('substitute')) {
          return resolve("According to culinary sources, you can substitute eggs in baking with applesauce (¼ cup per egg), mashed banana (¼ cup per egg), or ground flaxseed mixed with water (1 tbsp flax + 3 tbsp water per egg).");
        } else {
          return resolve("I've searched for information about your query but couldn't find specific details. Could you ask me something more specific about cooking, recipes, or kitchen management?");
        }
      }, 2000);
    });
  };

  // Get context-aware response based on current location
  const getContextAwareResponse = (): string => {
    const contextResponse = contextualResponses[location.pathname];
    if (contextResponse) {
      const randomIndex = Math.floor(Math.random() * contextResponse.responses.length);
      return contextResponse.responses[randomIndex];
    }
    return "How can I help you with your culinary needs today?";
  };

  // Generate response for recipe-related queries
  const generateRecipeResponse = (query: string): string => {
    if (query.toLowerCase().includes('chocolate') || query.toLowerCase().includes('dessert')) {
      return "For chocolate desserts, I recommend trying a Flourless Chocolate Cake. It's simple to make with just chocolate, butter, eggs, sugar, and a touch of espresso to enhance the flavor. Would you like me to provide the full recipe?";
    } else if (query.toLowerCase().includes('vegetarian') || query.toLowerCase().includes('vegan')) {
      return "For plant-based dishes, Mushroom Risotto is a crowd-pleaser. The key is using vegetable broth and slowly adding it while stirring. Would you like more vegetarian recipe suggestions?";
    } else if (query.toLowerCase().includes('quick') || query.toLowerCase().includes('fast')) {
      return "For a quick meal, try a Mediterranean Chickpea Salad. It combines chickpeas, cucumber, tomatoes, feta, and a lemon-olive oil dressing. It's ready in 10 minutes and nutritious!";
    }
    return "I'd be happy to suggest recipes. Could you tell me what ingredients you have on hand or any dietary preferences?";
  };

  // Handle user message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      let aiResponse = "";
      
      // Check if the user is asking for web information
      if (message.toLowerCase().includes('search') || 
          message.toLowerCase().includes('find') || 
          message.toLowerCase().includes('latest') ||
          message.toLowerCase().includes('what is')) {
        aiResponse = await searchWeb(message);
      } 
      // Recipe-related queries
      else if (message.toLowerCase().includes('recipe') || 
               message.toLowerCase().includes('cook') || 
               message.toLowerCase().includes('bake') ||
               message.toLowerCase().includes('food')) {
        aiResponse = generateRecipeResponse(message);
      }
      // Contextual responses based on the current page
      else if (location.pathname in contextualResponses) {
        aiResponse = getContextAwareResponse();
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
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-blue-900'
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
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
            </CardContent>
            <CardFooter className="border-t p-3">
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !message.trim()}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default AiChat;
