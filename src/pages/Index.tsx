
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [fadeOut, setFadeOut] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const navigateWithFade = (path: string) => {
    setFadeOut(true);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  // Only render content if user is not logged in
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <style>{`
        @keyframes fadeInLogo {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeInButtons {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes breathing {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        .logo-animation {
          opacity: 0;
          animation: fadeInLogo 2s ease-in-out forwards, breathing 4s ease-in-out infinite 2s;
        }

        .button-animation {
          opacity: 0;
          animation: fadeInButtons 1s ease-in-out 5s forwards;
        }

        .landing-fade {
          transition: opacity 1s ease;
        }

        .landing-fade.fade-out {
          opacity: 0;
        }
      `}</style>
      
      <div 
        className={`landing-fade min-h-screen w-full flex flex-col justify-center items-center relative text-center p-5 ${
          fadeOut ? 'fade-out' : ''
        }`}
        style={{
          background: "url('/HospoHUB.png') no-repeat center center fixed",
          backgroundSize: "cover"
        }}
      >
        <img 
          src="/HospoHUB (1).png" 
          alt="HospoHUB Logo" 
          className="logo-animation w-full max-w-4xl h-auto md:max-w-5xl"
        />
        
        <div className="absolute bottom-8 w-full flex flex-col md:flex-row justify-between items-center px-8 gap-3 md:gap-0">
          <button
            onClick={() => navigateWithFade('/auth')}
            className="button-animation border-2 border-white bg-transparent text-white px-10 py-4 text-xl cursor-pointer transition-all duration-300 hover:bg-white hover:text-gray-800 w-full md:w-auto max-w-xs"
          >
            SIGN IN
          </button>
          
          <button
            onClick={() => navigateWithFade('/dashboard')}
            className="button-animation border-2 border-white bg-transparent text-white px-10 py-4 text-xl cursor-pointer transition-all duration-300 hover:bg-white hover:text-gray-800 w-full md:w-auto max-w-xs"
          >
            HOSPOHOUSE
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
