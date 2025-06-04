
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
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#f5f2ea' }}>
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
          0%, 100% { 
            transform: scale(1); 
            opacity: 1;
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.9;
          }
        }

        @keyframes backgroundFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .auth-container {
          font-family: 'Georgia', serif;
          opacity: 0;
          animation: backgroundFade 1.2s ease forwards;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: #f5f2ea;
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
          animation: smoothSlideOut 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .logo-breathing {
          animation: logoBreathing 3s ease-in-out infinite;
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
          color: #666;
        }
      `}</style>
      
      <div 
        className={`auth-container min-h-screen w-full ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
      >
        <div className="flex h-screen w-full">
          {/* Left Panel - Image with Logo */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
            <img 
              src="/lovable-uploads/66f72905-457b-404a-b251-f5bcaf1a998d.png" 
              alt="Fresh Ingredients" 
              className="w-full h-full object-cover"
            />
            {/* Logo centered on image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/8611b175-f69b-4ea2-9a4e-91037d929617.png" 
                alt="HospoHUB Logo" 
                className="logo-breathing h-58 w-auto"
              />
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 lg:p-20 relative">
            <div className={`form-box w-full max-w-lg bg-white p-12 lg:p-16 rounded-lg shadow-lg z-10 ${isExiting ? 'exiting' : ''}`}>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-[#2c2c2c]">Welcome</h2>
              <p className="text-sm mb-6 text-[#555]">Choose an option below to get started</p>

              {/* Tabs */}
              <div className="flex mb-6 gap-2">
                <button
                  onClick={() => setActiveTab('signin')}
                  className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-[#333] rounded ${
                    activeTab === 'signin' ? 'active' : 'bg-[#f5f2ea]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-[#333] rounded ${
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
          className="back-button fixed bottom-5 right-5 text-3xl text-[#4a4a4a] bg-none border-none cursor-pointer z-[1001]"
        >
          ←
        </button>
      </div>
    </>
  );
};

export default Auth;
