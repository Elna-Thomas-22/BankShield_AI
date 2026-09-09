import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthResponse } from '../types';
import { apiClient } from '../api/client';


interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string; portal?: string }) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bankshield_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('bankshield_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await apiClient.get<User>('/auth/me');
        setUser(res.data);
        localStorage.setItem('bankshield_user', JSON.stringify(res.data));
      } catch (err) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  const login = async (credentials: { email: string; password: string; portal?: string }): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const data = response.data;
    
    setToken(data.access_token);
    const userObj: User = {
      id: data.user_id,
      email: data.email,
      full_name: data.full_name,
      role: data.role,
      created_at: new Date().toISOString(),
    };
    setUser(userObj);

    localStorage.setItem('bankshield_token', data.access_token);
    localStorage.setItem('bankshield_user', JSON.stringify(userObj));

    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('bankshield_token');
    localStorage.removeItem('bankshield_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
