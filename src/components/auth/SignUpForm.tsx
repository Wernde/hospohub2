
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
      
      // Redirect to dashboard or confirmation page
      navigate('/dashboard');
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
        className="w-full p-3 my-2 rounded border border-gray-300 text-base"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="w-full p-3 my-2 rounded border border-gray-300 text-base"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        className="w-full p-3 my-2 rounded border border-gray-300 text-base"
      />
      <input
        type="text"
        placeholder="Organisation Name (optional)"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        className="w-full p-3 my-2 rounded border border-gray-300 text-base"
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full p-3 bg-[#4a4a4a] text-white text-base border-none rounded cursor-pointer hover:bg-[#2e2e2e] transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
