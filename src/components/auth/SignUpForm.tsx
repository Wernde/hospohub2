
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SignUpFormProps {
  onNavigate: (path: string) => void;
}

const SignUpForm = ({ onNavigate }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signUp(
        email, 
        password, 
        orgName.trim() || undefined
      );
      
      if (error) throw error;
      
      // Navigation will be handled by Auth component when user state changes
    } catch (error: any) {
      // Error is already handled in the signUp function
      console.error('Error during sign up:', error);
    } finally {
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
        minLength={6}
        className="w-full p-3 my-2 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        className="w-full p-3 my-2 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      <input
        type="text"
        placeholder="Organisation Name (optional)"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        className="w-full p-3 my-2 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full p-3 bg-[#4a4a4a] text-white text-base border-none rounded cursor-pointer transition-all duration-300 hover:bg-[#2e2e2e] hover:transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#4a4a4a]"
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
