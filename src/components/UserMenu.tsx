
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, ShieldCheck, LayoutDashboard, Building, Settings, Users } from 'lucide-react';
import OrganizationSelector from './OrganizationSelector';

const UserMenu = () => {
  const { user, signOut, isAdmin, activeOrganization, getUserAccessLevel } = useAuth();

  const userAccessLevel = activeOrganization 
    ? getUserAccessLevel(activeOrganization.id) 
    : null;
  
  const isOrgAdmin = userAccessLevel === 3;
  const isOrgManager = userAccessLevel === 2;

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Button variant="outline" asChild className="border-rgba(0, 0, 0, 0.12)-300/30 text-rgba(0, 0, 0, 0.12)-300 hover:bg-rgba(0, 0, 0, 0.12)-800/50">
          <Link to="/auth">Log in</Link>
        </Button>
        <Button asChild className="bg-rgba(0, 0, 0, 0.12)-500 hover:bg-rgba(0, 0, 0, 0.12)-600 shadow-sm">
          <Link to="/auth?tab=signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <OrganizationSelector />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full border border-rgba(0, 0, 0, 0.12)-300/30 hover:bg-rgba(0, 0, 0, 0.12)-800/50"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-rgba(0, 0, 0, 0.12)-500 text-rgba(0, 0, 0, 0.12)-50">
                {user.email ? user.email[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem className="cursor-default flex-col items-start gap-1 p-4">
            <p className="text-sm font-medium">{user.email}</p>
            {isAdmin && (
              <span className="text-xs bg-rgba(0, 0, 0, 0.12)-100 text-rgba(0, 0, 0, 0.12)-800 px-2 py-0.5 rounded-full">
                System Admin
              </span>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="cursor-pointer flex w-full items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex w-full items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          {activeOrganization && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-default opacity-70 py-1 text-xs">
                {activeOrganization.name}
              </DropdownMenuItem>
              
              {(isOrgAdmin || isOrgManager || isAdmin) && (
                <DropdownMenuItem asChild>
                  <Link to="/organization/members" className="cursor-pointer flex w-full items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Manage Members</span>
                  </Link>
                </DropdownMenuItem>
              )}
              
              {(isOrgAdmin || isAdmin) && (
                <DropdownMenuItem asChild>
                  <Link to="/organization/settings" className="cursor-pointer flex w-full items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Organization Settings</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </>
          )}
          
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer flex w-full items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
