
import { createContext, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '@/hooks/useAuthState';
import { useOrganizationManagement } from '@/hooks/useOrganizationManagement';
import { useUserRoles } from '@/hooks/useUserRoles';
import { useAuthActions } from '@/hooks/useAuthActions';

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

interface SignUpUserData {
  firstName: string;
  lastName: string;
  role: string;
  accessLevel: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  userOrganizations: OrganizationMembership[];
  activeOrganization: Organization | null;
  setActiveOrganization: (org: Organization | null) => void;
  signUp: (email: string, password: string, organizationName?: string, userData?: SignUpUserData) => Promise<{user: User | null, error: Error | null}>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkIsAdmin: () => Promise<boolean>;
  setAsAdmin: (userId: string) => Promise<void>;
  getUserAccessLevel: (organizationId: string) => number | null;
  canUserPerformAction: (organizationId: string, requiredLevel: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, session, isLoading } = useAuthState();
  const { isAdmin, checkIsAdmin, setAsAdmin } = useUserRoles();
  const {
    userOrganizations,
    activeOrganization,
    setActiveOrganization,
    fetchUserOrganizations,
    getUserAccessLevel,
    canUserPerformAction,
  } = useOrganizationManagement(user);
  const { signUp, signIn, signOut } = useAuthActions(setActiveOrganization);

  useEffect(() => {
    if (user) {
      checkIsAdmin();
      fetchUserOrganizations(user.id);
    }
  }, [user]);

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
    canUserPerformAction: (organizationId: string, requiredLevel: number) => 
      canUserPerformAction(organizationId, requiredLevel, isAdmin),
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
