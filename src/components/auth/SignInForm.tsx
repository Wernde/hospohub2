
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SignInFormProps {
  onNavigate: (path: string) => void;
}

const SignInForm = ({ onNavigate }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await signIn(email, password);
      // Navigation will be handled by Auth component when user state changes
    } catch (error) {
      // Error is already handled in the signIn function
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 my-2 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 my-2 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full p-3 bg-[#4a4a4a] text-white text-base border-none rounded cursor-pointer transition-all duration-300 hover:bg-[#2e2e2e] hover:transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#4a4a4a]"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;
