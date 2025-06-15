
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth navigate function
  const smoothNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  // Fast entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Show minimal loading while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400 mx-auto mb-4" />
          <p className="text-lg text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in, render nothing (redirect is happening)
  if (user) {
    return null;
  }

  return (
    <div className={`min-h-screen w-full flex flex-col justify-center items-center relative text-center p-5 bg-gray-900 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900/40" />
      
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg cursor-pointer w-full md:w-auto max-w-xs min-h-[48px] rounded-lg font-medium transition-all duration-300 active:scale-95"
          >
            SIGN IN
          </button>

          <button
            onClick={() => smoothNavigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg cursor-pointer w-full md:w-auto max-w-xs min-h-[48px] rounded-lg font-medium transition-all duration-300 active:scale-95"
          >
            HOSPOHOUSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
