import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, getToken } from '../services/auth/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);
    };
    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    const newToken = await loginApi(email, password);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutApi();
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
