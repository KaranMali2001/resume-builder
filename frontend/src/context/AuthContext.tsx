import { userService } from '@/services/userService';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (token) {
      async function getUser() {
        try {
          const user = await userService.getUser();
          console.log('user', user);
          setUser(user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      getUser();
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const data = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
        email,
        password,
      });

      setToken(data.data.token);
      localStorage.setItem('token', data.data.token);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
        email,
        password,
        name,
      });

      const data = await response.data;

      if (response.status === 201) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{ user, token, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
