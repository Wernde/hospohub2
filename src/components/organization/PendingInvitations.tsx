
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Clock, X, RotateCcw } from 'lucide-react';

interface Invitation {
  id: string;
  email: string;
  access_level: number;
  status: string;
  created_at: string;
  expires_at: string;
  can_invite_members: boolean;
  can_manage_roles: boolean;
}

const accessLevelNames = {
  1: 'Member',
  2: 'Manager',
  3: 'Admin',
};

const PendingInvitations = () => {
  const { activeOrganization, canUserPerformAction } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const canManageInvitations = activeOrganization 
    ? canUserPerformAction(activeOrganization.id, 2)
    : false;

  useEffect(() => {
    if (activeOrganization && canManageInvitations) {
      fetchInvitations();
    }
  }, [activeOrganization, canManageInvitations]);

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('member_invitations')
        .select('*')
        .eq('organization_id', activeOrganization?.id)
        .in('status', ['pending', 'expired'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading invitations',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const revokeInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('member_invitations')
        .update({ status: 'revoked' })
        .eq('id', invitationId);

      if (error) throw error;

      toast({
        title: 'Invitation revoked',
        description: 'The invitation has been revoked.',
      });

      fetchInvitations();
    } catch (error: any) {
      toast({
        title: 'Error revoking invitation',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resendInvitation = async (invitationId: string) => {
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const { error } = await supabase
        .from('member_invitations')
        .update({ 
          status: 'pending',
          expires_at: expiresAt.toISOString(),
        })
        .eq('id', invitationId);

      if (error) throw error;

      toast({
        title: 'Invitation resent',
        description: 'The invitation has been resent with a new expiry date.',
      });

      fetchInvitations();
    } catch (error: any) {
      toast({
        title: 'Error resending invitation',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!canManageInvitations) return null;

  const isExpired = (expiresAt: string) => new Date(expiresAt) < new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Invitations
        </CardTitle>
        <CardDescription>
          Manage pending member invitations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Loading invitations...</div>
        ) : invitations.length === 0 ? (
          <div className="text-center py-4 text-stone-600">
            No pending invitations
          </div>
        ) : (
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-stone-900">{invitation.email}</div>
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Badge variant="outline">
                      {accessLevelNames[invitation.access_level as keyof typeof accessLevelNames]}
                    </Badge>
                    {invitation.can_invite_members && (
                      <Badge variant="secondary" className="text-xs">Can Invite</Badge>
                    )}
                    {invitation.can_manage_roles && (
                      <Badge variant="secondary" className="text-xs">Can Manage</Badge>
                    )}
                    {isExpired(invitation.expires_at) && (
                      <Badge variant="destructive" className="text-xs">Expired</Badge>
                    )}
                  </div>
                  <div className="text-xs text-stone-500">
                    Expires: {new Date(invitation.expires_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isExpired(invitation.expires_at) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resendInvitation(invitation.id)}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Resend
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => revokeInvitation(invitation.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingInvitations;
