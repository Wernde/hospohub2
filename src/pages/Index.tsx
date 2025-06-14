
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  // Redirect authenticated users to dashboard immediately
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Entrance animation sequence - only if user is not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      // Start background fade
      const bgTimer = setTimeout(() => {
        setIsVisible(true);
      }, 100);

      // Show logo after background
      const logoTimer = setTimeout(() => {
        setLogoVisible(true);
      }, 800);

      // Show button after logo
      const buttonTimer = setTimeout(() => {
        setButtonVisible(true);
      }, 1400);

      return () => {
        clearTimeout(bgTimer);
        clearTimeout(logoTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [user, isLoading]);

  // Show loading while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-stone-600 mx-auto mb-4" />
          <p className="text-lg text-stone-800">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is authenticated (will redirect)
  if (user) {
    return null;
  }

  return (
    <div 
      className={`min-h-screen w-full flex flex-col justify-center items-center relative text-center p-5 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url('/hospohub2/Images/HospoHUB.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <img
          src="/hospohub2/Images/Logo-HospoHub4.png"
          alt="HospoHUB Logo"
          width="1000"
          height="300"
          className={`logo-breathing w-full h-auto max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            logoVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
          }`}
          loading="eager"
        />

        <div className={`flex justify-center transition-all duration-1000 delay-300 ${
          buttonVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={() => navigate('/auth')}
            className="bg-transparent border-2 border-white text-white px-16 py-6 text-2xl cursor-pointer rounded-lg font-medium transition-all duration-300 hover:bg-white hover:text-black active:scale-95 hover:scale-105 backdrop-blur-sm"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
