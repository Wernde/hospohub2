
import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthFormPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isExiting: boolean;
  onNavigate: (path: string) => void;
}

const AuthFormPanel = ({ activeTab, setActiveTab, isExiting, onNavigate }: AuthFormPanelProps) => (
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 lg:p-20 relative">
    <div className={`form-box w-full max-w-lg bg-orange-50 p-12 lg:p-16 rounded-lg shadow-lg z-10 ${isExiting ? 'exiting' : ''}`}>
      <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-orange-900">Welcome</h2>
      <p className="text-sm mb-6 text-orange-700">Choose an option below to get started</p>

      {/* Tabs */}
      <div className="flex mb-6 gap-2">
        <button
          onClick={() => setActiveTab('signin')}
          className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-orange-800 rounded ${
            activeTab === 'signin' ? 'active' : 'bg-orange-100'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-orange-800 rounded ${
            activeTab === 'signup' ? 'active' : 'bg-orange-100'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Forms */}
      <div className="transition-all duration-500 ease-in-out">
        {activeTab === 'signin' ? (
          <SignInForm onNavigate={onNavigate} />
        ) : (
          <SignUpForm onNavigate={onNavigate} />
        )}
      </div>
    </div>
  </div>
);

export default AuthFormPanel;
