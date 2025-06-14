
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="flex items-center space-x-2 mb-1">
            <ChefHat className="w-5 h-5 text-blue-300" />
            <span className="font-display text-base font-semibold text-white">
              HospoHub
            </span>
          </Link>
          
          <p className="text-blue-100/80 mb-2 max-w-md text-xs">
            Empowering hospitality education with intelligent recipe and inventory management.
          </p>
          
          <div className="flex space-x-3 mb-2">
            <a href="#" className="text-blue-200/70 hover:text-blue-300 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-blue-200/70 hover:text-blue-300 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-blue-200/70 hover:text-blue-300 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-blue-200/70 hover:text-blue-300 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200/50 text-xs">
            © 2025 HospoHub. All rights reserved.
          </p>
          
          <div className="mt-1 md:mt-0">
            <ul className="flex space-x-4 text-xs">
              <li>
                <Link to="/privacy" className="text-blue-200/50 hover:text-blue-300 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-200/50 hover:text-blue-300 transition-colors">
                  Terms
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
