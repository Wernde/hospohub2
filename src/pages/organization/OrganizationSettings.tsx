
import { useState, useEffect } from 'react';
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
import { ChevronLeft } from 'lucide-react';

const OrganizationSettings = () => {
  const { activeOrganization, canUserPerformAction } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (activeOrganization) {
      setName(activeOrganization.name);
      setDescription(activeOrganization.description || '');
    } else {
      navigate('/dashboard');
    }
  }, [activeOrganization]);

  const canEditSettings = activeOrganization ? 
    canUserPerformAction(activeOrganization.id, 3) : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeOrganization || !canEditSettings) return;
    
    if (!name.trim()) {
      toast({
        title: 'Organization name required',
        description: 'Please enter a name for your organization.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('organizations')
        .update({
          name,
          description
        })
        .eq('id', activeOrganization.id);
      
      if (error) throw error;
      
      toast({
        title: 'Organization updated',
        description: 'Organization settings have been updated successfully.',
      });
      
      // Force reload organization data
      window.location.reload();
      
    } catch (error: any) {
      toast({
        title: 'Failed to update organization',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!activeOrganization || !canEditSettings) return;
    
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this organization? This action cannot be undone.'
    );
    
    if (!confirmDelete) return;
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', activeOrganization.id);
      
      if (error) throw error;
      
      toast({
        title: 'Organization deleted',
        description: 'The organization has been permanently deleted.',
      });
      
      navigate('/dashboard');
      
    } catch (error: any) {
      toast({
        title: 'Failed to delete organization',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeOrganization) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container py-8 max-w-xl mx-auto">
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
          <h1 className="text-2xl font-bold">Organization Settings</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Organization</CardTitle>
            <CardDescription>
              Update the details of your organization
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={!canEditSettings}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  disabled={!canEditSettings}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {canEditSettings ? (
                <>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDeleteOrganization}
                    disabled={isLoading}
                  >
                    Delete Organization
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <div className="ml-auto">
                  <Button
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationSettings;
