'use client'

import { getUserInfo } from '@/services/auth/auth.service';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'

interface AuthContextProps {
    user: { id: string; name: string; email: string; role: string } | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthContextProps['user']>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('auth.user='));
                const authEMail = Cookies.get('auth_email');
                if (token && authEMail) {
                    const res = await getUserInfo(authEMail);
                    setUser({ id: res.id, name: res.name, email: res.email, role: res.role });
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = (token: string) => {
        document.cookie = `auth.user=${token}; path=/;`;
        // setUser({ id: '1', name: 'John Doe' }); // Simula el inicio de sesión
    };

    const logout = () => {
        document.cookie = 'auth.usern=; Max-Age=0; path=/;';
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
