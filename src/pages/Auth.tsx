
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [isVisible, setIsVisible] = useState(false);
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

  // Fast entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const smoothNavigate = (path: string) => {
    navigate(path, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isVisible={isVisible}
      isExiting={false}
      onNavigate={smoothNavigate}
    />
  );
};

export default Auth;
