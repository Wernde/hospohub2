
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
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

  // Smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      const from = location.state?.from?.pathname || '/dashboard';
      smoothNavigate(from);
    }
  }, [user, isLoading, navigate, location]);

  const smoothNavigate = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(path, { replace: true });
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes smoothSlideIn {
          from { 
            transform: translateY(20px) scale(0.98); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }

        @keyframes smoothSlideOut {
          from { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
          to { 
            transform: translateY(-20px) scale(0.98); 
            opacity: 0; 
          }
        }

        @keyframes logoBreathing {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.02); }
        }

        @keyframes backgroundFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .auth-container {
          font-family: 'Georgia', serif;
          opacity: 0;
          animation: backgroundFade 1.2s ease forwards;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .auth-container.visible {
          opacity: 1;
        }

        .auth-container.exiting {
          opacity: 0;
          transform: scale(0.98);
        }

        .form-box {
          animation: smoothSlideIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-box.exiting {
          animation: smoothSlideOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .logo-breathing {
          animation: logoBreathing 4s ease-in-out infinite;
        }

        .tab-button {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-button.active {
          background: #4a4a4a;
          color: white;
          font-weight: bold;
        }

        .back-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .back-button:hover {
          transform: translateX(-3px);
          color: #e0e0e0;
        }
      `}</style>
      
      <div 
        className={`auth-container min-h-screen w-full ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
        style={{
          background: "url('/HospoHUB.png') no-repeat center center fixed",
          backgroundSize: "cover"
        }}
      >
        <div className="flex h-screen w-full flex-wrap">
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
            <img 
              src="/HospoHUB (1).png" 
              alt="HospoHub Logo" 
              className="logo-breathing absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[180%] transition-all duration-700 ease-out"
            />
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 lg:p-20">
            <div className={`form-box w-full max-w-lg bg-[#fffdf8] p-12 lg:p-16 rounded-lg shadow-2xl z-10 ${isExiting ? 'exiting' : ''}`}>
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
              <div className="transition-all duration-500 ease-in-out">
                {activeTab === 'signin' ? (
                  <SignInForm onNavigate={smoothNavigate} />
                ) : (
                  <SignUpForm onNavigate={smoothNavigate} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => smoothNavigate('/')}
          className="back-button fixed bottom-5 right-5 text-3xl text-white bg-none border-none cursor-pointer z-[1001]"
        >
          ←
        </button>
      </div>
    </>
  );
};

export default Auth;
