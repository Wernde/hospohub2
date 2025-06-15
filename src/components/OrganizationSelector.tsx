
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building, ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const OrganizationSelector = () => {
  const { userOrganizations, activeOrganization, setActiveOrganization } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!userOrganizations || userOrganizations.length === 0) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate('/organization/create')}
        className="flex items-center gap-2 bg-stone-800/40 border-stone-700 hover:bg-stone-800/60 text-white"
      >
        <Plus className="h-4 w-4" />
        <span>Create Organization</span>
      </Button>
    );
  }

  const handleCreateNewOrg = () => {
    navigate('/organization/create');
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center justify-between bg-stone-800/40 border-stone-700 hover:bg-stone-800/60 text-white"
          size="sm"
        >
          <span className="flex items-center gap-2 truncate max-w-[140px]">
            <Building className="h-4 w-4 text-stone-300" />
            <span className="truncate">
              {activeOrganization?.name || 'Select Organization'}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 ml-2 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Your Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userOrganizations.map((membership) => (
          <DropdownMenuItem 
            key={membership.organization_id}
            className={`cursor-pointer ${
              activeOrganization?.id === membership.organization.id ? 'bg-stone-50 font-medium' : ''
            }`}
            onClick={() => {
              setActiveOrganization(membership.organization);
              setIsOpen(false);
              toast({
                title: "Organization switched",
                description: `You are now working in ${membership.organization.name}`,
              });
            }}
          >
            <div className="flex items-center justify-between w-full">
              <span className="truncate">{membership.organization.name}</span>
              {membership.access_level === 3 && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              )}
              {membership.access_level === 2 && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                  Manager
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-stone-600 hover:text-stone-800"
          onClick={handleCreateNewOrg}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationSelector;
