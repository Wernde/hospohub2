
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Shield, ShieldAlert, ShieldCheck, UserMinus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import InviteMemberDialog from '@/components/organization/InviteMemberDialog';
import PendingInvitations from '@/components/organization/PendingInvitations';
import AccessControlSettings from '@/components/organization/AccessControlSettings';

// Define types for our member data
interface OrganizationMember {
  id: string;
  user_id: string;
  organization_id: string;
  access_level: number;
  status: string;
  user_email?: string;
  created_at: string;
  can_invite_members?: boolean;
  can_manage_roles?: boolean;
  permissions?: Record<string, any>;
}

const accessLevelLabels = {
  1: { name: 'Member', icon: Shield, color: 'text-stone-500' },
  2: { name: 'Manager', icon: ShieldCheck, color: 'text-green-500' },
  3: { name: 'Admin', icon: ShieldAlert, color: 'text-orange-500' },
};

const OrganizationMembers = () => {
  const { user, activeOrganization, isAdmin, canUserPerformAction } = useAuth();
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if current user can manage members
  const canManageMembers = activeOrganization 
    ? canUserPerformAction(activeOrganization.id, 2) // Level 2 (Manager) or higher
    : false;

  const canChangeRoles = activeOrganization
    ? canUserPerformAction(activeOrganization.id, 3) // Level 3 (Admin) or system admin
    : false;

  useEffect(() => {
    if (activeOrganization) {
      fetchMembers();
    }
  }, [activeOrganization]);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      if (!activeOrganization) return;

      const { data, error } = await supabase
        .from('organization_members')
        .select('*, profiles(email)')
        .eq('organization_id', activeOrganization.id)
        .eq('status', 'active');

      if (error) throw error;

      // Map the data to include the user email
      const membersWithEmail = data.map((member: any) => ({
        ...member,
        user_email: member.profiles?.email,
      }));

      setMembers(membersWithEmail);
    } catch (error: any) {
      toast({
        title: 'Error loading members',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemberAccessLevel = async (memberId: string, accessLevel: number) => {
    try {
      if (!activeOrganization) return;
      
      const { error } = await supabase
        .from('organization_members')
        .update({ access_level: accessLevel })
        .eq('id', memberId)
        .eq('organization_id', activeOrganization.id);

      if (error) throw error;

      toast({
        title: 'Access level updated',
        description: 'The member\'s access level has been updated successfully.',
      });

      fetchMembers(); // Refresh the members list
    } catch (error: any) {
      toast({
        title: 'Error updating access level',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      if (!activeOrganization) return;
      
      const { error } = await supabase
        .from('organization_members')
        .update({ status: 'removed' })
        .eq('id', memberId)
        .eq('organization_id', activeOrganization.id);

      if (error) throw error;

      toast({
        title: 'Member removed',
        description: 'The member has been removed from the organization.',
      });

      fetchMembers(); // Refresh the members list
    } catch (error: any) {
      toast({
        title: 'Error removing member',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!activeOrganization) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>No Organization Selected</CardTitle>
            <CardDescription>
              Please select or create an organization to manage members.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      {/* Access Control Settings */}
      <AccessControlSettings />
      
      {/* Pending Invitations */}
      <PendingInvitations />
      
      {/* Current Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-stone-900">Organization Members</CardTitle>
              <CardDescription className="text-stone-600">
                Manage the members of {activeOrganization?.name}
              </CardDescription>
            </div>
            <InviteMemberDialog />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-6 text-stone-600">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="text-center py-6 text-stone-600">No members found.</div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => {
                const AccessLevelIcon = accessLevelLabels[member.access_level as keyof typeof accessLevelLabels]?.icon || Shield;
                const levelColor = accessLevelLabels[member.access_level as keyof typeof accessLevelLabels]?.color || 'text-gray-500';
                
                return (
                  <div 
                    key={member.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {member.user_email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-stone-900">{member.user_email || 'Unknown User'}</div>
                        <div className="flex items-center text-sm text-stone-600">
                          <AccessLevelIcon className={`h-4 w-4 mr-1 ${levelColor}`} />
                          <span>
                            {accessLevelLabels[member.access_level as keyof typeof accessLevelLabels]?.name || 'Unknown Role'}
                          </span>
                          {member.can_invite_members && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                              Can Invite
                            </span>
                          )}
                          {member.can_manage_roles && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                              Can Manage
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {canManageMembers && (
                      <div className="flex space-x-2">
                        {canChangeRoles && (
                          <div className="flex space-x-2">
                            {member.access_level !== 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateMemberAccessLevel(member.id, 1)}
                              >
                                Set as Member
                              </Button>
                            )}
                            {member.access_level !== 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateMemberAccessLevel(member.id, 2)}
                              >
                                Set as Manager
                              </Button>
                            )}
                            {member.access_level !== 3 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateMemberAccessLevel(member.id, 3)}
                              >
                                Set as Admin
                              </Button>
                            )}
                          </div>
                        )}
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <UserMinus className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove this member from the organization?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removeMember(member.id)}
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationMembers;
