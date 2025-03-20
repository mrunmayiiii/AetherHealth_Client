import React, { useState } from 'react';
import { X, User, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

interface AuthModalProps {
  mode: 'login' | 'signup' | 'forgot-password';
  onClose: () => void;
  onSwitch: (mode: 'login' | 'signup' | 'forgot-password') => void;
  onSuccess?: (userType: 'doctor' | 'patient') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { login, signup, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
        onSuccess?.(userType);
        onClose();
      } else if (mode === 'signup') {
        const fullName = `${firstName} ${lastName}`.trim();
        await signup(email, password, userType, fullName, doctorId);
        onSuccess?.(userType);
        onClose();
      } else if (mode === 'forgot-password') {
        await resetPassword(email);
        setResetEmailSent(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            {mode === 'login' ? (
              <LogIn className="h-6 w-6 text-blue-600" />
            ) : mode === 'forgot-password' ? (
              <Mail className="h-6 w-6 text-blue-600" />
            ) : (
              <UserPlus className="h-6 w-6 text-blue-600" />
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === 'login' 
            ? 'Welcome Back' 
            : mode === 'forgot-password' 
              ? 'Reset Password' 
              : 'Create Account'}
        </h2>

        {mode === 'forgot-password' && resetEmailSent ? (
          <div className="text-center py-4">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
              <p>Password reset email sent!</p>
              <p className="text-sm mt-2">Please check your inbox for further instructions.</p>
            </div>
            <button
              onClick={() => onSwitch('login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('patient')}
                      className={`px-4 py-2 rounded-lg border ${
                        userType === 'patient'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700'
                      } flex items-center justify-center`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('doctor')}
                      className={`px-4 py-2 rounded-lg border ${
                        userType === 'doctor'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700'
                      } flex items-center justify-center`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Doctor
                    </button>
                  </div>
                </div>

                {userType === 'patient' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doctor ID
                    </label>
                    <input
                      type="text"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                      placeholder="DOC123456"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {mode !== 'forgot-password' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => onSwitch('forgot-password')}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm flex items-center justify-center"
            >
              {mode === 'login' ? (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </>
              ) : mode === 'forgot-password' ? (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reset Link
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </>
              )}
            </button>
          </form>
        )}

        {mode !== 'forgot-password' && (
          <p className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => onSwitch(mode === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;