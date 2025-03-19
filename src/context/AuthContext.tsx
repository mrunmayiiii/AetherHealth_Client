import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  userType: 'patient' | 'doctor';
  fullName: string;
  doctorId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userType: string, name: string, doctorId?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Simulate authentication
    setUser({
      id: '1',
      email,
      userType: 'patient',
      fullName: 'Demo User',
    });
    navigate('/dashboard');
  };

  const signup = async (email: string, password: string, userType: string, name: string, doctorId?: string) => {
    // Simulate user creation
    setUser({
      id: '1',
      email,
      userType: userType as 'patient' | 'doctor',
      fullName: name,
      doctorId,
    });
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;