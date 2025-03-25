
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

interface Profile {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      setIsLoading(true);
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          avatar_url: data.avatar_url,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error fetching profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setIsLoading(true);
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(), // Convert Date to ISO string format
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Profile updated!',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ''} disabled />
                <p className="text-sm text-muted-foreground">Your email cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Your first name"
                  value={profile.first_name || ''}
                  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Your last name"
                  value={profile.last_name || ''}
                  onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                  value={profile.avatar_url || ''}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={updateProfile} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
