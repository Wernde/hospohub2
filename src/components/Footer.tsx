
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <ChefHat className="w-8 h-8 text-primary" />
              <span className="font-display text-xl font-semibold text-white">
                HospoHub
              </span>
            </Link>
            
            <p className="text-white/70 mb-6">
              Empowering hospitality education with intelligent recipe and inventory management.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Platform</h3>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-white/70 hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-white/70 hover:text-primary transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/customers" className="text-white/70 hover:text-primary transition-colors">
                  Customers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-primary transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-white/70 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-white/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © 2025 HospoHub. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link to="/privacy" className="text-white/50 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/50 hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white/50 hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
