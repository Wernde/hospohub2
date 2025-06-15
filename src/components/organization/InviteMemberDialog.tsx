
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

const InviteMemberDialog = () => {
  const { activeOrganization, canUserPerformAction } = useAuth();
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('1');
  const [canInviteMembers, setCanInviteMembers] = useState(false);
  const [canManageRoles, setCanManageRoles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const canInvite = activeOrganization 
    ? canUserPerformAction(activeOrganization.id, 2)
    : false;

  if (!canInvite) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrganization) return;

    try {
      setIsLoading(true);

      // Generate invitation token
      const { data: tokenData } = await supabase.rpc('generate_invitation_token');
      
      if (!tokenData) throw new Error('Failed to generate invitation token');

      // Create permissions object
      const permissions = {
        read: true,
        write: parseInt(accessLevel) >= 2,
        invite: parseInt(accessLevel) >= 2 && canInviteMembers,
        admin: parseInt(accessLevel) >= 3,
        manage_roles: parseInt(accessLevel) >= 3 && canManageRoles,
      };

      // Set expiration to 7 days from now
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const { error } = await supabase
        .from('member_invitations')
        .insert([{
          organization_id: activeOrganization.id,
          email,
          access_level: parseInt(accessLevel),
          permissions,
          invitation_token: tokenData,
          expires_at: expiresAt.toISOString(),
          can_invite_members: canInviteMembers,
          can_manage_roles: canManageRoles,
        }]);

      if (error) throw error;

      toast({
        title: 'Invitation sent',
        description: `An invitation has been sent to ${email}`,
      });

      // Reset form
      setEmail('');
      setAccessLevel('1');
      setCanInviteMembers(false);
      setCanManageRoles(false);
      setIsOpen(false);

    } catch (error: any) {
      toast({
        title: 'Error sending invitation',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join {activeOrganization?.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessLevel">Access Level</Label>
            <Select value={accessLevel} onValueChange={setAccessLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Member - Read access only</SelectItem>
                <SelectItem value="2">Manager - Read/Write access</SelectItem>
                <SelectItem value="3">Admin - Full access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {parseInt(accessLevel) >= 2 && (
            <div className="space-y-3">
              <Label>Additional Permissions</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canInvite"
                  checked={canInviteMembers}
                  onCheckedChange={setCanInviteMembers}
                />
                <Label htmlFor="canInvite" className="text-sm">
                  Can invite other members
                </Label>
              </div>
              
              {parseInt(accessLevel) >= 3 && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="canManage"
                    checked={canManageRoles}
                    onCheckedChange={setCanManageRoles}
                  />
                  <Label htmlFor="canManage" className="text-sm">
                    Can manage member roles
                  </Label>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
