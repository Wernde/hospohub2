
-- Add more detailed access levels and administrator settings
ALTER TABLE organization_members 
ADD COLUMN permissions JSONB DEFAULT '{}',
ADD COLUMN can_invite_members BOOLEAN DEFAULT false,
ADD COLUMN can_manage_roles BOOLEAN DEFAULT false,
ADD COLUMN invited_by UUID REFERENCES auth.users(id),
ADD COLUMN invited_at TIMESTAMP WITH TIME ZONE;

-- Create organization settings table
CREATE TABLE organization_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  setting_key TEXT NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(organization_id, setting_key)
);

-- Create member invitations table
CREATE TABLE member_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  access_level INTEGER NOT NULL DEFAULT 1,
  permissions JSONB DEFAULT '{}',
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  invitation_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked'))
);

-- Enable RLS on new tables
ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_invitations ENABLE ROW LEVEL SECURITY;

-- RLS policies for organization_settings
CREATE POLICY "Organization members can view settings" 
  ON organization_settings FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = organization_settings.organization_id 
      AND user_id = auth.uid() 
      AND status = 'active'
    )
  );

CREATE POLICY "Organization admins can manage settings" 
  ON organization_settings FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = organization_settings.organization_id 
      AND user_id = auth.uid() 
      AND access_level >= 3 
      AND status = 'active'
    )
  );

-- RLS policies for member_invitations
CREATE POLICY "Organization members can view invitations" 
  ON member_invitations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = member_invitations.organization_id 
      AND user_id = auth.uid() 
      AND access_level >= 2 
      AND status = 'active'
    )
  );

CREATE POLICY "Organization managers can manage invitations" 
  ON member_invitations FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM organization_members 
      WHERE organization_id = member_invitations.organization_id 
      AND user_id = auth.uid() 
      AND access_level >= 2 
      AND status = 'active'
    )
  );

-- Function to generate invitation tokens
CREATE OR REPLACE FUNCTION generate_invitation_token()
RETURNS TEXT AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Update existing organization_members to have proper permissions
UPDATE organization_members 
SET 
  can_invite_members = CASE WHEN access_level >= 2 THEN true ELSE false END,
  can_manage_roles = CASE WHEN access_level >= 3 THEN true ELSE false END,
  permissions = CASE 
    WHEN access_level = 1 THEN '{"read": true}'::jsonb
    WHEN access_level = 2 THEN '{"read": true, "write": true, "invite": true}'::jsonb
    WHEN access_level = 3 THEN '{"read": true, "write": true, "invite": true, "admin": true}'::jsonb
    ELSE '{}'::jsonb
  END;
