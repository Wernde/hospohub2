
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { ChevronLeft, UserPlus } from 'lucide-react';

type Member = {
  id: string;
  user_id: string;
  email: string;
  access_level: number;
};

const OrganizationMembers = () => {
  const { activeOrganization, user, canUserPerformAction } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const canManageMembers = activeOrganization ? 
    canUserPerformAction(activeOrganization.id, 2) : false;

  const fetchMembers = async () => {
    if (!activeOrganization) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          id,
          user_id,
          access_level,
          user_id(id, email)
        `)
        .eq('organization_id', activeOrganization.id)
        .eq('status', 'active');
      
      if (error) throw error;
      
      // Transform the data to extract email from the nested user object
      const membersWithEmail = data.map((member: any) => ({
        id: member.id,
        user_id: member.user_id.id,
        email: member.user_id.email,
        access_level: member.access_level
      }));
      
      setMembers(membersWithEmail);
    } catch (error: any) {
      toast({
        title: 'Failed to load members',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeOrganization) {
      fetchMembers();
    } else {
      navigate('/dashboard');
    }
  }, [activeOrganization]);

  const handleAddMember = async () => {
    if (!activeOrganization || !newMemberEmail.trim()) return;
    
    try {
      setIsAdding(true);
      
      // First, find the user by email
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', newMemberEmail)
        .single();
      
      if (userError || !userData) {
        toast({
          title: 'User not found',
          description: 'No user found with that email address.',
          variant: 'destructive',
        });
        return;
      }
      
      // Check if user is already a member
      const { data: existingMember, error: checkError } = await supabase
        .from('organization_members')
        .select('id')
        .eq('organization_id', activeOrganization.id)
        .eq('user_id', userData.id)
        .single();
      
      if (existingMember) {
        toast({
          title: 'User already a member',
          description: 'This user is already a member of this organization.',
          variant: 'destructive',
        });
        return;
      }
      
      // Add the member
      const { error: addError } = await supabase
        .from('organization_members')
        .insert([
          { 
            user_id: userData.id, 
            organization_id: activeOrganization.id,
            access_level: 1, // Regular member
          }
        ]);
      
      if (addError) throw addError;
      
      toast({
        title: 'Member added',
        description: `${newMemberEmail} has been added to the organization.`,
      });
      
      setNewMemberEmail('');
      fetchMembers();
    } catch (error: any) {
      toast({
        title: 'Failed to add member',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateAccessLevel = async (memberId: string, userId: string, newLevel: number) => {
    if (!activeOrganization) return;
    
    // Prevent changing your own access level
    if (userId === user?.id) {
      toast({
        title: 'Cannot update own access level',
        description: 'You cannot change your own permissions.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('organization_members')
        .update({ access_level: newLevel })
        .eq('id', memberId);
      
      if (error) throw error;
      
      toast({
        title: 'Member updated',
        description: 'Member access level has been updated.',
      });
      
      // Update local state
      setMembers(members.map(member => 
        member.id === memberId 
          ? { ...member, access_level: newLevel }
          : member
      ));
    } catch (error: any) {
      toast({
        title: 'Failed to update member',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleRemoveMember = async (memberId: string, userId: string) => {
    if (!activeOrganization) return;
    
    // Prevent removing yourself
    if (userId === user?.id) {
      toast({
        title: 'Cannot remove yourself',
        description: 'You cannot remove yourself from the organization.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
      toast({
        title: 'Member removed',
        description: 'Member has been removed from the organization.',
      });
      
      // Update local state
      setMembers(members.filter(member => member.id !== memberId));
    } catch (error: any) {
      toast({
        title: 'Failed to remove member',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!activeOrganization) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {activeOrganization.name} - Members
          </h1>
        </div>

        {canManageMembers && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="Email address"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddMember} 
                  disabled={isAdding || !newMemberEmail.trim()}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isAdding ? 'Adding...' : 'Add Member'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="py-8 text-center">Loading members...</div>
            ) : members.length === 0 ? (
              <div className="py-8 text-center">No members found.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Access Level</TableHead>
                    {canManageMembers && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        {member.email}
                        {member.user_id === user?.id && (
                          <span className="ml-2 text-xs text-blue-600">(You)</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {canManageMembers && member.user_id !== user?.id ? (
                          <Select
                            value={member.access_level.toString()}
                            onValueChange={(value) => 
                              handleUpdateAccessLevel(member.id, member.user_id, parseInt(value))
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Member</SelectItem>
                              <SelectItem value="2">Manager</SelectItem>
                              <SelectItem value="3">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <span>
                            {member.access_level === 1 && 'Member'}
                            {member.access_level === 2 && 'Manager'}
                            {member.access_level === 3 && 'Admin'}
                          </span>
                        )}
                      </TableCell>
                      {canManageMembers && (
                        <TableCell>
                          {member.user_id !== user?.id && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveMember(member.id, member.user_id)}
                            >
                              Remove
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationMembers;
