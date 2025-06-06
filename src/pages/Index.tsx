import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      smoothNavigate('/dashboard');
    }
  }, [user, isLoading, smoothNavigate]);

  // Smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const smoothNavigate = useCallback(
    (path: string) => {
      setIsExiting(true);
      setTimeout(() => {
        navigate(path);
      }, 800);
    },
    [navigate]
  );

  // Only render content if user is not logged in
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <style>{`
        @keyframes smoothFadeIn {
          0% { 
            opacity: 0; 
            transform: scale(0.98) translateY(10px); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        @keyframes smoothFadeOut {
          0% { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0.98) translateY(-10px); 
          }
        }

        @keyframes logoGlow {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.02);
            filter: brightness(1.05);
          }
        }

        @keyframes buttonSlideUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .landing-container {
          opacity: 0;
          animation: smoothFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .landing-container.visible {
          opacity: 1;
        }

        .landing-container.exiting {
          animation: smoothFadeOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .logo-animation {
          opacity: 0;
          animation: smoothFadeIn 1.5s ease-out 0.5s forwards, logoGlow 4s ease-in-out infinite 2s;
        }

        .button-animation {
          opacity: 0;
          animation: buttonSlideUp 1s cubic-bezier(0.4, 0, 0.2, 1) 2.5s forwards;
        }

        .btn-smooth {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }

        .btn-smooth:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .btn-smooth:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
      
      <div 
        className={`landing-container min-h-screen w-full flex flex-col justify-center items-center relative text-center p-5 ${
          isVisible ? 'visible' : ''
        } ${isExiting ? 'exiting' : ''}`}
        style={{
          background: `url('${import.meta.env.BASE_URL}/Images/HospoHub.png') no-repeat center center fixed`,
          backgroundSize: "cover"
        }}
      >
        <img 
           src={`${import.meta.env.BASE_URL}/Images/HospoHub.png`}
          alt="HospoHUB Logo" 
          className="logo-animation w-full max-w-4xl h-auto md:max-w-5xl"
        />
        
        <div className="absolute bottom-8 w-full flex flex-col md:flex-row justify-between items-center px-8 gap-3 md:gap-0">
          <button
            onClick={() => smoothNavigate('/auth')}
            className="button-animation btn-smooth border-2 border-white bg-transparent text-white px-10 py-4 text-xl cursor-pointer w-full md:w-auto max-w-xs"
          >
            SIGN IN
          </button>
          
          <button
            onClick={() => smoothNavigate('/dashboard')}
            className="button-animation btn-smooth border-2 border-white bg-transparent text-white px-10 py-4 text-xl cursor-pointer w-full md:w-auto max-w-xs"
          >
            HOSPOHOUSE
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
