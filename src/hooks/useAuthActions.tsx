
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SignUpUserData {
  firstName: string;
  lastName: string;
  role: string;
  accessLevel: number;
}

interface Organization {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  logo_url?: string;
}

export const useAuthActions = (setActiveOrganization: (org: Organization | null) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signUp = async (email: string, password: string, organizationName?: string, userData?: SignUpUserData) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData?.firstName,
            last_name: userData?.lastName,
            role: userData?.role,
          }
        }
      });

      if (error) throw error;
      
      // Update user profile if data was provided
      if (userData && data.user) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              first_name: userData.firstName,
              last_name: userData.lastName,
            })
            .eq('id', data.user.id);
          
          if (profileError) console.error('Error updating profile:', profileError);
        } catch (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }
      
      // If organization name is provided, create an organization for the user
      if (organizationName && data.user) {
        try {
          // Create the organization
          const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .insert([
              { 
                name: organizationName, 
                created_by: data.user.id 
              }
            ])
            .select()
            .single();
          
          if (orgError) throw orgError;
          
          // Add the user as a member of the organization with the specified access level
          const accessLevel = userData?.accessLevel || (userData?.role === 'administrator' ? 3 : 1);
          const { error: memberError } = await supabase
            .from('organization_members')
            .insert([
              { 
                user_id: data.user.id, 
                organization_id: orgData.id,
                access_level: accessLevel,
                can_invite_members: accessLevel >= 2,
                can_manage_roles: accessLevel >= 3,
                permissions: accessLevel === 1 
                  ? { read: true }
                  : accessLevel === 2 
                  ? { read: true, write: true, invite: true }
                  : { read: true, write: true, invite: true, admin: true }
              }
            ]);
          
          if (memberError) throw memberError;
          
          // Set this as the active organization
          setActiveOrganization(orgData);
        } catch (orgError) {
          console.error('Error creating organization during signup:', orgError);
          // Continue with signup even if org creation fails
        }
      }
      
      toast({
        title: 'Account created!',
        description: 'Check your email for the confirmation link.',
      });
      
      return { user: data.user, error: null };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { user: null, error };
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
      // Clear active organization in localStorage
      localStorage.removeItem('activeOrganizationId');
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

  return {
    isLoading,
    signUp,
    signIn,
    signOut,
  };
};
