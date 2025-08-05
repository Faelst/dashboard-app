/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { login as loginRequest, logout as logoutRequest } from '@/services/auth/auth.service';
import { AuthResponse, LoginPayload } from '@/services/auth/types';
import { showError } from './ToastContext';

type AuthContextType = {
    auth: AuthResponse | null;
    isAuthenticated: boolean;
    login: (data: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthResponse | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const verify = async () => {
        try {
        }
        catch (error) {
            console.error('Erro ao obter token do localStorage:', error);
        }
    };

    useEffect(() => {
        verify();
    }, []);

    const login = async (payload: LoginPayload) => {
        try {
            const response = await loginRequest(payload);
            setAuth(response);
            setIsAuthenticated(true);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            router.push('/');
        } catch (error: any) {
            if (error.status === 401) {
                showError('Credenciais inválidas. Por favor, tente novamente.');
            } else {
                showError('Erro ao fazer login. Por favor, tente novamente mais tarde.');
            }
        }
    };

    const logout = async () => {
        await logoutRequest();
        setAuth(null);
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
