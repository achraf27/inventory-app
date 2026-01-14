import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL || 'http://localhost:3001'
})
