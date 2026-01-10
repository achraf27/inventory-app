import type { AuthResponseDto } from '../utils/types';
import { apiClient } from './apiClient';

const TOKEN_KEY = "token";
const USER_KEY = "user";




export async function login(data: { name: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/login', data);
  if (res.data?.token && res.data?.user){
    localStorage.setItem(TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
  }
  return res.data;
}

export async function register(data: { name: string; mail: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/register', data);
  if (res.data?.token){
    localStorage.setItem(TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
  }
  return res.data;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

