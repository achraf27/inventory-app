import { apiClient } from './apiClient';
import { jwtDecode } from "jwt-decode";



export async function login(data: { username: string; password: string }):Promise<string> {
  const res = await apiClient.post('/auth/login', data);
  sessionStorage.setItem("token",res.data.token);
  return res.data;
}

export async function register(data: { username: string; mail: string; password: string }):Promise<string> {
  const res = await apiClient.post('/auth/register', data);
  sessionStorage.setItem("token",res.data.token);
  sessionStorage.setItem("id",res.data.user_id)
  return res.data;
}

export function getToken():string{
  return String(sessionStorage.getItem("token"));
}

export function getId(token: string) {
  const decoded = jwtDecode<{ id: number }>(token);
  return decoded.id;
}


