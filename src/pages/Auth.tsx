
import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChefHat, Info, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const { user, signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  // If user is already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (event: React.FormEvent, type: 'login' | 'signup') => {
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
      if (type === 'login') {
        await signIn(email, password);
        // We don't need to do anything here because the auth state change will redirect
      } else {
        await signUp(email, password);
      }
    } catch (e: any) {
      console.error('Authentication error:', e);
      if (e.message === 'Failed to fetch') {
        setError('Connection error. Please check your internet connection and try again.');
      } else {
        // Error is already handled by toast in the context
      }
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
              <form onSubmit={(e) => handleSubmit(e, 'login')}>
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
              <form onSubmit={(e) => handleSubmit(e, 'signup')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
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
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !isOnline}
                  >
                    {isOnline ? (
                      isLoading ? "Creating account..." : "Sign up"
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
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
