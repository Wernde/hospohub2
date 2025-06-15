import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Organization {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  logo_url?: string;
}

interface OrganizationMembership {
  organization_id: string;
  organization: Organization;
  access_level: number;
  status: string;
  can_invite_members?: boolean;
  can_manage_roles?: boolean;
  permissions?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  userOrganizations: OrganizationMembership[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  signUp: (email: string, password: string, organizationName?: string) => Promise<{user: User | null, error: Error | null}>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkIsAdmin: () => Promise<boolean>;
  setAsAdmin: (userId: string) => Promise<void>;
  getUserAccessLevel: (organizationId: string) => number | null;
  canUserPerformAction: (organizationId: string, requiredLevel: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userOrganizations, setUserOrganizations] = useState<OrganizationMembership[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const { toast } = useToast();

  // Load active organization from localStorage
  useEffect(() => {
    const savedOrgId = localStorage.getItem('activeOrganizationId');
    if (savedOrgId && userOrganizations.length > 0) {
      const savedOrg = userOrganizations.find(
        membership => membership.organization_id === savedOrgId
      );
      if (savedOrg) {
        setActiveOrganization(savedOrg.organization);
      }
    }
  }, [userOrganizations]);

  // Save active organization to localStorage when it changes
  useEffect(() => {
    if (activeOrganization) {
      localStorage.setItem('activeOrganizationId', activeOrganization.id);
    }
  }, [activeOrganization]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const isAdminCheck = await checkIsAdmin();
          setIsAdmin(isAdminCheck);
          await fetchUserOrganizations(session.user.id);
        } else {
          setIsAdmin(false);
          setUserOrganizations([]);
          setActiveOrganization(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const isAdminCheck = await checkIsAdmin();
        setIsAdmin(isAdminCheck);
        await fetchUserOrganizations(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserOrganizations = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          organization_id,
          access_level,
          status,
          can_invite_members,
          can_manage_roles,
          permissions,
          organization:organizations(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active');

      if (error) throw error;

      if (data && data.length > 0) {
        setUserOrganizations(data as OrganizationMembership[]);
        
        // Set first organization as active by default if none is active
        if (!activeOrganization) {
          setActiveOrganization(data[0].organization as Organization);
        }
      }
    } catch (error) {
      console.error('Error fetching user organizations:', error);
    }
  };

  const checkIsAdmin = async (): Promise<boolean> => {
    try {
      // Specify the expected parameter type explicitly
      const { data, error } = await supabase.rpc('has_role', { 
        _role: 'admin' as string
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
      // Specify the parameter type explicitly
      const { error } = await supabase.rpc('assign_admin_role', { 
        user_id_param: userId as string 
      });

      if (error) throw error;

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

  const signUp = async (email: string, password: string, organizationName?: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
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
          
          // Add the user as an admin of the organization
          const { error: memberError } = await supabase
            .from('organization_members')
            .insert([
              { 
                user_id: data.user.id, 
                organization_id: orgData.id,
                access_level: 3 // Admin
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

  const getUserAccessLevel = (organizationId: string): number | null => {
    const membership = userOrganizations.find(
      org => org.organization_id === organizationId
    );
    return membership ? membership.access_level : null;
  };

  const canUserPerformAction = (organizationId: string, requiredLevel: number): boolean => {
    // System admins can do everything
    if (isAdmin) return true;
    
    // Check organization-specific permissions
    const userLevel = getUserAccessLevel(organizationId);
    return userLevel !== null && userLevel >= requiredLevel;
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    userOrganizations,
    activeOrganization,
    setActiveOrganization,
    signUp,
    signIn,
    signOut,
    checkIsAdmin,
    setAsAdmin,
    getUserAccessLevel,
    canUserPerformAction,
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
