
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="mb-6 animate-image-float">
        <ChefHat className="w-20 h-20 text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display">404</h1>
      
      <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-md">
        Oops! This page seems to have wandered away from our recipe collection.
      </p>
      
      <Button asChild size="lg" className="animated-button">
        <Link to="/" className="flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
