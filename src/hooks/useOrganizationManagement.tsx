
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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

export const useOrganizationManagement = (user: User | null) => {
  const [userOrganizations, setUserOrganizations] = useState<OrganizationMembership[]>([]);
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);

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

  const getUserAccessLevel = (organizationId: string): number | null => {
    const membership = userOrganizations.find(
      org => org.organization_id === organizationId
    );
    return membership ? membership.access_level : null;
  };

  const canUserPerformAction = (organizationId: string, requiredLevel: number, isAdmin: boolean): boolean => {
    // System admins can do everything
    if (isAdmin) return true;
    
    // Check organization-specific permissions
    const userLevel = getUserAccessLevel(organizationId);
    return userLevel !== null && userLevel >= requiredLevel;
  };

  return {
    userOrganizations,
    activeOrganization,
    setActiveOrganization,
    fetchUserOrganizations,
    getUserAccessLevel,
    canUserPerformAction,
  };
};
