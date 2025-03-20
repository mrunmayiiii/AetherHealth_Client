import React, { useState } from 'react';
<<<<<<< HEAD
import { X, User, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
=======
>>>>>>> b175b5a407da7504707b85a39083805c77658183

interface AuthModalProps {
  mode: 'login' | 'signup' | 'forgot-password';
  onClose: () => void;
<<<<<<< HEAD
  onSwitch: (mode: 'login' | 'signup' | 'forgot-password') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch }) => {
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
        onClose();
      } else if (mode === 'signup') {
        const fullName = `${firstName} ${lastName}`.trim();
        await signup(email, password, userType, fullName, doctorId);
        onClose();
      } else if (mode === 'forgot-password') {
        await resetPassword(email);
        setResetEmailSent(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
=======
  onSwitch: (mode: 'login' | 'signup') => void;
  onSuccess: (userType: 'doctor' | 'patient') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch, onSuccess }) => {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');  // Default to patient
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSuccess(userType);
>>>>>>> b175b5a407da7504707b85a39083805c77658183
  };
  
  
  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> b175b5a407da7504707b85a39083805c77658183
      </div>
    </div>
  );
};

export default AuthModal;