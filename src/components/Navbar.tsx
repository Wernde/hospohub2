
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
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
  const isDashboardPage = !isHomePage && user;

  const dashboardLinks: NavLink[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-7 h-7" /> },
    { name: 'Recipes', href: '/recipes', icon: <BookOpen className="w-7 h-7" /> },
    { name: 'Classes', href: '/classes', icon: <GraduationCap className="w-7 h-7" /> },
    { name: 'Pantry', href: '/pantry', icon: <ShoppingBasket className="w-7 h-7" /> },
    { name: 'Shopping', href: '/shopping', icon: <ShoppingCart className="w-7 h-7" /> }
  ];

  const homeLinks: NavLink[] = [
    { name: 'Features', href: '#features', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Testimonials', href: '#testimonials', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const navLinks = isHomePage ? homeLinks : dashboardLinks;

  return (
    <>
      {/* Breathing Logo for Dashboard Pages */}
      {isDashboardPage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
          <img 
            src="/hospohub2/Images/Logo-HospoHub4.png" 
            alt="HospoHub Logo" 
            className="logo-breathing w-auto h-16 object-contain drop-shadow-2xl opacity-90"
          />
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md shadow-lg py-2'
            : 'backdrop-blur-sm py-3'
        } navbar-river-flow`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link 
              to="/" 
              className="flex items-center space-x-3 transition-transform duration-300 hover:scale-[1.02]"
            >
              <img 
                src="/hospohub2/Images/Logo-HospoHub4.png" 
                alt="HospoHub Logo" 
                className="logo-breathing w-auto h-12 object-contain drop-shadow-2xl"
              />
              <span className="font-display text-xl font-semibold text-white">
                HospoHub
              </span>
            </Link>

            <div className="hidden md:flex flex-1 items-center justify-center mx-6">
              <div className="flex justify-center space-x-2 md:space-x-4 lg:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-md border ${
                      (isHomePage ? location.hash === link.href : location.pathname === link.href)
                        ? 'bg-white text-stone-800 font-semibold border-white' 
                        : 'text-white hover:text-stone-800 hover:bg-white/90 border-white'
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
          <div 
            className="md:hidden absolute top-full left-0 right-0 backdrop-blur-lg shadow-lg animate-fade-in navbar-river-flow"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href} 
                  className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 border ${
                    (isHomePage ? location.hash === link.href : location.pathname === link.href) 
                      ? 'bg-white text-stone-800 font-semibold border-white' 
                      : 'text-white hover:text-stone-800 hover:bg-white/90 border-white'
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
                      className="w-full border-white text-white hover:bg-white/90 hover:text-stone-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                      asChild
                    >
                      <Link to="/auth">Log in</Link>
                    </Button>
                    <Button 
                      className="w-full bg-white text-stone-800 font-semibold hover:bg-white/90"
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
    </>
  );
};

export default Navbar;
