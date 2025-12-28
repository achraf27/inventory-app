import type { AuthResponseDto } from '../utils/types';
import { apiClient } from './apiClient';



export async function login(data: { name: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/login', data);
  if (res.data?.token) sessionStorage.setItem("token", res.data.token);
  return res.data;
}

export async function register(data: { name: string; mail: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/register', data);
  if (res.data?.token) sessionStorage.setItem("token", res.data.token);
  return res.data;
}

export function getToken(): string | null {
  const token = sessionStorage.getItem("token");
  if (!token || token === "null") return null;
  return token;
}



