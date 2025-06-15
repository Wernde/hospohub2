
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Smooth navigate function with transition
  const smoothNavigate = useCallback((path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(path);
    }, 300);
  }, [navigate]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      smoothNavigate('/dashboard');
    }
  }, [user, isLoading, smoothNavigate]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  // If user is already logged in, show loading
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-stone-600 mx-auto mb-4" />
          <p className="text-lg text-stone-800">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col justify-center items-center relative text-center p-5 bg-stone-800 transition-all duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    } ${isExiting ? 'opacity-0 scale-95' : ''}`}>
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-700/20 to-stone-900/40" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <img
          src="/hospohub2/Images/Logo-HospoHub4.png"
          alt="HospoHUB Logo"
          className="logo-breathing w-full h-auto max-w-3xl mx-auto mb-8 transition-transform duration-700 hover:scale-105"
          loading="eager"
        />

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
          <button
            onClick={() => smoothNavigate('/auth')}
            className="bg-stone-600 hover:bg-stone-700 text-white px-8 py-4 text-lg cursor-pointer w-full md:w-auto max-w-xs min-h-[48px] rounded-lg font-medium transition-all duration-300 active:scale-95 hover:scale-105"
          >
            SIGN IN
          </button>

          <button
            onClick={() => smoothNavigate('/dashboard')}
            className="bg-stone-600 hover:bg-stone-700 text-white px-8 py-4 text-lg cursor-pointer w-full md:w-auto max-w-xs min-h-[48px] rounded-lg font-medium transition-all duration-300 active:scale-95 hover:scale-105"
          >
            HOSPOHOUSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
