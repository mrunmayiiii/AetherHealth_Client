import React, { useState } from 'react';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitch: (mode: 'login' | 'signup') => void;
  onSuccess: (userType: 'doctor' | 'patient') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch, onSuccess }) => {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');  // Default to patient
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess(userType);
  };
  
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          
          
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Account Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={userType === 'patient'}
                    onChange={() => setUserType('patient')}
                    className="mr-2"
                  />
                  Patient
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    checked={userType === 'doctor'}
                    onChange={() => setUserType('doctor')}
                    className="mr-2"
                  />
                  Doctor
                </label>
              </div>
            </div>
          
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
            
            <button
              type="button"
              onClick={() => onSwitch(mode === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {mode === 'login' ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;