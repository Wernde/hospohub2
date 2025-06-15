
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 p-6 text-center animate-fade-in">
      {/* Logo with background container */}
      <div className="mb-8 p-6 bg-stone-700 rounded-full shadow-lg">
        <img
          src="/hospohub2/Images/Logo-HospoHub4.png"
          alt="HospoHub Logo"
          className="logo-breathing h-32 w-auto drop-shadow-2xl"
        />
      </div>

      {/* Error Code */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display text-stone-800">404</h1>

      {/* Message */}
      <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-md">
        Oops! This page seems to have wandered away from our HospoHub platform.
      </p>

      {/* Return Home Button */}
      <Link to="/">
        <Button size="lg" className="animated-button bg-stone-600 text-white hover:bg-stone-700 flex items-center gap-2 transition-all duration-300">
          <Home className="h-5 w-5" />
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
