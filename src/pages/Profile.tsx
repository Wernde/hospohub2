
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Profile {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, activeOrganization } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    avatar_url: '',
  });
  const [profileSettings, setProfileSettings] = useState({
    job_title: '',
    department: '',
    phone_number: '',
    bio: '',
    dietary_restrictions: '',
    certifications: '',
    years_experience: '',
    specializations: '',
    preferred_cuisine: ''
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

      if (error && error.code !== 'PGRST116') {
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
        .upsert({
          id: user.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        });

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
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-stone-800">Your Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Profile Information */}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Your culinary and hospitality details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Chef, Manager, Student..."
                      value={profileSettings.job_title}
                      onChange={(e) => setProfileSettings({ ...profileSettings, job_title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="Kitchen, Service, Admin..."
                      value={profileSettings.department}
                      onChange={(e) => setProfileSettings({ ...profileSettings, department: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Select value={profileSettings.years_experience} onValueChange={(value) => setProfileSettings({ ...profileSettings, years_experience: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16+">16+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specializations">Specializations</Label>
                  <Input
                    id="specializations"
                    placeholder="Pastry, Italian cuisine, Management..."
                    value={profileSettings.specializations}
                    onChange={(e) => setProfileSettings({ ...profileSettings, specializations: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Input
                    id="certifications"
                    placeholder="ServSafe, CIA, etc."
                    value={profileSettings.certifications}
                    onChange={(e) => setProfileSettings({ ...profileSettings, certifications: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact & Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Preferences</CardTitle>
                <CardDescription>Additional information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={profileSettings.phone_number}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone_number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredCuisine">Preferred Cuisine</Label>
                  <Select value={profileSettings.preferred_cuisine} onValueChange={(value) => setProfileSettings({ ...profileSettings, preferred_cuisine: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="latin">Latin American</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                  <Input
                    id="dietaryRestrictions"
                    placeholder="Vegetarian, Gluten-free, etc."
                    value={profileSettings.dietary_restrictions}
                    onChange={(e) => setProfileSettings({ ...profileSettings, dietary_restrictions: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself and your culinary journey..."
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Organization Info (if user is part of an organization) */}
            {activeOrganization && (
              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                  <CardDescription>Your current organization details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Organization Name</Label>
                    <div className="px-3 py-2 bg-stone-50 border rounded-md text-stone-700">
                      {activeOrganization.name}
                    </div>
                  </div>
                  {activeOrganization.description && (
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <div className="px-3 py-2 bg-stone-50 border rounded-md text-stone-700">
                        {activeOrganization.description}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <div className="px-3 py-2 bg-stone-50 border rounded-md text-stone-700">
                      {new Date(activeOrganization.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
