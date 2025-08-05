import api from '@/lib/api';
import { AuthResponse, LoginPayload } from './types';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/login', payload);

  return data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('accessToken');

  await api.post('/auth/logout');
};

export const refreshToken = async (): Promise<string> => {
  const { data } = await api.post('/auth/refresh');

  return data.accessToken;
};

export const checkAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await api.get('/auth/check');

    return response?.data.isAuthenticated;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
};
