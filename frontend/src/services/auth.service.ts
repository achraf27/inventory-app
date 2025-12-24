import type { AuthResponseDto } from '../utils/types';
import { apiClient } from './apiClient';



export async function login(data: { username: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/login', data);
  sessionStorage.setItem("token",res.data.token);
  sessionStorage.setItem("id",String(res.data.id))
  return res.data;
}

export async function register(data: { username: string; mail: string; password: string }):Promise<AuthResponseDto> {
  const res = await apiClient.post('/auth/register', data);
  sessionStorage.setItem("token",res.data.token);
  sessionStorage.setItem("id",String(res.data.id))
  return res.data;
}

export function getToken(): string | null {
  const token = sessionStorage.getItem("token");
  if (!token || token === "null") return null;
  return token;
}


export function getId():string|null {
  const id = sessionStorage.getItem("id");
  if(!id || id === null) return null;
  return id;
}


