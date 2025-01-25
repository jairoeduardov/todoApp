import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, GoogleUser } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
    token: 'token', 
    user: 'user',
    isAuthenticated: 'isAuthenticated',
}

const loadLocalStorage = (): { token: string | null; user: GoogleUser | null } => {
    try {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user) || 'null');
        return { token, user };
    } catch {
        return { token: null, user: null };
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<GoogleUser | null>(null);

    useEffect(() => {
        const { token, user } = loadLocalStorage();
        setToken(token);
        setUser(user);
    }, []);

    const login = (newToken: string, newUser: GoogleUser) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem(LOCAL_STORAGE_KEYS.token, newToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(newUser));
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
        setIsAuthenticated(false);
    };

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