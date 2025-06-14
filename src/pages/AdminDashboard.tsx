
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck } from 'lucide-react';

interface UserWithProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
}

interface AdminUser {
  user_id: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, setAsAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [userIdToPromote, setUserIdToPromote] = useState('');

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;
      
      // Get admin role information using the RPC function
      const { data: adminRoles, error: rolesError } = await supabase
        .rpc('get_admin_users') as { data: AdminUser[] | null, error: any };
        
      if (rolesError) {
        console.error('Error fetching admin roles:', rolesError);
      }
      
      // Create a set of admin user IDs for faster lookup
      const adminUserIds = new Set(
        Array.isArray(adminRoles) 
          ? adminRoles.map(role => role.user_id)
          : []
      );
      
      const formattedUsers = profiles?.map(profile => ({
        id: profile.id,
        email: `User ${profile.id.slice(0, 6)}...`, // Just a placeholder since we can't access emails easily
        first_name: profile.first_name,
        last_name: profile.last_name,
        is_admin: adminUserIds.has(profile.id)
      })) || [];
      
      setUsers(formattedUsers);
    } catch (error: any) {
      toast({
        title: 'Error fetching users',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function makeAdmin(userId: string) {
    try {
      setIsLoading(true);
      
      await setAsAdmin(userId);
      
      // Refresh the user list
      await fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error assigning admin role',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  // In a real app, this would be more sophisticated to handle user search/pagination
  async function promoteUserById() {
    if (!userIdToPromote.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid user ID',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      await makeAdmin(userIdToPromote);
      setUserIdToPromote('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You do not have permission to access the admin dashboard</CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          
          <div className="grid gap-6">
            {/* Promote user by ID */}
            <Card>
              <CardHeader>
                <CardTitle>Make User Admin</CardTitle>
                <CardDescription>Promote a user to admin by entering their ID</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      placeholder="Enter user ID"
                      value={userIdToPromote}
                      onChange={(e) => setUserIdToPromote(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={promoteUserById} disabled={isLoading}>
                      Make Admin
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Note: Your own user ID is: {user?.id}
                </p>
              </CardContent>
            </Card>
            
            {/* User list */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading users...</p>
                  ) : users.length === 0 ? (
                    <p>No users found</p>
                  ) : (
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {user.first_name || user.last_name ? (
                                  `${user.first_name || ''} ${user.last_name || ''}`
                                ) : (
                                  <span className="text-gray-400">No name</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {user.is_admin ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Admin
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    User
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {!user.is_admin && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => makeAdmin(user.id)}
                                    disabled={isLoading}
                                  >
                                    Make Admin
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={fetchUsers} variant="outline" disabled={isLoading}>
                  Refresh
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
