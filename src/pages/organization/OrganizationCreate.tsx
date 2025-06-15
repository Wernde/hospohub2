
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OrganizationCreate = () => {
  const { user, setActiveOrganization } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Organization name required',
        description: 'Please enter a name for your organization.',
        variant: 'destructive',
      });
      return;
    }

    if (!organizationType) {
      toast({
        title: 'Organization type required',
        description: 'Please select an organization type.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Create the organization with additional fields
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([
          { 
            name, 
            description, 
            created_by: user?.id,
            // Store additional info in a metadata field or separate table
            // For now, we'll add them to description with formatting
          }
        ])
        .select('*')
        .single();
      
      if (orgError) throw orgError;
      
      // Add the creator as an admin (access level 3)
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert([
          { 
            user_id: user?.id, 
            organization_id: orgData.id,
            access_level: 3, // Admin
          }
        ]);
      
      if (memberError) throw memberError;

      // Store organization settings if needed
      const orgSettings = {
        organization_type: organizationType,
        industry,
        size,
        website,
        address
      };

      const { error: settingsError } = await supabase
        .from('organization_settings')
        .insert([
          {
            organization_id: orgData.id,
            setting_key: 'organization_info',
            setting_value: orgSettings
          }
        ]);

      if (settingsError) {
        console.warn('Could not save organization settings:', settingsError);
      }
      
      toast({
        title: 'Organization created!',
        description: `${name} has been created successfully.`,
      });
      
      // Set as active organization
      setActiveOrganization(orgData);
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error: any) {
      toast({
        title: 'Failed to create organization',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <div className="container py-8 max-w-2xl mx-auto pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Create an Organization</CardTitle>
            <CardDescription>
              Set up a new organization for your hospitality team to collaborate
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    placeholder="Culinary Institute of Excellence"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Organization Type *</Label>
                  <Select value={organizationType} onValueChange={setOrganizationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="culinary_school">Culinary School</SelectItem>
                      <SelectItem value="hospitality_college">Hospitality College</SelectItem>
                      <SelectItem value="restaurant_group">Restaurant Group</SelectItem>
                      <SelectItem value="catering_company">Catering Company</SelectItem>
                      <SelectItem value="hotel_chain">Hotel Chain</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of your organization's mission and focus"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Focus</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fine_dining">Fine Dining</SelectItem>
                      <SelectItem value="casual_dining">Casual Dining</SelectItem>
                      <SelectItem value="fast_casual">Fast Casual</SelectItem>
                      <SelectItem value="catering">Catering & Events</SelectItem>
                      <SelectItem value="hotel_restaurant">Hotel & Resort</SelectItem>
                      <SelectItem value="culinary_education">Culinary Education</SelectItem>
                      <SelectItem value="food_service">Food Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Organization Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 members</SelectItem>
                      <SelectItem value="11-50">11-50 members</SelectItem>
                      <SelectItem value="51-200">51-200 members</SelectItem>
                      <SelectItem value="201-500">201-500 members</SelectItem>
                      <SelectItem value="500+">500+ members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.yourorganization.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address (optional)</Label>
                <Textarea
                  id="address"
                  placeholder="Street address, city, state, country"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Organization'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationCreate;
