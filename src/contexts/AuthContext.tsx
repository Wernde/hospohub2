
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkIsAdmin: () => Promise<boolean>;
  setAsAdmin: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          checkIsAdmin().then(isAdmin => setIsAdmin(isAdmin));
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkIsAdmin().then(isAdmin => setIsAdmin(isAdmin));
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIsAdmin = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('has_role', { 
        _role: 'admin' 
      });
      
      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  const setAsAdmin = async (userId: string): Promise<void> => {
    try {
      // Use rpc to call a function or build a custom SQL statement
      const { error } = await supabase.rpc('assign_admin_role', { 
        user_id_param: userId 
      });

      if (error) {
        // If the RPC function doesn't exist yet, fallback to direct SQL for now
        // This is a temporary solution until we create the proper RPC function
        const { error: insertError } = await supabase.from('user_roles')
          .insert({ user_id: userId, role: 'admin' })
          .select();

        if (insertError) throw insertError;
      }

      toast({
        title: 'Admin role assigned',
        description: 'The user has been granted admin privileges.',
      });
      
      // If the current user is the one being set as admin, update state
      if (user && user.id === userId) {
        setIsAdmin(true);
      }
    } catch (error: any) {
      toast({
        title: 'Error assigning admin role',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      toast({
        title: 'Account created!',
        description: 'Check your email for the confirmation link.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signUp,
    signIn,
    signOut,
    checkIsAdmin,
    setAsAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
