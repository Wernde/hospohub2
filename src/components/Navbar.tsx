
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-subtle py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-[1.02]"
          >
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="font-display text-xl font-semibold text-foreground">
              HospoHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="space-x-6">
              <Link to="/" className="text-foreground/80 hover:text-primary transition-colors duration-200 link-underline">
                Home
              </Link>
              <a href="#features" className="text-foreground/80 hover:text-primary transition-colors duration-200 link-underline">
                Features
              </a>
              <a href="#testimonials" className="text-foreground/80 hover:text-primary transition-colors duration-200 link-underline">
                Testimonials
              </a>
              <Link to="/pricing" className="text-foreground/80 hover:text-primary transition-colors duration-200 link-underline">
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                Log in
              </Button>
              <Button className="bg-primary hover:bg-primary/90 shadow-sm">
                Sign up
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-subtle animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#features"
              className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link
              to="/pricing"
              className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-primary/30 text-primary hover:bg-primary/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Button>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
