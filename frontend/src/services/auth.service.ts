import type { AuthResponseDto, UserRole } from '../utils/types';
import { apiClient } from './apiClient';



export async function login(data: { name: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/login', data);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
}

export async function register(data: { name: string; mail: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/register', data);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getRole(): UserRole | null {
  const token = localStorage.getItem("token");
    if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role as UserRole;
  } catch {
    return null;
  }
}

export function logOut(): void|string {
  localStorage.removeItem("token");
}



