import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Menu, 
  X, 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  ShoppingBasket, 
  ShoppingCart 
} from 'lucide-react';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const dashboardLinks: NavLink[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Recipes', href: '/recipes', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Classes', href: '/classes', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Pantry', href: '/pantry', icon: <ShoppingBasket className="w-4 h-4" /> },
    { name: 'Shopping', href: '/shopping', icon: <ShoppingCart className="w-4 h-4" /> }
  ];

  const homeLinks: NavLink[] = [
    { name: 'Home', href: '/', icon: <ChefHat className="w-4 h-4" /> },
    { name: 'Features', href: '#features', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Pricing', href: '/pricing', icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const navLinks = isHomePage ? homeLinks : dashboardLinks;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-rgba(0, 0, 0, 0.12)-900/90 backdrop-blur-md shadow-subtle py-2'
          : 'bg-rgba(0, 0, 0, 0.12)-900/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-[1.02]"
          >
            <ChefHat className="w-7 h-7 text-rgba(0, 0, 0, 0.12)-300" />
            <span className="font-display text-xl font-semibold text-white">
              HospoHub
            </span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center mx-6">
            <div className="flex justify-between space-x-2 md:space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-white/90 hover:text-rgba(0, 0, 0, 0.12)-300 transition-colors duration-200 flex items-center gap-2 py-2 px-3 rounded-md ${
                    location.pathname === link.href ? 'bg-rgba(0, 0, 0, 0.12)-800/50 text-rgba(0, 0, 0, 0.12)-300' : ''
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <UserMenu />
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-rgba(0, 0, 0, 0.12)-900/95 backdrop-blur-lg shadow-subtle animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href} 
                className={`px-4 py-2 text-white/90 hover:text-rgba(0, 0, 0, 0.12)-300 hover:bg-rgba(0, 0, 0, 0.12)-800/50 rounded-md transition-colors flex items-center gap-2 ${
                  location.pathname === link.href ? 'bg-rgba(0, 0, 0, 0.12)-800/70 text-rgba(0, 0, 0, 0.12)-300' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              {!user && (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full border-rgba(0, 0, 0, 0.12)-300/30 text-rgba(0, 0, 0, 0.12)-300 hover:bg-rgba(0, 0, 0, 0.12)-800/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link to="/auth">Log in</Link>
                  </Button>
                  <Button 
                    className="w-full bg-rgba(0, 0, 0, 0.12)-500 hover:bg-rgba(0, 0, 0, 0.12)-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link to="/auth?tab=signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
