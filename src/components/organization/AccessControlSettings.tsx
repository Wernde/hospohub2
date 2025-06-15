
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

interface OrganizationSettings {
  allow_member_invitations: boolean;
  min_access_level_to_invite: number;
  min_access_level_to_manage_roles: number;
  require_admin_approval: boolean;
}

const AccessControlSettings = () => {
  const { activeOrganization, canUserPerformAction } = useAuth();
  const [settings, setSettings] = useState<OrganizationSettings>({
    allow_member_invitations: true,
    min_access_level_to_invite: 2,
    min_access_level_to_manage_roles: 3,
    require_admin_approval: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const canManageSettings = activeOrganization 
    ? canUserPerformAction(activeOrganization.id, 3)
    : false;

  useEffect(() => {
    if (activeOrganization && canManageSettings) {
      loadSettings();
    }
  }, [activeOrganization, canManageSettings]);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('organization_settings')
        .select('setting_key, setting_value')
        .eq('organization_id', activeOrganization?.id);

      if (error) throw error;

      const settingsMap = (data || []).reduce((acc, item) => {
        acc[item.setting_key] = item.setting_value;
        return acc;
      }, {} as Record<string, any>);

      setSettings({
        allow_member_invitations: settingsMap.allow_member_invitations ?? true,
        min_access_level_to_invite: settingsMap.min_access_level_to_invite ?? 2,
        min_access_level_to_manage_roles: settingsMap.min_access_level_to_manage_roles ?? 3,
        require_admin_approval: settingsMap.require_admin_approval ?? false,
      });
    } catch (error: any) {
      toast({
        title: 'Error loading settings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('organization_settings')
        .upsert({
          organization_id: activeOrganization?.id,
          setting_key: key,
          setting_value: value,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: 'Setting updated',
        description: 'The access control setting has been updated.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating setting',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!canManageSettings) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Access Control Settings
        </CardTitle>
        <CardDescription>
          Configure organization-wide access control policies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="text-center py-4">Loading settings...</div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-invitations">Allow Member Invitations</Label>
                <div className="text-sm text-stone-600">
                  Enable members to invite others to the organization
                </div>
              </div>
              <Switch
                id="allow-invitations"
                checked={settings.allow_member_invitations}
                onCheckedChange={(checked) => updateSetting('allow_member_invitations', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-invite-level">Minimum Level to Invite Members</Label>
              <Select
                value={settings.min_access_level_to_invite.toString()}
                onValueChange={(value) => updateSetting('min_access_level_to_invite', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Member (Level 1)</SelectItem>
                  <SelectItem value="2">Manager (Level 2)</SelectItem>
                  <SelectItem value="3">Admin (Level 3)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-manage-level">Minimum Level to Manage Roles</Label>
              <Select
                value={settings.min_access_level_to_manage_roles.toString()}
                onValueChange={(value) => updateSetting('min_access_level_to_manage_roles', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Manager (Level 2)</SelectItem>
                  <SelectItem value="3">Admin (Level 3)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="require-approval">Require Admin Approval</Label>
                <div className="text-sm text-stone-600">
                  New members need admin approval before gaining access
                </div>
              </div>
              <Switch
                id="require-approval"
                checked={settings.require_admin_approval}
                onCheckedChange={(checked) => updateSetting('require_admin_approval', checked)}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessControlSettings;
