
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
import { User, LogOut, ShieldCheck, LayoutDashboard } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Button variant="outline" asChild className="border-blue-300/30 text-blue-300 hover:bg-blue-800/50">
          <Link to="/auth">Log in</Link>
        </Button>
        <Button asChild className="bg-blue-500 hover:bg-blue-600 shadow-sm">
          <Link to="/auth?tab=signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full border border-blue-300/30 hover:bg-blue-800/50"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-500 text-blue-50">
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="cursor-default flex-col items-start gap-1 p-4">
          <p className="text-sm font-medium">{user.email}</p>
          {isAdmin && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Admin
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
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer flex w-full items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
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
  );
};

export default UserMenu;
