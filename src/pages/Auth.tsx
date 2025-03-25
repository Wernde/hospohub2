
import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChefHat, Info, Wifi, WifiOff, Users, Building } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const { user, signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [organizations, setOrganizations] = useState<{ id: string; name: string }[]>([]);
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(false);

  // Form schema for signup
  const signupFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    orgOption: z.string().min(1, "Please select an option"),
    organizationName: z.string().optional(),
    organizationId: z.string().optional(),
  }).refine(data => {
    if (data.orgOption === 'create' && (!data.organizationName || data.organizationName.length < 3)) {
      return false;
    }
    if (data.orgOption === 'join' && !data.organizationId) {
      return false;
    }
    return true;
  }, {
    message: "Organization information is required",
    path: ['organizationName'],
  });

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      orgOption: '',
      organizationName: '',
      organizationId: '',
    },
  });

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('You are offline. Authentication requires an internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial online status check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch organizations list for join option
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setIsLoadingOrgs(true);
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name')
          .order('name');
        
        if (error) throw error;
        setOrganizations(data || []);
      } catch (error: any) {
        console.error('Error fetching organizations:', error);
        toast.error('Failed to load organizations');
      } finally {
        setIsLoadingOrgs(false);
      }
    };

    if (signupForm.watch('orgOption') === 'join') {
      fetchOrganizations();
    }
  }, [signupForm.watch('orgOption')]);

  // If user is already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" />;
  }

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!isOnline) {
      setError('You are offline. Please check your internet connection.');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signIn(email, password);
      // We don't need to do anything here because the auth state change will redirect
    } catch (e: any) {
      console.error('Authentication error:', e);
      if (e.message === 'Failed to fetch') {
        setError('Connection error. Please check your internet connection and try again.');
      } else {
        // Error is already handled by toast in the context
      }
    }
  };

  const handleSignupSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      setError(null);
      
      if (!isOnline) {
        toast.error('You are offline. Please check your internet connection.');
        return;
      }

      // First, sign up the user
      const signUpResult = await signUp(values.email, values.password);
      
      if (!signUpResult?.user?.id) {
        throw new Error('Failed to create account');
      }

      const userId = signUpResult.user.id;

      // Update user profile with first and last name
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      // Handle organization
      if (values.orgOption === 'create') {
        // Create a new organization
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: values.organizationName,
            created_by: userId,
          })
          .select('id')
          .single();

        if (orgError) throw orgError;

        // Add user as organization admin (level 3)
        const { error: memberError } = await supabase
          .from('organization_members')
          .insert({
            user_id: userId,
            organization_id: orgData.id,
            access_level: 3, // Admin
          });

        if (memberError) throw memberError;

        toast.success('Organization created successfully!');
      } else if (values.orgOption === 'join') {
        // Add user as basic member (level 1)
        const { error: memberError } = await supabase
          .from('organization_members')
          .insert({
            user_id: userId,
            organization_id: values.organizationId!,
            access_level: 1, // Basic member
          });

        if (memberError) throw memberError;

        toast.success('Joined organization successfully!');
      }

      toast.success('Account created successfully!');
    } catch (e: any) {
      console.error('Signup error:', e);
      toast.error(e.message || 'Failed to create account');
      setError(e.message || 'Failed to create account');
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@hospohub.com');
    setPassword('admin');
    toast.info('Admin credentials filled. Click Login to continue.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <ChefHat className="w-12 h-12 text-blue-300" />
          <span className="font-display text-3xl font-semibold text-white ml-2">
            HospoHub
          </span>
        </div>

        {!isOnline && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md flex items-center gap-2">
            <WifiOff className="h-5 w-5" />
            <span>You are currently offline. Authentication requires an internet connection.</span>
          </div>
        )}

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-destructive">{error}</p>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 mt-2"
                    onClick={fillAdminCredentials}
                  >
                    <Info className="h-4 w-4" />
                    Fill Admin Credentials
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !isOnline}
                  >
                    {isOnline ? (
                      isLoading ? "Logging in..." : "Login"
                    ) : (
                      <span className="flex items-center gap-2">
                        <WifiOff className="h-4 w-4" />
                        Waiting for connection
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={signupForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="orgOption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="create">
                                <span className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  Create a new organization
                                </span>
                              </SelectItem>
                              <SelectItem value="join">
                                <span className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  Join an existing organization
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {signupForm.watch('orgOption') === 'create' && (
                      <FormField
                        control={signupForm.control}
                        name="organizationName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormDescription>
                              You'll be the admin of this organization.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {signupForm.watch('orgOption') === 'join' && (
                      <FormField
                        control={signupForm.control}
                        name="organizationId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Organization</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={isLoadingOrgs ? "Loading..." : "Select an organization"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {organizations.map(org => (
                                  <SelectItem key={org.id} value={org.id}>
                                    {org.name}
                                  </SelectItem>
                                ))}
                                {organizations.length === 0 && !isLoadingOrgs && (
                                  <SelectItem value="none" disabled>
                                    No organizations found
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              You'll join as a member pending admin approval.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {error && (
                      <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium text-destructive">{error}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !isOnline || signupForm.formState.isSubmitting}
                    >
                      {isOnline ? (
                        signupForm.formState.isSubmitting ? "Creating account..." : "Sign up"
                      ) : (
                        <span className="flex items-center gap-2">
                          <WifiOff className="h-4 w-4" />
                          Waiting for connection
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
