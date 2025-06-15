
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SignUpFormProps {
  onNavigate: (path: string) => void;
}

const SignUpForm = ({ onNavigate }: SignUpFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const roleOptions = [
    { value: 'administrator', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'chef', label: 'Chef' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'student', label: 'Student' },
    { value: 'staff', label: 'Staff Member' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your first and last name.',
        variant: 'destructive',
      });
      return;
    }

    if (!role) {
      toast({
        title: 'Error',
        description: 'Please select your role.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Determine access level based on role and organization creation
      let accessLevel = 1; // Default to basic level
      const isCreatingOrg = orgName.trim().length > 0;
      
      if (isCreatingOrg && role === 'administrator') {
        accessLevel = 3; // Admin level for organization creators
      } else if (role === 'manager') {
        accessLevel = 2; // Manager level
      }
      
      const { error } = await signUp(
        email, 
        password, 
        orgName.trim() || undefined,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          role: role,
          accessLevel: accessLevel
        }
      );
      
      if (error) throw error;
      
      toast({
        title: 'Account created successfully!',
        description: isCreatingOrg 
          ? `You've been set as the administrator of ${orgName}.`
          : 'Check your email for the confirmation link.',
      });
      
    } catch (error: any) {
      console.error('Error during sign up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-3 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-3 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
        />
      </div>
      
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      
      <input
        type="text"
        placeholder="Organisation Name (optional - creates new organisation)"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      
      <Select value={role} onValueChange={setRole} required>
        <SelectTrigger className="w-full p-3 border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          {roleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="w-full p-3 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
        className="w-full p-3 rounded border border-gray-300 text-base transition-all duration-300 focus:border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#4a4a4a]/20"
      />
      
      <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded">
        <strong>Note:</strong> If you're creating a new organisation and select "Administrator", you'll have full access. 
        Others will be assigned basic access and can be promoted by administrators later.
      </div>
      
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
