
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (isMounted) {
          if (error) {
            console.error('Error getting session:', error);
          }
          
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMounted) {
          console.log('Auth state changed:', event);
          setSession(session);
          setUser(session?.user ?? null);
          
          // Only set loading to false after we've processed the auth change
          if (event !== 'INITIAL_SESSION') {
            setIsLoading(false);
          }
        }
      }
    );

    // Get initial session
    getInitialSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, isLoading };
};
