
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
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 lg:p-20 relative bg-stone-50">
    <div className={`form-box w-full max-w-lg bg-stone-100/90 backdrop-blur-sm p-12 lg:p-16 rounded-lg shadow-xl border border-stone-300 z-10 ${isExiting ? 'exiting' : ''}`}>
      <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-stone-800">Welcome</h2>
      <p className="text-sm mb-6 text-stone-600">Choose an option below to get started</p>

      {/* Tabs */}
      <div className="flex mb-6 gap-2">
        <button
          onClick={() => setActiveTab('signin')}
          className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-stone-700 rounded transition-all duration-300 ${
            activeTab === 'signin' ? 'active bg-stone-700 text-white' : 'bg-stone-200 hover:bg-stone-300'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`tab-button flex-1 py-3 px-4 border-none cursor-pointer text-stone-700 rounded transition-all duration-300 ${
            activeTab === 'signup' ? 'active bg-stone-700 text-white' : 'bg-stone-200 hover:bg-stone-300'
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
