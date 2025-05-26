import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'auditor';
  avatar?: string;
  sector?: 'Healthcare' | 'Legal' | 'Finance' | 'Government' | 'Education' | 'Manufacturing' | 'Technology' | 'Other';
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Simulate API call to verify token
      setTimeout(() => {
        setUser({
          id: '1',
          email: 'admin@blockevidence.com',
          name: 'System Administrator',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          sector: 'Technology',
          organization: 'BlockEvidence Corp'
        });
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine role based on email for demo purposes
    const isAdmin = email.includes('admin');
    
    const mockUser = {
      id: '1',
      email,
      name: isAdmin ? 'System Administrator' : 'John Doe',
      role: isAdmin ? 'admin' as const : 'user' as const,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      sector: isAdmin ? 'Technology' as const : 'Legal' as const,
      organization: isAdmin ? 'BlockEvidence Corp' : 'Legal Associates Inc'
    };
    
    setUser(mockUser);
    localStorage.setItem('auth-token', 'mock-jwt-token');
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      email,
      name,
      role: 'user' as const,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      sector: 'Other' as const,
      organization: 'New Organization'
    };
    
    setUser(mockUser);
    localStorage.setItem('auth-token', 'mock-jwt-token');
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
