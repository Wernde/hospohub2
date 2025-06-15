
import AuthImagePanel from './AuthImagePanel';
import AuthFormPanel from './AuthFormPanel';
import BackButton from './BackButton';

interface AuthLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVisible: boolean;
  isExiting: boolean;
  onNavigate: (path: string) => void;
}

const AuthLayout = ({ activeTab, setActiveTab, isVisible, isExiting, onNavigate }: AuthLayoutProps) => (
  <div 
    className={`auth-container min-h-screen w-full bg-stone-100 ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
  >
    <div className="flex h-screen w-full">
      <AuthImagePanel />
      <AuthFormPanel 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExiting={isExiting}
        onNavigate={onNavigate}
      />
    </div>
    <BackButton onNavigate={onNavigate} />
  </div>
);

export default AuthLayout;
