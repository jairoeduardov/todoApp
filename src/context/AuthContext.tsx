import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContextType, GoogleUser } from '../types/auth';



const GOOGLE_CLIENT_ID =import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  token: 'token',
  user: 'user',
  expirationTime: 'tokenExpiration',
};

const loadLocalStorage = (): {
  token: string | null;
  user: GoogleUser | null;
  expirationTime: number | null;
} => {
  try {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user) || 'null');
    const expirationTime = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.expirationTime));
    return { token, user, expirationTime };
  } catch {
    return { token: null, user: null, expirationTime: null };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [expirationTime, setExpirationTime] = useState<number | null>(null);

  useEffect(() => {
    const { token, user, expirationTime } = loadLocalStorage();
    if (token && expirationTime && Date.now() < expirationTime) {
      setToken(token);
      setUser(user);
      setExpirationTime(expirationTime);
      setIsAuthenticated(true);
    } else {
      logout();
    }
  }, []);

  const login = (newToken: string, newUser: GoogleUser) => {
    const decodedToken = JSON.parse(atob(newToken.split('.')[1]));
    const newExpirationTime = decodedToken.exp * 1000; // Convertir a milisegundos

    setToken(newToken);
    setUser(newUser);
    setExpirationTime(newExpirationTime);

    localStorage.setItem(LOCAL_STORAGE_KEYS.token, newToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(newUser));
    localStorage.setItem(LOCAL_STORAGE_KEYS.expirationTime, newExpirationTime.toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setExpirationTime(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.expirationTime);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken'); // Almacena el Refresh Token si lo usas
      if (!refreshToken) {
        logout();
        return;
      }

      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      const newToken = response.data.access_token;
      const newExpirationTime = new Date().getTime() + response.data.expires_in * 1000;

      setToken(newToken);
      setExpirationTime(newExpirationTime);

      localStorage.setItem(LOCAL_STORAGE_KEYS.token, newToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.expirationTime, newExpirationTime.toString());
    } catch (err) {
      console.error('Error refreshing token:', err);
      logout();
    }
  };

  // Verifica si el token está a punto de expirar y lo renueva si es necesario
  useEffect(() => {
    const interval = setInterval(() => {
      if (expirationTime && expirationTime - Date.now() < 5 * 60 * 1000) {
        // Si quedan menos de 5 minutos para que expire
        refreshToken();
      }
    }, 60 * 1000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [expirationTime]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
