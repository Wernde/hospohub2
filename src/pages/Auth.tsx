
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [fadeOut, setFadeOut] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for tab param in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    }
  }, [location]);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location]);

  const navigateWithFade = (path: string) => {
    setFadeOut(true);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes breathing {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes fadeInScreen {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOutScreen {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .auth-container {
          font-family: 'Georgia', serif;
          opacity: 0;
          animation: fadeInScreen 1s ease forwards;
          transition: opacity 1s ease;
        }

        .auth-container.fade-out {
          animation: fadeOutScreen 1s ease forwards;
        }

        .form-box {
          animation: slideIn 1s ease;
        }

        .logo-breathing {
          animation: breathing 4s ease-in-out infinite;
        }

        .tab-button {
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .tab-button.active {
          background: #4a4a4a;
          color: white;
          font-weight: bold;
        }
      `}</style>
      
      <div 
        className={`auth-container min-h-screen w-full ${fadeOut ? 'fade-out' : ''}`}
        style={{
          background: "url('/HospoHUB.png') no-repeat center center fixed",
          backgroundSize: "cover"
        }}
      >
        <div className="flex h-screen w-full flex-wrap">
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative">
            <img 
              src="/HospoHUB (1).png" 
              alt="HospoHub Logo" 
              className="logo-breathing absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[180%]"
            />
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 lg:p-20">
            <div className="form-box w-full max-w-lg bg-[#fffdf8] p-12 lg:p-16 rounded-lg shadow-lg z-10">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-[#2c2c2c]">Welcome</h2>
              <p className="text-sm mb-6 text-[#555]">Choose an option below to get started</p>

              {/* Tabs */}
              <div className="flex mb-6 gap-2">
                <button
                  onClick={() => setActiveTab('signin')}
                  className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-[#333] ${
                    activeTab === 'signin' ? 'active' : 'bg-[#f5f2ea]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-[#333] ${
                    activeTab === 'signup' ? 'active' : 'bg-[#f5f2ea]'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Forms */}
              {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigateWithFade('/')}
          className="fixed bottom-5 right-5 text-3xl text-white bg-none border-none cursor-pointer z-[1001] hover:text-gray-300 transition-colors"
        >
          ←
        </button>
      </div>
    </>
  );
};

export default Auth;
