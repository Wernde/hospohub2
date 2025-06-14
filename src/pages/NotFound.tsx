
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      {/* Logo with background container */}
      <div className="mb-8 p-6 bg-white rounded-full shadow-lg">
        <img
          src="/hospohub2/Images/Logo-HospoHub4.png"
          alt="HospoHub Logo"
          className="logo-breathing h-32 w-auto drop-shadow-2xl"
        />
      </div>

      {/* Error Code */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display">404</h1>

      {/* Message */}
      <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-md">
        Oops! This page seems to have wandered away from our HospoHUB platform.
      </p>

      {/* Return Home Button */}
      <Button size="lg" className="animated-button bg-blue-600 text-white hover:bg-blue-700">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
