
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserRoles = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const checkIsAdmin = async (): Promise<boolean> => {
    try {
      // Specify the expected parameter type explicitly
      const { data, error } = await supabase.rpc('has_role', { 
        _role: 'admin' as string
      });
      
      if (error) throw error;
      const adminStatus = !!data;
      setIsAdmin(adminStatus);
      return adminStatus;
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
      
      setIsAdmin(true);
    } catch (error: any) {
      toast({
        title: 'Error assigning admin role',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    isAdmin,
    setIsAdmin,
    checkIsAdmin,
    setAsAdmin,
  };
};
